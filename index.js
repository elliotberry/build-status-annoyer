import 'dotenv/config'
import http from 'node:http'

import { doPlay } from './lib/do-play.js'
import home from './lib/home.js'
import Logger from './lib/logger.js'


var log = new Logger()

const server = http.createServer(async (request, res) => {
    try {

        log = new Logger()
        request.log = log;

     //   await logRequestDetails(request)
        if (request.method === 'GET' && request.url === '/') {
            request.log.info('GET /')
            await home(request, res)
        } else if (request.method === 'POST' && request.url === '/') {
            request.log.info('POST /')
            await doPlay(request, res)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } catch (error) {
        request.log.error(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: error.message + '\n' + error.stack }))
    }
});

const port = process.env.PORT || 9099;
const host = '0.0.0.0';

server.listen(port, host, () => {
    log.info(`Server listening on ${host}:${port}`)
})

process.on('uncaughtException', (e) => {

    log.error(e)
    process.exit(1)
})
process.on('uncaughtException', (e) => {
    log.error(e);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    log.error('Unhandled rejection at:', promise, 'reason:', reason)
    process.exit(1)
})
    log.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
