import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {scrollToTop} from '../../../utils/misc';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {ResourceLoader} from '../../../utils/services/resources';
import {
  AttackingSkillData,
  ConditionEnumMap,
  ElementBonusData,
  SkillIdentifierInfo,
} from '../../../utils/services/resources/types';
import {AttackingSkillInput, AttackingSkillOutput, InputData} from '../../elements/gameData';

import {PageProps} from '../base';


type ElementBonusDataState = {
  fetched: boolean,
  elementBonusData: ElementBonusData,
}


type AttackingSkillEntryState = {
  fetched: boolean,
  atkSkillEntries: Array<AttackingSkillData>,
}


type ConditionEnumState = {
  fetched: boolean,
  conditionEnums: ConditionEnumMap,
}


type SkillIdentifierInfoState = {
  fetched: boolean,
  skillIdentifierInfo: SkillIdentifierInfo,
}


export const AttackingSkillList = () => {
  // region Input data forwarder
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

  const processData = (inputData: InputData) => () => {
    GoogleAnalytics.damageCalc('search', inputData);

    scrollToTop(entryCol);

    // This function is expensive, scroll first
    setInputDataForward(inputData);
  };
  // endregion

  // region Element bonus data & fetch
  const [elementBonusState, setElementBonusState] = React.useState<ElementBonusDataState>({
    fetched: false,
    elementBonusData: new ElementBonusData(),
  });

  // Fetch data
  if (!elementBonusState.fetched) {
    ResourceLoader.getElementBonusData((data) => {
      setElementBonusState({
        ...elementBonusState,
        fetched: true,
        elementBonusData: new ElementBonusData(data),
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the element bonus data.', e);
      });
  }
  // endregion

  // region Condition enums & fetch
  const [allConditionEnumState, setAllConditionEnumState] = React.useState<ConditionEnumState>({
    fetched: false,
    conditionEnums: {},
  });

  // Fetch data
  if (!allConditionEnumState.fetched) {
    ResourceLoader.getEnumAllConditions((data) => {
      setAllConditionEnumState({
        ...allConditionEnumState,
        fetched: true,
        conditionEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the resources of all condition enums.', e);
      });
  }
  // endregion

  // region Skill identifier info & fetch
  const [skillIdentifierInfoState, setSkillIdentifierInfoState] = React.useState<SkillIdentifierInfoState>({
    fetched: false,
    skillIdentifierInfo: {},
  });

  // Fetch data
  if (!skillIdentifierInfoState.fetched) {
    ResourceLoader.getSkillIdentifierInfo((data) => {
      setSkillIdentifierInfoState({
        ...skillIdentifierInfoState,
        fetched: true,
        skillIdentifierInfo: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the skill identifier info.', e);
      });
  }
  // endregion

  // region Attacking skill entries & fetch
  const [attackingSkillEntryState, setAttackingSkillEntryState] = React.useState<AttackingSkillEntryState>({
    fetched: false,
    atkSkillEntries: [],
  });

  // Fetch data
  if (!attackingSkillEntryState.fetched) {
    ResourceLoader.getAttackingSkillEntries((data) => {
      setAttackingSkillEntryState({
        ...attackingSkillEntryState,
        fetched: true,
        atkSkillEntries: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the attacking skill data.', e);
      });
  }
  // endregion

  return (
    <Row>
      <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
        <AttackingSkillInput onSearchRequested={processData}/>
      </Col>
      <Col ref={entryCol} lg={8}>
        <AttackingSkillOutput
          inputData={inputDataForward}
          allConditionEnums={allConditionEnumState.conditionEnums}
          elementBonusData={elementBonusState.elementBonusData}
          skillIdentifierInfo={skillIdentifierInfoState.skillIdentifierInfo}
          atkSkillEntries={attackingSkillEntryState.atkSkillEntries}/>
      </Col>
    </Row>
  );
};


export const AttackingSkillPage = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.game_data.skill_atk'));
  }

  // Add a layer of DOM to prevent fnSetTitle being called multiple times,
  // which sends page view event multiple times
  return <AttackingSkillList/>;
};
