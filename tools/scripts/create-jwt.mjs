import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import yargs from 'yargs';
import os from 'os';

const username = os.userInfo().username;

const argv = yargs(process.argv.slice(2)).parse();
const jwtSecret = argv._[0] || argv['secret'];

if (!jwtSecret) {
  console.error('Error: Please provide a secret');
  process.exit(1);
}

// TODO: support proving the path to a config file, or providing all these as args
const options = {
  audience: 'localhost',
  issuer: 'localhost',
  jwtid: nanoid(),
  subject: username || 'localhost',
};
console.debug('Creating JWT with options: ', options);

const token = jwt.sign(
  {
    id: options.jwtId,
  },
  jwtSecret,
  options,
);

console.log('-------------- TOKEN --------------');
console.log(token);
console.log('___________________________________');
