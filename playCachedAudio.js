import {getAudio} from './tiktok-api.js';
import crypto from 'crypto';
import fs from 'fs/promises';
import exec from "./exec.js";
import { pruneCacheIfNeeded } from './pruneCacheIfNeeded.js';
import config from './config.js';
import logger from './logger.js';
import { exists } from './file-shit.js';

const getCachePath = async (str) => {
  const hash = await crypto.createHash('md5').update(str).digest('hex');
  return `${config.cacheDir}/${hash}.mp3`;
}

const play = async (path, volume) => {
  await exec(`ffplay -nodisp -autoexit --volume ${volume} ${path}`);
}

async function playCachedAudio(text, volume=100, speaker = 'en_us_001') {
  try {
    let cached = false;
    if (!await exists(config.cacheDir)) {
      await fs.mkdir(config.cacheDir);
    }
    await pruneCacheIfNeeded();
    let possiblePath = await getCachePath(text + speaker);
    if (await exists(possiblePath)) {
      logger.info(`cache hit for text ${text} and speaker ${speaker}`);
      await play(possiblePath, volume);
      cached = true;
    }
    else {
      logger.info(`cache MISS for text ${text} and speaker ${speaker}`);
      let buf = await getAudio(text, speaker);
      await fs.writeFile(possiblePath, buf);
      await play(possiblePath);
    }
    return cached;
  } catch (e) {
    logger.info(`error in play: ${e.message}`);
  }
}

export default playCachedAudio
