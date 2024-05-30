import fs from 'node:fs/promises';

const get11 = async prompt => {


  let bod = {text: prompt, model_id: 'eleven_turbo_v2', voice_settings: {stability: '0.06', similarity_boost: '0.87'}};
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Xi-Api-Key': process.env.ELEVENLABS_API_KEY},
    body: JSON.stringify(bod),
  };

  let resp = await fetch('https://api.elevenlabs.io/v1/text-to-speech/J55P89r4GTZqh3nxXGWD', options);
  let g = await resp.arrayBuffer(); // or response.blob() if you prefer Blob
  //stream to file
 // await fs.writeFile('./tmp/voice.mp3', Buffer.from(g));
  return g;
};


const test = async () => {
  let g = await get11('hello world');
  await fs.writeFile('./voice.mp3', Buffer.from(g));
}
test();
export default get11
