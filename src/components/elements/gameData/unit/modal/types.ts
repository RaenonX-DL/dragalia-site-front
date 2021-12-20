import {UnitType} from '../../../../../api-def/api';
import {ModalStateMapped} from '../../../common/modal/types';


export type UnitLinkModalState = ModalStateMapped<'content' | 'loading'>;

type UnitInfoBase = {
  id: number,
  name: string,
};

export type UnitInfo = UnitInfoBase & {
  icon?: UnitIcon,
};

export type UnitInfoRequireIcon = UnitInfoBase & {
  icon: UnitIcon,
};

export type UnitIcon = {
  type: UnitType,
  name: string,
};
