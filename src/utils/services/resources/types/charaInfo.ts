import {UnitInfoDataBase} from './common/unitInfo';

export type CharaInfoData = UnitInfoDataBase & {
  weapon: number,
  hasUniqueDragon: boolean,
}

export type CharaInfo = Array<CharaInfoData>
