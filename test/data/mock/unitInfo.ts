import {UnitType} from '../../../src/api-def/api';
import {UnitInfoData} from '../../../src/api-def/resources';


export const generateGalaMymInfo = (): UnitInfoData => ({
  type: UnitType.CHARACTER,
  cvEn: {
    cht: 'Kelly Marie',
    en: 'Kelly Marie',
    jp: 'Kelly Marie',
  },
  cvJp: {
    cht: '遠藤綾',
    en: 'Aya Endo',
    jp: '遠藤綾',
  },
  element: 1,
  iconName: '100010_04_r05',
  id: 10550101,
  name: {
    cht: '慕慕（龍絆日Ver.）',
    en: 'Gala Mym',
    jp: 'ムム（ドラフェスVer.）',
    chs: '穆穆（Fes限定Ver.）',
  },
  rarity: 5,
  releaseEpoch: 1609480800.0,
});

export const generateBrunhildaInfo = (): UnitInfoData => ({
  type: UnitType.DRAGON,
  cvEn: {
    cht: 'Kelly Marie',
    en: 'Kelly Marie',
    jp: 'Kelly Marie',
  },
  cvJp: {
    cht: '遠藤綾',
    en: 'Aya Endo',
    jp: '遠藤綾',
  },
  element: 1,
  iconName: '210002_01',
  id: 20040101,
  name: {
    cht: '布倫希爾德',
    en: 'Brunhilda',
    jp: 'ブリュンヒルデ',
    chs: '布伦希尔德',
  },
  rarity: 4,
  releaseEpoch: 1609480800.0,
});

export const generateHighBrunhildaInfo = (): UnitInfoData => ({
  type: UnitType.DRAGON,
  cvEn: {
    cht: 'Kelly Marie',
    en: 'Kelly Marie',
    jp: 'Kelly Marie',
  },
  cvJp: {
    cht: '遠藤綾',
    en: 'Aya Endo',
    jp: '遠藤綾',
  },
  element: 1,
  iconName: '210039_01',
  id: 20050102,
  name: {
    cht: '真‧布倫希爾德',
    en: 'High Brunhilda',
    jp: '真ブリュンヒルデ',
    chs: '真布伦希尔德',
  },
  rarity: 5,
  releaseEpoch: 1609480800.0,
});
