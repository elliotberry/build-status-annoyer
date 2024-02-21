import * as wanakana from 'wanakana';
import exec from '../exec.js';

const main = async(str) => {
    try {
    let kstr = wanakana.toKana(str);

    //./AquesTalkPi -s 150 -v f2 -k -o out.wav "ファイルニ、シュツ'リョクシマ_ス。"
    //./AquesTalkPi/AquesTalkPi -s 150 -v f2 -k "${str}" | aplay
   
    await exec(`./AquesTalkPi/AquesTalkPi -s 150 -v f2 -k "${kstr}" | aplay`)
    }
    catch (e) {
        throw new Error(`error in aquestalk: ${e}`)
    }
}

main();