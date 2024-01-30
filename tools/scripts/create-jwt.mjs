import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2)).parse();
const jwtSecret = argv._[0] || argv['secret'];

if (!jwtSecret) {
  console.error('Error: Please provide a secret');
  process.exit(1);
}

const token = jwt.sign(
  {
    id: nanoid(),
  },
  jwtSecret,
  {
    audience: 'todo',
    issuer: 'todo',
    jwtid: 'todo',
    subject: 'todo',
  },
);

console.log('-------------- TOKEN --------------');
console.log(token);
console.log('___________________________________');
