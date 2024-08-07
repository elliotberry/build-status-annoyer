const Voices = {
    AMERICA: {
        BR_001: 'br_001',
        BR_003: 'br_003',
        BR_004: 'br_004',
        BR_005: 'br_005',
        ES_MX_002: 'es_mx_002',
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
    DISNEY: {
        EN_US_C3PO: 'en_us_c3po',
        EN_US_CHEWBACCA: 'en_us_chewbacca',
        EN_US_GHOSTFACE: 'en_us_ghostface',
        EN_US_ROCKET: 'en_us_rocket',
        EN_US_STITCH: 'en_us_stitch',
        EN_US_STORMTROOPER: 'en_us_stormtrooper',
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
        DE_001: 'de_001',
        DE_002: 'de_002',
        ES_002: 'es_002',
        FR_001: 'fr_001',
        FR_002: 'fr_002',
    },
    OTHER: {
        EN_FEMALE_EMOTIONAL: 'en_female_emotional',
        EN_MALE_FUNNY: 'en_male_funny',
        EN_MALE_NARRATION: 'en_male_narration',
    },
    SINGING: {
        EN_FEMALE_F08_SALUT_DAMOUR: 'en_female_f08_salut_damour',
        EN_FEMALE_F08_WARMY_BREEZE: 'en_female_f08_warmy_breeze',
        EN_MALE_M03_LOBBY: 'en_male_m03_lobby',
        EN_MALE_M03_SUNSHINE_SOON: 'en_male_m03_sunshine_soon',
    },
}

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
    'en_female_emotional',
    'random',
]

export { Voices, voicesArray }
