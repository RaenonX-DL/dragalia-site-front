import React from 'react';

import {Col, Row} from 'react-bootstrap';

import {useTranslation} from '../../../i18n/utils';
import {scrollToTop} from '../../../utils/misc';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ResourceLoader} from '../../../utils/services/resources/loader';
import {ConditionEnumMap, ExAbilityDataEntry} from '../../../utils/services/resources/types';
import {useFetchState} from '../../elements/common/fetch';
import {ExAbilityInput} from '../../elements/gameData/ex/in/main';
import {InputData} from '../../elements/gameData/ex/in/types';
import {ExAbilityOutput} from '../../elements/gameData/ex/out/main';
import {PageProps} from '../props';


const ExAbilitySkillList = () => {
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

  const [
    exAbility,
    ,
    fetchExAbility,
  ] = useFetchState<Array<ExAbilityDataEntry>>(
    [],
    ResourceLoader.getAbilityEx,
    'Failed to fetch ex ability data.',
  );

  const [
    conditionEnums,
    ,
    fetchConditionEnums,
  ] = useFetchState<ConditionEnumMap>(
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

            scrollToTop(entryCol);

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
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.game_data.ex'));
  }

  // Add a layer of DOM to prevent fnSetTitle being called multiple times,
  // which sends page view event multiple times
  return <ExAbilitySkillList/>;
};
