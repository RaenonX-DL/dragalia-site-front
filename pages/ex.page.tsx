import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {CharaExAbilityDataEntry, ConditionEnumMap} from '../src/api-def/resources';
import {useFetchState} from '../src/components/elements/common/fetch';
import {ExAbilityInput} from '../src/components/elements/gameData/ex/in/main';
import {InputData} from '../src/components/elements/gameData/ex/in/types';
import {ExAbilityOutput} from '../src/components/elements/gameData/ex/out/main';
import {scrollRefToTop} from '../src/utils/scroll';
import {GoogleAnalytics} from '../src/utils/services/ga';
import {ResourceLoader} from '../src/utils/services/resources/loader';


const ExAbilityPage = () => {
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

  const {
    fetchStatus: exAbility,
    fetchFunction: fetchExAbility,
  } = useFetchState<Array<CharaExAbilityDataEntry>>(
    [],
    ResourceLoader.getAbilityEx,
    'Failed to fetch ex ability data.',
  );

  const {
    fetchStatus: conditionEnums,
    fetchFunction: fetchConditionEnums,
  } = useFetchState<ConditionEnumMap>(
    {},
    ResourceLoader.getEnumAllConditions,
    'Failed to fetch condition enums.',
  );

  fetchExAbility();
  fetchConditionEnums();

  return (
    <Row>
      <Col lg={4} className="mb-3">
        <ExAbilityInput
          onSearchRequested={(inputData: InputData) => () => {
            GoogleAnalytics.abilitySearch('EX', inputData);

            scrollRefToTop(entryCol);

            // This function is expensive, scroll first
            setInputDataForward(inputData);
          }}
        />
      </Col>
      <Col ref={entryCol} lg={8}>
        <ExAbilityOutput
          inputData={inputDataForward}
          exAbilityData={exAbility.data}
          conditionEnums={conditionEnums.data}
        />
      </Col>
    </Row>
  );
};

export default ExAbilityPage;
