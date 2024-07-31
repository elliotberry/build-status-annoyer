import path from 'node:path'
const rootDir = path.resolve("./")
const config = {
    cacheDir: path.join(rootDir, 'cache'),
    logDir: path.join(rootDir, "logs"),
    maxCacheSize: 500 * 1024 * 1024
}

export default config