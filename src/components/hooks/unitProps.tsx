import {ElementEnums, WeaponTypeEnums} from '../../api-def/resources';
import {ResourceLoader} from '../../utils/services/resources/loader';
import {useFetchState} from '../elements/common/fetch';


type UseUnitPropsReturn = {
  weaponEnums: WeaponTypeEnums,
  elemEnums: ElementEnums,
}

export const useUnitProps = (): UseUnitPropsReturn => {
  const {
    fetchStatus: weaponEnums,
    fetchFunction: fetchWeaponEnums,
  } = useFetchState<WeaponTypeEnums>(
    {
      weapon: [],
    },
    ResourceLoader.getEnumWeaponTypes,
    'Failed to fetch the weapon type enums.',
  );
  const {
    fetchStatus: elemEnums,
    fetchFunction: fetchElemEnums,
  } = useFetchState<ElementEnums>(
    {elemental: []},
    ResourceLoader.getEnumElements,
    'Failed to fetch element enums.',
  );

  fetchWeaponEnums();
  fetchElemEnums();

  return {
    weaponEnums: weaponEnums.data,
    elemEnums: elemEnums.data,
  };
};
