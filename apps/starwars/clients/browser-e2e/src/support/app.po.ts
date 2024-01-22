import { GreetingTestId } from '@starwars/test-utils-browser';

export const getGreeting = () => cy.getByTestId(GreetingTestId);
