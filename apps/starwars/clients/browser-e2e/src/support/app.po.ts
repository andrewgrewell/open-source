import { GreetingTestId } from '@starwars/test-utils';

export const getGreeting = () => cy.getByTestId(GreetingTestId);
