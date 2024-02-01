const INTEGRATION_TESTS_ENABLED = process.env['INTEGRATION_TESTS_ENABLED'] === 'true';

export const integrationDescribe = INTEGRATION_TESTS_ENABLED ? describe : describe.skip;
