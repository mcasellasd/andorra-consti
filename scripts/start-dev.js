const { spawn } = require('child_process');
const path = require('path');

const nextBin = path.join(__dirname, '../node_modules/.bin/next');

console.log('Iniciant Next.js dev server...');
const child = spawn(nextBin, ['dev', '-p', '3000'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  env: { ...process.env, PORT: '3000' }
});

child.on('error', (err) => {
  console.error('Error en el servidor:', err);
});
