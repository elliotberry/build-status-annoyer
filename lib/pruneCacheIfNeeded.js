import fs from 'node:fs/promises'

import config from '../config.js'
import logger from './logger.js'

export async function pruneCacheIfNeeded() {
    try {
        // Replace with your directory path
        const files = await fs.readdir(config.cacheDir)

        // Create an array of file stats with access time and size
        const fileStats = await Promise.all(
            files.map(async (fileName) => {
                const filePath = `${config.cacheDir}/${fileName}`
                const stats = await fs.stat(filePath)
                return { accessTime: stats.atimeMs, fileName, size: stats.size }
            })
        )

        // Sort the files by last access time in descending order
        fileStats.sort((a, b) => b.accessTime - a.accessTime)

        let totalSize = 0

        for await (const file of fileStats) {
            totalSize += file.size

            // Check if the total size exceeds the maximum cache size
            if (totalSize > config.maxCacheSize) {
                // Delete the file
                const filePath = `${config.cacheDir}/${file.fileName}`
                await fs.unlink(filePath)
                logger.info(`pruned cache: ${file.fileName}`)
            }
        }
    } catch (error) {
        console.error('Error:', error)
    }
}
