import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import exec from './exec.js';


async function playAudio(text, log, volume = 70) {
    let binary = "../piper/piper"
    let model = "../piper/en_GB-cori-high.onnx"
    model = path.resolve(model)
binary = path.resolve(binary)
    let command = `echo '${text}' |  ${binary} --model "${model}" --output-raw | \
  aplay -r 22050 -f S16_LE -t raw -`
  await exec(command);
}

export default playAudio;
