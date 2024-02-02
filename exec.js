import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

// Convert exec to return a promise
const exec = promisify(execCallback);

async function main(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd); // Replace 'ls' with your command
    return { stdout, stderr}
  } catch (error) {
    console.error('Error:', error);
  }
}

export default main;