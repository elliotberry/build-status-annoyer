import { getAudio } from './tiktok-api.js'
import crypto from 'crypto'
import fs from 'fs/promises'
import exec from './exec.js'
import { pruneCacheIfNeeded } from './pruneCacheIfNeeded.js'
import config from '../config.js'
import logger from './logger.js'
import { exists, makeDirIfNeeded } from './file-shit.js'

const getCachePath = async (str) => {
    const hash = await crypto.createHash('md5').update(str).digest('hex')
    return `${config.cacheDir}/${hash}.mp3`
}

const play = async (path, volume) => {
    await exec(`ffplay -nodisp -autoexit -volume ${volume} ${path}`).catch(
        (e) => {
            throw new Error(e)
        }
    )
}

async function playCachedAudio(text, volume = 70, speaker = 'en_us_001') {
    try {
        let cached = false
        if (speaker === 'random') {
            logger.info(`cache not used as speaker is random, for text ${text}`)
            let buf = await getAudio(text, speaker)
            let possiblePath = await getCachePath('random')
            await fs.writeFile(possiblePath, buf)
            await play(possiblePath, volume)
            fs.rm(possiblePath)
        } else {
            await makeDirIfNeeded(config.cacheDir)
            await pruneCacheIfNeeded()
            let possiblePath = await getCachePath(text + speaker)
            if (await exists(possiblePath)) {
                logger.info(`cache hit for text ${text} and speaker ${speaker}`)
                await play(possiblePath, volume)
                cached = true
            } else {
                logger.info(
                    `cache MISS for text ${text} and speaker ${speaker}`
                )
                let buf = await getAudio(text, speaker)
                await fs.writeFile(possiblePath, buf)
                await play(possiblePath, volume)
            }
        }
        return cached
    } catch (e) {
        throw new Error(`error in play: ${e}`)
    }
}

export default playCachedAudio
