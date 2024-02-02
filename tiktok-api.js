import 'dotenv/config';

const Voices = {
  DISNEY: {
    EN_US_GHOSTFACE: 'en_us_ghostface',
    EN_US_CHEWBACCA: 'en_us_chewbacca',
    EN_US_C3PO: 'en_us_c3po',
    EN_US_STITCH: 'en_us_stitch',
    EN_US_STORMTROOPER: 'en_us_stormtrooper',
    EN_US_ROCKET: 'en_us_rocket',
  },
  ENGLISH: {
    EN_AU_001: 'en_au_001',
    EN_AU_002: 'en_au_002',
    EN_UK_001: 'en_uk_001',
    EN_UK_003: 'en_uk_003',
    EN_US_001: 'en_us_001',
    EN_US_002: 'en_us_002',
    EN_US_006: 'en_us_006',
    EN_US_007: 'en_us_007',
    EN_US_009: 'en_us_009',
    EN_US_010: 'en_us_010',
  },
  EUROPE: {
    FR_001: 'fr_001',
    FR_002: 'fr_002',
    DE_001: 'de_001',
    DE_002: 'de_002',
    ES_002: 'es_002',
  },
  AMERICA: {
    ES_MX_002: 'es_mx_002',
    BR_001: 'br_001',
    BR_003: 'br_003',
    BR_004: 'br_004',
    BR_005: 'br_005',
  },
  ASIA: {
    ID_001: 'id_001',
    JP_001: 'jp_001',
    JP_003: 'jp_003',
    JP_005: 'jp_005',
    JP_006: 'jp_006',
    KR_002: 'kr_002',
    KR_003: 'kr_003',
    KR_004: 'kr_004',
  },
  SINGING: {
    EN_FEMALE_F08_SALUT_DAMOUR: 'en_female_f08_salut_damour',
    EN_MALE_M03_LOBBY: 'en_male_m03_lobby',
    EN_FEMALE_F08_WARMY_BREEZE: 'en_female_f08_warmy_breeze',
    EN_MALE_M03_SUNSHINE_SOON: 'en_male_m03_sunshine_soon',
  },
  OTHER: {
    EN_MALE_NARRATION: 'en_male_narration',
    EN_MALE_FUNNY: 'en_male_funny',
    EN_FEMALE_EMOTIONAL: 'en_female_emotional',
  },
};

const voicesArray = [
  'en_us_ghostface',
  'en_us_chewbacca',
  'en_us_c3po',
  'en_us_stitch',
  'en_us_stormtrooper',
  'en_us_rocket',
  'en_au_001',
  'en_au_002',
  'en_uk_001',
  'en_uk_003',
  'en_us_001',
  'en_us_002',
  'en_us_006',
  'en_us_007',
  'en_us_009',
  'en_us_010',
  'fr_001',
  'fr_002',
  'de_001',
  'de_002',
  'es_002',
  'es_mx_002',
  'br_001',
  'br_003',
  'br_004',
  'br_005',
  'id_001',
  'jp_001',
  'jp_003',
  'jp_005',
  'jp_006',
  'kr_002',
  'kr_003',
  'kr_004',
  'en_female_f08_salut_damour',
  'en_male_m03_lobby',
  'en_female_f08_warmy_breeze',
  'en_male_m03_sunshine_soon',
  'en_male_narration',
  'en_male_funny',
  'en_female_emotional'
];


//Voices.SINGING.EN_FEMALE_F08_SALUT_DAMOUR
const getAudio = async (text, speaker = Voices.ENGLISH.EN_US_001) => {
  text = encodeURI(text);
  const headers = {
    authority: 'im-api.us.tiktok.com',
    accept: 'application/x-protobuf',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-protobuf',
    'user-agent': `"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-protobuf',
    Pragma: 'no-cache',
    cookie: process.env.TIKTOK_COOKIE
  };

  let data = await fetch(`https://api16-normal-useast5.us.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${speaker}&req_text=${text}&speaker_map_type=0&aid=1233`, {
    headers: headers,
    method: 'POST',
  });
  if (data.status !== 200) {
    throw new Error(`Failed to fetch: ${data.status}`);
  }
  let res = await data.json();
  let output = res.data.v_str;

  //base64 decode
  let buff = Buffer.from(output, 'base64');

  return buff;
};
export {getAudio, Voices, voicesArray};
