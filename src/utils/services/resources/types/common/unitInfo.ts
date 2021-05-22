import {MultiLangText} from './text';

export type UnitInfoDataBase = {
  name: MultiLangText,
  iconName: string,
  id: number,
  element: number,
  rarity: number,
  cvEn: MultiLangText,
  cvJp: MultiLangText,
  releaseEpoch: number,
}
