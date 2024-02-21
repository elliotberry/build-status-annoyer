import http from 'node:http'
import playCachedAudio from './playCachedAudio.js'
import logger from './logger.js'
import { Voices, voicesArray } from './voices.js'
var playing = false

const waitForBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            resolve(body)
        })
    })
}

const getVoice = (voice) => {
    let ret = {
        voice: 'en_us_001',
        error: false,
    }

    if (voice) {
        if (typeof voice === 'number') {
            if (voice < 0 || voice >= voicesArray.length) {
                ret.error =
                    'Invalid voice, must be a number between 0 and ' +
                    (voicesArray.length - 1)
            } else {
                ret.voice = voicesArray[voice]
            }
        }
        if (typeof voice === 'string') {
            if (!voicesArray.includes(voice)) {
                ret.error = 'Invalid voice, must be a string from voicesArray'
            } else {
                ret.voice = voice
            }
        }
    }
    return ret
}

const getVolume = (volume) => {
    let ret = {
        volume: 100,
        error: false,
    }

    if (typeof volume !== 'number') {
        try {
            ret.volume = parseInt(volume)
        } catch (e) {
            ret.error = 'Invalid volume, not parseable as integer'
        }
    }
    if (volume && (typeof volume !== 'number' || volume < 0 || volume > 100)) {
        ret.error = 'Invalid volume, must be a number between 0 and 100'
    } else {
        ret.volume = volume
    }
    return ret
}

const doPlay = async (req, res) => {
    try {
        if (playing) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Already playing' }))
            return
        }
        let start = Date.now()
        let body = await waitForBody(req)

        logger.info('body:', body)

        const { message, volume, voice } = JSON.parse(body)

        let volInfo = getVolume(volume)
        let voiceInfo = getVoice(voice)
        let allErrors = [volInfo.error, voiceInfo.error].filter(
            (e) => e === true
        )
        if (allErrors.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: allErrors.join(', ') }))
            return
        }

        playing = true
        let cached = await playCachedAudio(
            message,
            volInfo.volume,
            voiceInfo.voice
        ) //if volume

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
        playing = false
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
    }
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        logger.info('GET /')
        logger.info('hello world')
        await playCachedAudio('hello world')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ hello: 'world' }))
    } else if (req.method === 'POST' && req.url === '/') {
        logger.info('POST /')
        await doPlay(req, res)
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
