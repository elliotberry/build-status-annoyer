import 'dotenv/config'
import http from 'node:http'

import { doPlay } from './lib/doPlay.js'
import home from './lib/home.js'
import { logRequestDetails } from './lib/logRequestDetails.js'
import logger from './lib/logger.js'

const server = http.createServer(async (request, res) => {
    try {
        // Custom middleware to log request details
        await logRequestDetails(request)
        if (request.method === 'GET' && request.url === '/') {
            logger.info('GET /')
            await home(request, res)
        } else if (request.method === 'POST' && request.url === '/') {
            logger.info('POST /')
            await doPlay(request, res)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: error.message }))
    }
})

const port = process.env.PORT || 9099
const host = '0.0.0.0'

server.listen(port, host, () => {
    logger.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', (error) => {
    logger.info('Uncaught exception:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    logger('Unhandled rejection at:', promise, 'reason:', reason)
    process.exit(1)
})
