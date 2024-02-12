import http from 'node:http'
import playCachedAudio from './playCachedAudio.js'
import logger from './logger.js'


const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        logger.info('GET /')
        logger.info('hello world')
        await playCachedAudio('hello world')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ hello: 'world' }))
    } else if (req.method === 'POST' && req.url === '/') {
        logger.info('POST /')
        try {
            let start = Date.now()
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                logger.info('body:', body)
                let theVolume = 100
                const { message, volume } = JSON.parse(body)
                if (
                    volume &&
                    (typeof volume !== 'number' || volume < 0 || volume > 100)
                ) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Invalid volume' }))
                    return
                } else {
                    theVolume = volume
                }

                let cached = await playCachedAudio(message, theVolume) //if volume

                res.setHeader('Content-Type', 'application/json')
                logger.info('played in', Date.now() - start, 'ms')
                let end = Date.now()

                res.end(
                    JSON.stringify({
                        status: 'Sound played',
                        cached,
                        time: end - start,
                    })
                )
            })
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: err.message }))
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
    }
})

const port = process.env.PORT || 9099
const host = '0.0.0.0'

server.listen(port, host, () => {
    logger.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason)
    process.exit(1)
})
