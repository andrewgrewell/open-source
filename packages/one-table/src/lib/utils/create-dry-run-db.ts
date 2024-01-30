import { createMethodTrap } from '@bridge/js-utils';

export function createDryRunDb(db: any) {
  return new Proxy(db, {
    get: createMethodTrap((target, prop, dbCallArgs) => {
      if (prop === 'getModel') {
        const modelName = dbCallArgs[0] as string;
        let model = {};
        try {
          model = db.getModel(...dbCallArgs);
        } catch (e) {
          console.log('error getting model', e);
        }
        return new Proxy(model, {
          get: createMethodTrap((target, prop, args) => {
            dryHandler(target, prop, args);
            return createNoopProxy(modelName);
          }),
        });
      } else {
        return dryHandler(target, prop, dbCallArgs);
      }
    }),
  });
}

function createNoopProxy(modelName: string) {
  return new Proxy(
    {},
    {
      get(target, prop) {
        const modelVarName = modelName[0].toLowerCase() + modelName.slice(1);
        return `\${${modelVarName}.${String(prop)}}`;
      },
    },
  );
}

function dryHandler(target: object, prop: string | symbol, args: unknown[]) {
  const argsString = args.map((arg) => JSON.stringify(arg)).join(', ');
  console.log(
    `[DRY] ${(target as any).name || target.constructor.name}.${String(
      prop,
    )}(${argsString})`,
  );
}
