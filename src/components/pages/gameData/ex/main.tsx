import React from 'react';

import Col from 'react-bootstrap/Col';

import {CharaExAbilityDataEntry} from '../../../../api-def/resources/types/ex';
import {ConditionEnumMap} from '../../../../api-def/resources/types/export/enums';
import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {AdsToolBottom, AdsToolTop} from '../../../elements/common/ads/main';
import {useFetchState} from '../../../elements/common/fetch';
import {RowTight} from '../../../elements/common/grid/row';
import {ExAbilityInput} from './in/main';
import {InputData} from './in/types';
import {ExAbilityOutput} from './out/main';


export const ExAbilityPage = () => {
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

  React.useEffect(() => {
    scrollRefToTop(entryCol);
  }, [inputDataForward]);

  return (
    <>
      <AdsToolTop/>
      <RowTight className="mb-2">
        <Col lg={4} className="mb-2">
          <ExAbilityInput
            onSearchRequested={(inputData: InputData) => () => {
              GoogleAnalytics.abilitySearch('EX', inputData);

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
      </RowTight>
      <AdsToolBottom/>
    </>
  );
};
