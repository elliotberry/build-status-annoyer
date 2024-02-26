import path from 'path'
const rootDir = path.resolve("./")
const config = {
    maxCacheSize: 500 * 1024 * 1024,
    cacheDir: path.join(rootDir, 'cache'),
    logDir: path.join(rootDir, "logs")
}

export default config