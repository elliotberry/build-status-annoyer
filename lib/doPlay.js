import playCachedAudio from './playCachedAudio.js';
import logger from './logger.js';
import { getVolume, getVoice } from './validation.js';
import { waitForBody } from './wait-for-body.js';
import prettyMilliseconds from 'pretty-ms';
import { isPlaying, setIsPlaying, unsetIsPlaying } from './is-playing.js';

export const doPlay = async (req, res) => {
    try {
        if (await isPlaying()) {
            logger.info('Already playing, returning 400');
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Already playing' }));
            return;
        }
        await setIsPlaying();
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
        await unsetIsPlaying();
    } catch (err) {
        throw new Error(err);
    }
};
