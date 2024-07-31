import crypto from 'node:crypto'
import fs from 'node:fs/promises'

import config from '../config.js'
import exec from './exec.js'
import { exists, makeDirectoryIfNeeded } from './file-shit.js'

import { pruneCacheIfNeeded } from './prune-cache-If-needed.js'
import { getAudio } from './tiktok-api.js'

const getCachePath = async (string_) => {
    const hash = await crypto.createHash('md5').update(string_).digest('hex')
    return `${config.cacheDir}/${hash}.mp3`
}

const play = async (path, volume) => {
    await exec(`ffplay -nodisp -autoexit -volume ${volume} ${path}`).catch(
        (error) => {
            throw new Error(error)
        }
    )
}

async function playCachedAudio(text, log, volume = 70, speaker = 'en_us_001') {

        let cached = false
        if (speaker === 'random') {
            log.info(`cache not used as speaker is random, for text ${text}`)
            let buf = await getAudio(text, speaker)
            let possiblePath = await getCachePath('random')
            await fs.writeFile(possiblePath, buf)
            await play(possiblePath, volume)
            fs.rm(possiblePath)
        } else {
            await makeDirectoryIfNeeded(config.cacheDir)
            await pruneCacheIfNeeded()
            let possiblePath = await getCachePath(text + speaker)
            if (await exists(possiblePath)) {
                log.info(`cache hit for text ${text} and speaker ${speaker}`)
                await play(possiblePath, volume)
                cached = true
            } else {
                log.info(
                    `cache MISS for text ${text} and speaker ${speaker}`
                )
                let buf = await getAudio(text, speaker)
                await fs.writeFile(possiblePath, buf)
                await play(possiblePath, volume)
            }
        }
        return cached
   
}

export default playCachedAudio
