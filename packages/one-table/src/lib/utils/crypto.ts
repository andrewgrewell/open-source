/* istanbul ignore file */
export const oneTableCrypto = {
  primary: {
    cipher: process.env['ONE_TABLE_CRYPTO_PRIMARY_CIPHER'],
    password: process.env['ONE_TABLE_CRYPTO_PRIMARY_SECRET'],
  },
};
