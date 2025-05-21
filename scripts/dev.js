#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the directory of the project
const projectDir = path.resolve(__dirname, '..');

// Run the development server
console.log('Starting development server from the correct directory...');
const childProcess = spawn('npm', ['run', 'dev'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

childProcess.on('close', (code) => {
  process.exit(code);
}); 