import {getAudio} from './tiktok-api.js';
import crypto from 'crypto';
import fs from 'fs/promises';
import exec from "./exec.js";
import { pruneCacheIfNeeded } from './pruneCacheIfNeeded.js';
import { cacheDir } from './config.js';

const exists = async (path) => {
  try {
    await fs.access(path);
    return true;
  }
  catch(e) {
    return false;
  }
}

const getCachePath = async (str) => {
  const hash = await crypto.createHash('md5').update(str).digest('hex');
  return `${cacheDir}/${hash}.mp3`;
}

const play = async (path) => {
  await exec(`ffplay -nodisp -autoexit ${path}`);
}

async function playCachedAudio(text, speaker = 'en_us_001') {
  try {
    if (!await exists(cacheDir)) {
      await fs.mkdir(cacheDir);
    }
    await pruneCacheIfNeeded();
    let possiblePath = await getCachePath(text + speaker);
    if (await exists(possiblePath)) {
      console.log('cache hit');
      let buf = await fs.readFile(possiblePath);
      await play(buf);
      return;
    }
    else {
      console.log('cache miss');
      let buf = await getAudio(text, speaker);
      await fs.writeFile (possiblePath, buf);
      await play(buf);

    }

  } catch (e) {
    console.error(`error in play: ${e.message}`);
  }
}

export default playCachedAudio
