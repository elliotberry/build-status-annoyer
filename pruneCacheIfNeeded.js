import fs from 'fs/promises';
import { cacheDir, maxCacheSize } from './config.js';

export async function pruneCacheIfNeeded() {
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
