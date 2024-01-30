import { AccessPatternConfig } from '../lib/types';

export const mockAccessPatternWithStringArgs: AccessPatternConfig = {
  executor: jest.fn(),
  name: 'mockAccessPattern1',
  params: [
    {
      name: 'arg1',
      type: 'string',
    },
    {
      name: 'arg2',
      type: 'number',
    },
  ],
};

export const mockAccessPatternWithObjectArg: AccessPatternConfig = {
  executor: jest.fn(),
  name: 'mockAccessPattern1',
  params: [
    {
      name: 'config',
      type: 'object',
    },
  ],
};
