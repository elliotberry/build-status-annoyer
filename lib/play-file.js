
import exec from './exec.js';


const play = async (path, volume=100) => {
  try {
    await exec(`ffplay -nodisp -autoexit -volume ${volume} ${path}`);
  } catch (error) {
    throw new Error(error);
  }
};

export default play;