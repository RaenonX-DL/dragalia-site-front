import {KeyPointType} from '../../../../api-def/api';


export type PointListItemEntry = {
  id: string,
  content: string,
}

export type CategorizedPointEntries = {
  type: KeyPointType,
  entries: Array<PointListItemEntry>
}
