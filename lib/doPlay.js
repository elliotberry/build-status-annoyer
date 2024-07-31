import prettyMilliseconds from 'pretty-ms'

import FileState from './is-playing.js'
import playCachedAudio from './playCachedAudio.js'
import { getVoice,getVolume } from './validation.js'
import { waitForBody } from './wait-for-body.js'

let playing = new FileState()

export const doPlay = async (request, res) => {
    if (playing.state) {
        request.log.info('Already playing, returning 409 error')
        res.writeHead(409, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Already playing' }))
        return
    }
    await playing.start()
    const start = Date.now()
    const body = await waitForBody(request)

    request.log.info('body:', body)

    const { message, voice, volume } = JSON.parse(body)

    const volInfo = getVolume(volume)
    const voiceInfo = getVoice(voice)
    const allErrors = [volInfo.error, voiceInfo.error].filter((e) => e === true)
    if (allErrors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: allErrors.join(', ') }))
        return
    }

    const cached = await playCachedAudio(message, request.log, volInfo.volume, voiceInfo.voice) //if volume
    const prettyTime = prettyMilliseconds(Date.now() - start)
    res.setHeader('Content-Type', 'application/json')
    request.log.info(`played in ${prettyTime}`)
playing.stop()
    res.end(
        JSON.stringify({
            cached,
            requestInfo: {
                message,
                voice: voiceInfo.voice,
                volume: volInfo.volume,
            },
            status: 'Sound played',
            time: prettyTime,
        })
    )
    
}
