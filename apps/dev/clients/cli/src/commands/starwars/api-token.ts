import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export const command = 'api-token [args]';
export const desc = 'Return an admin token for use with the starwars-api locally';

export const handler = async () => {
  const options = {
    audience: 'api.starwars.local',
    issuer: 'localhost',
    jwtid: nanoid(),
    subject: 'local-admin', // TODO this needs to be the accountId from starwars table
  };
  const roles = ['admin', 'user', 'support'];
  const authKey = process.env['JWT_LOCAL_ACCESS_KEY'] || 'secret';
  // TODO support passing in an account id, which will result in the db being queried
  // for the Account and AccountUser
  console.log('Generating token with key: ', authKey);
  const token = sign(
    {
      id: options.jwtid,
      roles,
    },
    authKey,
    options,
  );
  console.log(token);
};
