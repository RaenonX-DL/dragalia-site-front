import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {
  AttackingSkillData,
  ConditionEnumMap,
  ElementBonus,
  ElementBonusData,
  SkillIdentifierInfo,
} from '../../../api-def/resources';
import {useI18n} from '../../../i18n/hook';
import {scrollRefToTop} from '../../../utils/scroll';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ResourceLoader} from '../../../utils/services/resources';
import {useFetchState, useFetchStateProcessed} from '../../elements/common/fetch';
import {AttackingSkillInput, AttackingSkillOutput, InputData} from '../../elements/gameData';
import {PageProps} from '../props';


export const AttackingSkillList = () => {
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

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

  fetchElementBonuses();
  fetchConditionEnums();
  fetchSkillIdentifiers();
  fetchAttackingSkillEntries();

  return (
    <Row>
      <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
        <AttackingSkillInput
          onSearchRequested={(inputData: InputData) => () => {
            GoogleAnalytics.damageCalc('search', inputData);

            scrollRefToTop(entryCol);

            // This function is expensive, scroll first
            setInputDataForward(inputData);
          }}
        />
      </Col>
      <Col ref={entryCol} lg={8} className="px-0 px-lg-3">
        <AttackingSkillOutput
          inputData={inputDataForward}
          allConditionEnums={conditionEnums.data}
          elementBonusData={elementBonuses.data}
          skillIdentifierInfo={skillIdentifiers.data}
          atkSkillEntries={attackingSkillEntries.data}
        />
      </Col>
    </Row>
  );
};


export const AttackingSkillPage = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  if (fnSetTitle) {
    fnSetTitle(t((t) => t.meta.inUse.gameData.skillAtk.title));
  }

  // Add a layer of DOM to prevent fnSetTitle being called multiple times,
  // which sends page view event multiple times
  return <AttackingSkillList/>;
};
