import React, {Suspense} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ResourceLoader} from '../../../utils/services/resources';
import {
  AllConditionEnums,
  AttackingSkillData,
  ElementBonusData,
  SkillIdentifierInfo,
} from '../../../utils/services/resources/types';
import {PageLoading} from '../../elements';
import {AttackingSkillInput, AttackingSkillOutput, InputData} from '../../elements/gameData';
import {titleNavBarId} from '../../elements/posts/pageAnchor';

import {PageProps} from '../base';


type ElementBonusDataState = {
  fetched: boolean,
  elementBonusData: ElementBonusData,
}


type AttackingSkillEntryState = {
  fetched: boolean,
  atkSkillEntries: Array<AttackingSkillData>,
}


type AllConditionEnumState = {
  fetched: boolean,
  allConditionEnums: AllConditionEnums,
}


type SkillIdentifierInfoState = {
  fetched: boolean,
  skillIdentifierInfo: SkillIdentifierInfo,
}


export const AttackingSkillList = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.game_data.skill_atk'));
  }

  // region Input data forwarder
  const [inputDataForward, setInputDataForward] = React.useState<InputData>();
  const entryCol = React.useRef<HTMLDivElement>(null);

  const processData = (inputData: InputData) => () => {
    const topLocation = (
      (entryCol.current?.offsetTop || 0) -
      (document.getElementById(titleNavBarId)?.offsetHeight || 0)
    );

    window.scrollTo({top: topLocation, left: 0, behavior: 'smooth'});

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
  const [allConditionEnumState, setAllConditionEnumState] = React.useState<AllConditionEnumState>({
    fetched: false,
    allConditionEnums: {},
  });

  // Fetch data
  if (!allConditionEnumState.fetched) {
    ResourceLoader.getEnumAllConditions((data) => {
      setAllConditionEnumState({
        ...allConditionEnumState,
        fetched: true,
        allConditionEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the resources of all condition enums.', e);
      });
  }
  // endregion

  // region Attacking skill entries & fetch
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
        <Suspense fallback={<PageLoading/>}>
          <AttackingSkillOutput
            inputData={inputDataForward}
            allConditionEnums={allConditionEnumState.allConditionEnums}
            elementBonusData={elementBonusState.elementBonusData}
            skillIdentifierInfo={skillIdentifierInfoState.skillIdentifierInfo}
            atkSkillEntries={attackingSkillEntryState.atkSkillEntries}/>
        </Suspense>
      </Col>
    </Row>
  );
};
