import http from 'node:http'
import logger from './lib/logger.js'
import home from './lib/home.js'
import { doPlay } from './lib/doPlay.js'
import { logRequestDetails } from './lib/logRequestDetails.js'

const server = http.createServer(async (req, res) => {
    try {
        // Custom middleware to log request details
        await logRequestDetails(req)

        if (req.method === 'GET' && req.url === '/') {
            logger.info('GET /')
            await home(req, res)
        } else if (req.method === 'POST' && req.url === '/') {
            logger.info('POST /')
            await doPlay(req, res)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
    }
})

const port = process.env.PORT || 9099
const host = '0.0.0.0'

server.listen(port, host, () => {
    logger.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', (err) => {
    logger('Uncaught exception:', err)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    logger('Unhandled rejection at:', promise, 'reason:', reason)
    process.exit(1)
})


