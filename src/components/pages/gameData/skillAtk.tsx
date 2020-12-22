import React, {Suspense} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ResourceLoader} from '../../../utils/services/resources';
import {AttackingSkillData, ElementBonusData} from '../../../utils/services/resources/types';
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
            elementBonusData={elementBonusState.elementBonusData}
            atkSkillEntries={attackingSkillEntryState.atkSkillEntries}/>
        </Suspense>
      </Col>
    </Row>
  );
};
