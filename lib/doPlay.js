import playCachedAudio from './playCachedAudio.js';
import logger from './logger.js';
import { getVolume, getVoice } from './validation.js';
import { waitForBody } from './waitForBody.js';
import prettyMilliseconds from 'pretty-ms';

var playing = false
export const doPlay = async (req, res) => {
    try {
        if (playing) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Already playing' }));
            return;
        }
        let start = Date.now();
        let body = await waitForBody(req);

        logger.info('body:', body);

        const { message, volume, voice } = JSON.parse(body);

        let volInfo = getVolume(volume);
        let voiceInfo = getVoice(voice);
        let allErrors = [volInfo.error, voiceInfo.error].filter(
            (e) => e === true
        );
        if (allErrors.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: allErrors.join(', ') }));
            return;
        }

        playing = true;
        let cached = await playCachedAudio(
            message,
            volInfo.volume,
            voiceInfo.voice
        ); //if volume
        let prettyTime = prettyMilliseconds(Date.now() - start);
        res.setHeader('Content-Type', 'application/json');
        logger.info(`played in ${prettyTime}`);

        res.end(
            JSON.stringify({
                status: 'Sound played',
                cached,
                time: prettyTime,
                requestInfo: {
                    message,
                    volume: volInfo.volume,
                    voice: voiceInfo.voice,
                },
            })
        );
        playing = false;
    } catch (err) {
        throw new Error(err);
    }
};
