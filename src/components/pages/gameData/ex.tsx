import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {scrollToTop} from '../../../utils/misc';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ResourceLoader} from '../../../utils/services/resources/loader';
import {ConditionEnumMap, ExAbilityDataEntry} from '../../../utils/services/resources/types';
import {ExAbilityInput} from '../../elements/gameData/ex/inputMain';
import {InputData} from '../../elements/gameData/ex/inputSection';
import {ExAbilityOutput} from '../../elements/gameData/ex/outputMain';
import {PageProps} from '../base';


type ExAbilityDataState = {
  fetched: boolean,
  abilityData: Array<ExAbilityDataEntry>,
}


type ConditionEnumState = {
  fetched: boolean,
  conditionEnums: ConditionEnumMap,
}


const ExAbilitySkillList = () => {
  // region Input data forwarder
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

  const processData = (inputData: InputData) => () => {
    GoogleAnalytics.abilitySearch('EX', inputData);

    scrollToTop(entryCol);

    // This function is expensive, scroll first
    setInputDataForward(inputData);
  };
  // endregion

  // region Ability data fetch
  const [exAbilityData, setExAbilityData] = React.useState<ExAbilityDataState>({
    fetched: false,
    abilityData: [],
  });

  // Fetch data
  if (!exAbilityData.fetched) {
    ResourceLoader.getAbilityEx((data) => {
      setExAbilityData({
        fetched: true,
        abilityData: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the resources of the ability data on each playable character.', e);
      });
  }
  // endregion

  // region Condition enums & fetch
  const [conditionEnums, setConditionEnums] = React.useState<ConditionEnumState>({
    fetched: false,
    conditionEnums: {},
  });

  // Fetch data
  if (!conditionEnums.fetched) {
    ResourceLoader.getEnumAllConditions((data) => {
      setConditionEnums({
        fetched: true,
        conditionEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the resources of all condition enums.', e);
      });
  }
  // endregion

  return (
    <Row>
      <Col lg={4} className="mb-3">
        <ExAbilityInput onSearchRequested={processData}/>
      </Col>
      <Col ref={entryCol} lg={8}>
        <ExAbilityOutput
          inputData={inputDataForward} exAbilityData={exAbilityData.abilityData}
          conditionEnums={conditionEnums.conditionEnums}/>
      </Col>
    </Row>
  );
};


export const ExAbilityPage = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.game_data.skill_atk'));
  }

  // Add a layer of DOM to prevent fnSetTitle being called multiple times,
  // which sends page view event multiple times
  return <ExAbilitySkillList/>;
};
