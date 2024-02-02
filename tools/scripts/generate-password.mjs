import generator from 'generate-password';

const password = generator.generate({
  length: 20,
  strict: true,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: '!@#$%^&*_+?',
});

console.log('-------------- PASSWORD --------------');
console.log(password);
console.log('______________________________________');
