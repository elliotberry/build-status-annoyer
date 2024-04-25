import { voicesArray } from './voices.js'
const getVoice = (voice) => {
    let returnValue = {
        error: false,
        voice: 'en_us_001',
    }

    if (voice) {
        if (typeof voice === 'number') {
            if (voice < 0 || voice >= voicesArray.length) {
                returnValue.error =
                    'Invalid voice, must be a number between 0 and ' +
                    (voicesArray.length - 1)
            } else {
                returnValue.voice = voicesArray[voice]
            }
        }
        if (typeof voice === 'string') {
            if (voicesArray.includes(voice)) {
                returnValue.voice = voice
            } else {
                returnValue.error =
                    'Invalid voice, must be a string from voicesArray'
            }
        }
    }
    return returnValue
}

const getVolume = (volume) => {
    let returnValue = {
        error: false,
        volume: 100,
    }

    if (typeof volume !== 'number') {
        try {
            returnValue.volume = Number.parseInt(volume)
        } catch {
            returnValue.error = 'Invalid volume, not parseable as integer'
        }
    }
    if (volume && (typeof volume !== 'number' || volume < 0 || volume > 100)) {
        returnValue.error = 'Invalid volume, must be a number between 0 and 100'
    } else {
        returnValue.volume = volume
    }
    return returnValue
}

export { getVoice, getVolume }
