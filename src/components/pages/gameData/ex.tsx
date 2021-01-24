import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {scrollToTop} from '../../../utils/misc';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ExInput} from '../../elements/gameData/ex/inputMain';
import {InputData} from '../../elements/gameData/ex/inputSection';
import {PageProps} from '../base';


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

  // FIXME: forward to output
  console.log(inputDataForward);

  return (
    <Row>
      <Col lg={4}>
        <ExInput onSearchRequested={processData}/>
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
