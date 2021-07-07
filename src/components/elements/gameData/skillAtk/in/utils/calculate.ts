import {ElementBonusData} from '../../../../../../api-def/resources';
import {UseFetchEnumsReturn} from '../../hooks/enums';
import {CalculatedSkillEntry} from '../../out/types';
import {calculateEntries, filterSkillEntries} from '../../out/utils/entries';
import {InputData} from '../types';


export const getCalculatedEntries = (
  inputData: InputData,
  atkSkillEntries: UseFetchEnumsReturn['attackingSkillEntries'],
  elementBonusData: ElementBonusData,
): Array<CalculatedSkillEntry> => (
  calculateEntries(
    filterSkillEntries(inputData, atkSkillEntries),
    inputData,
    elementBonusData,
  )
);
