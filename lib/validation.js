import { Voices, voicesArray } from './voices.js'
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


export { getVoice, getVolume}