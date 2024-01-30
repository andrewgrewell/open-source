import { FC, PropsWithChildren } from 'react';

/**
 * The `StarWarsReactBootstrap` component is the entry point into the StarWars app in a React context.
 * It serves to bootstrap the application with any necessary providers, and to render the application.
 * The goal of the bootstrap component is to provide an interface to configuring the application, and
 * it should follow inversion of control principles, and the consumer should be responsible for providing
 * the needed dependencies.
 *
 * @constructor
 */
export const StarWarsReactBootstrap: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};
