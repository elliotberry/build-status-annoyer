import fs from 'fs/promises';
import exec from "./exec.js";

const main = async buffer => {
  try {
    const path = "./tts.mp3";
    await fs.writeFile(path, buffer);
    await exec(`ffplay -nodisp -autoexit ${path}`);
    //delete temp file
    await fs.rm(path);
  } catch (e) {
    throw new Error(`error on play: ${e}`);
  }
};
export default main;
