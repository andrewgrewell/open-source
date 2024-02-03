export const createAccount = {
  executor: async () => {

  },
  params: [
    {
      name: 'createAccountInput',
      params: [
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'accountName',
          type: 'string',
        },
        {
          name: 'password',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
}
