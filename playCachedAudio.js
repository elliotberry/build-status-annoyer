import {getAudio} from './tiktok-api.js';
import play from './play.js';
import crypto from 'crypto';
import fs from 'fs/promises';

const maxCacheSize = 500 * 1024 * 1024; // 500 MB
const cacheDir = './cache';

async function pruneCacheIfNeeded() {
  try {
 // Replace with your directory path
    const files = await fs.readdir(cacheDir);

    // Create an array of file stats with access time and size
    const fileStats = await Promise.all(
      files.map(async (fileName) => {
        const filePath = `${cacheDir}/${fileName}`;
        const stats = await fs.stat(filePath);
        return { fileName, accessTime: stats.atimeMs, size: stats.size };
      })
    );

    // Sort the files by last access time in descending order
    fileStats.sort((a, b) => b.accessTime - a.accessTime);

    let totalSize = 0;
   
    for await (const file of fileStats) {
      totalSize += file.size;

      // Check if the total size exceeds the maximum cache size
      if (totalSize > maxCacheSize) {
        // Delete the file
        const filePath = `${cacheDir}/${file.fileName}`;
        await fs.unlink(filePath);
        console.log(`pruned cache: ${file.fileName}`);
      
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


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
