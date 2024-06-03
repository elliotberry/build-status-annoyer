import 'dotenv/config'

import { Voices, voicesArray } from './voices.js'

const getAudio = async (text, speaker = Voices.ENGLISH.EN_US_001) => {
    if (!process.env.TIKTOK_COOKIE) {
        throw new Error('TikTok cookie not found')
    }

    if (!text) {
        throw new Error('Text is required')
    }
    if (!voicesArray.includes(speaker)) {
        throw new Error('Invalid speaker')
    }
    if (speaker === 'random') {
        speaker = voicesArray[Math.floor(Math.random() * voicesArray.length)]
    }
    text = encodeURI(text)
    const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-protobuf',
        Pragma: 'no-cache',
        accept: 'application/x-protobuf',
        'accept-language': 'en-US,en;q=0.9',
        authority: 'im-api.us.tiktok.com',
        'cache-control': 'no-cache',
        'content-type': 'application/x-protobuf',
        cookie: process.env.TIKTOK_COOKIE,
        'user-agent': `"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"`,
    }

    let data = await fetch(
        `https://api16-normal-useast5.us.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${speaker}&req_text=${text}&speaker_map_type=0&aid=1233`,
        {
            headers: headers,
            method: 'POST',
        }
    )

    if (!data.ok) {
        throw new Error(`Failed to fetch: ${data.status}`)
    }
    let res = await data.json()
    let output = res.data.v_str

    //base64 decode
    let buff = Buffer.from(output, 'base64')

    return buff
}
export { getAudio }
export { Voices, voicesArray } from './voices.js'
