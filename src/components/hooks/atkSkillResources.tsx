import {
  AttackingSkillData,
  ConditionEnumMap,
  ElementBonus,
  ElementBonusData,
  SkillEnums,
  SkillIdentifierInfo,
  StatusEnums,
} from '../../api-def/resources';
import {ResourceLoader} from '../../utils/services/resources/loader';
import {DeepPartial} from '../../utils/types';
import {useFetchState, useFetchStateProcessed} from '../elements/common/fetch';
import {EnumDataPack} from '../pages/gameData/skillAtk/out/props';


type AtkSkillResourceToFetch = 'all' | 'conditionEnumsOnly';

type UseAtkSkillResourceOptions = {
  toFetch: AtkSkillResourceToFetch,
};

export type UseAtkSkillResourcesReturn = EnumDataPack & {
  attackingSkillEntries: Array<AttackingSkillData>,
  elementBonuses: ElementBonusData,
  isAllFetched: boolean,
};

const generateOptions = (overwrite?: DeepPartial<UseAtkSkillResourceOptions>): UseAtkSkillResourceOptions => ({
  toFetch: overwrite?.toFetch || 'all',
});

export const useAtkSkillResources = (
  options?: DeepPartial<UseAtkSkillResourceOptions>,
): UseAtkSkillResourcesReturn => {
  const optionsInternal = generateOptions(options);

  const {
    fetchStatus: elementBonuses,
    fetchFunction: fetchElementBonuses,
  } = useFetchStateProcessed<ElementBonusData, ElementBonus>(
    new ElementBonusData(),
    ResourceLoader.getElementBonusData,
    'Failed to fetch element bonus data.',
    (response) => new ElementBonusData(response),
  );
  const {
    fetchStatus: conditionEnums,
    fetchFunction: fetchConditionEnums,
  } = useFetchState<ConditionEnumMap>(
    {},
    ResourceLoader.getEnumAllConditions,
    'Failed to fetch condition enums.',
  );
  const {
    fetchStatus: skillIdentifiers,
    fetchFunction: fetchSkillIdentifiers,
  } = useFetchState<SkillIdentifierInfo>(
    {},
    ResourceLoader.getSkillIdentifierInfo,
    'Failed to fetch skill identifiers.',
  );
  const {
    fetchStatus: attackingSkillEntries,
    fetchFunction: fetchAttackingSkillEntries,
  } = useFetchState<Array<AttackingSkillData>>(
    [],
    ResourceLoader.getAttackingSkillEntries,
    'Failed to fetch attacking skill entries.',
  );
  const {fetchStatus: skillEnums, fetchFunction: fetchSkillEnums} = useFetchState<SkillEnums>(
    {cancel: []},
    ResourceLoader.getEnumSkill,
    'Failed to fetch skill enums.',
  );
  const {
    fetchStatus: statusEnums,
    fetchFunction: fetchStatusEnums,
  } = useFetchState<StatusEnums>(
    {status: []},
    ResourceLoader.getEnumAfflictionStatus,
    'Failed to fetch affliction status enums.',
  );

  if (optionsInternal.toFetch === 'all') {
    fetchElementBonuses();
    fetchSkillIdentifiers();
    fetchAttackingSkillEntries();
    fetchSkillEnums();
    fetchStatusEnums();
  }
  fetchConditionEnums();

  const allFetchedFlags: {[K in AtkSkillResourceToFetch]: Array<boolean>} = {
    all: [
      elementBonuses.fetched,
      conditionEnums.fetched,
      skillIdentifiers.fetched,
      attackingSkillEntries.fetched,
      skillEnums.fetched,
      statusEnums.fetched,
    ],
    conditionEnumsOnly: [conditionEnums.fetched],
  };

  return {
    elementBonuses: elementBonuses.data,
    conditionEnumMap: conditionEnums.data,
    skillIdentifierInfo: skillIdentifiers.data,
    attackingSkillEntries: attackingSkillEntries.data,
    skillEnums: skillEnums.data,
    statusEnums: statusEnums.data,
    isAllFetched: allFetchedFlags[optionsInternal.toFetch].every((fetched) => fetched),
  };
};
