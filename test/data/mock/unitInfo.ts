import {UnitType} from '../../../src/api-def/api/other/unit';
import {UnitInfoData} from '../../../src/api-def/resources';


export const generateGalaMymUnitInfo = (): UnitInfoData => {
  return {
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
    },
    rarity: 5,
    releaseEpoch: 1609480800.0,
  };
};
