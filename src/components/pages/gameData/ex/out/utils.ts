import {CharaExAbilityDataEntry} from '../../../../../api-def/resources';
import {InputData} from '../in/types';


export const filterExAbilityData = (exAbilityData: Array<CharaExAbilityDataEntry>, inputData: InputData) => {
  return exAbilityData.filter((entry) => {
    if (inputData.filter.elements.length && !inputData.filter.elements.includes(entry.chara.element)) {
      return false;
    }

    if (
      inputData.filter.exBuffParams.length > 0 &&
      !entry.ex.some((exEffect) => {
        return inputData.filter.exBuffParams.includes(exEffect.parameter.code);
      })
    ) {
      return false;
    }

    return inputData.filter.cexBuffParams.length === 0 ||
      entry.chainedEx.some((chainedExEffect) => {
        return inputData.filter.cexBuffParams.includes(chainedExEffect.parameter.code);
      });
  });
};
