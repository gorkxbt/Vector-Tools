#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the directory of the project
const projectDir = path.resolve(__dirname, '..');

console.log('Starting deployment process...');

// Build the project
console.log('Building the project...');
const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('Build failed with code', code);
    process.exit(code);
  }
  
  console.log('Build completed successfully');
  
  // Deploy to Vercel if vercel CLI is installed
  console.log('Deploying to Vercel...');
  const deployProcess = spawn('vercel', ['--prod'], {
    cwd: projectDir,
    stdio: 'inherit',
    shell: true,
  });
  
  deployProcess.on('close', (deployCode) => {
    if (deployCode !== 0) {
      console.error('Deployment failed with code', deployCode);
      console.log('Make sure you have vercel CLI installed. Run: npm i -g vercel');
      process.exit(deployCode);
    }
    
    console.log('Deployment completed successfully');
  });
}); 