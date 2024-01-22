import { GreetingTestId } from '../../../browser/pages';

export const getGreeting = () => cy.getByTestId(GreetingTestId);
