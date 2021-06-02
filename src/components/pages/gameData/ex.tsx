import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {ConditionEnumMap, CharaExAbilityDataEntry} from '../../../api-def/resources';
import {useI18n} from '../../../i18n/hook';
import {scrollRefToTop} from '../../../utils/scroll';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ResourceLoader} from '../../../utils/services/resources/loader';
import {useFetchState} from '../../elements/common/fetch';
import {ExAbilityInput} from '../../elements/gameData/ex/in/main';
import {InputData} from '../../elements/gameData/ex/in/types';
import {ExAbilityOutput} from '../../elements/gameData/ex/out/main';
import {PageProps} from '../props';


const ExAbilitySkillList = () => {
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


export const ExAbilityPage = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  if (fnSetTitle) {
    fnSetTitle(t((t) => t.meta.inUse.gameData.ex.title));
  }

  // Add a layer of DOM to prevent fnSetTitle being called multiple times,
  // which sends page view event multiple times
  return <ExAbilitySkillList/>;
};
