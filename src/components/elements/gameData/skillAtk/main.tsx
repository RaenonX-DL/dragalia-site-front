import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ConditionEnumMap} from '../../../../api-def/resources/types/export/enums';
import {ElementBonus, ElementBonusData} from '../../../../api-def/resources/types/export/misc';
import {AttackingSkillData} from '../../../../api-def/resources/types/skillAtk';
import {SkillIdentifierInfo} from '../../../../api-def/resources/types/skillIdentifier';
import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {useFetchState, useFetchStateProcessed} from '../../common/fetch';
import {AttackingSkillInput} from './in/main';
import {InputData} from './in/types';
import {AttackingSkillOutput} from './out/main';


export const AttackingSkillLookup = () => {
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

  React.useEffect(() => {
    if (inputDataForward) {
      scrollRefToTop(entryCol);
    }
  }, [inputDataForward]);

  return (
    <Row>
      <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
        <AttackingSkillInput
          onSearchRequested={(inputData: InputData) => {
            GoogleAnalytics.damageCalc('search', inputData);

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
