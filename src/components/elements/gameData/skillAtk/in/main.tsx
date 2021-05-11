import React, {MouseEvent} from 'react';

import {Button, Collapse} from 'react-bootstrap';

import {ConditionCodes} from '../../../../../const/gameData';
import {useTranslation} from '../../../../../i18n/utils';
import {scrollToTop} from '../../../../../utils/scroll';
import {InputParameters} from './params';
import {InputSummary} from './summary';
import {InputData} from './types';


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const AttackingSkillInput = ({onSearchRequested}: InputProps) => {
  const {t} = useTranslation();

  const [collapsed, setCollapsed] = React.useState(true);

  const [inputData, setInputData] = React.useState<InputData>({
    atkInGame: 7000,
    atkConditionalPct: 20,
    atkBuffPct: 30,
    buffCount: 0,
    buffZoneSelf: 0,
    buffZoneAlly: 0,
    exBlade: true,
    exWand: true,
    criticalRatePct: 4,
    criticalDamagePct: 0,
    criticalInspired: false,
    skillBuffPct: 0,
    skillPassivePct: 40,
    skillEnergized: false,
    punishersBkPct: 0,
    punishersOtherPct: 20,
    otherElemBonusPct: 0,
    otherCurrentHpPct: 100,
    targetElemCondCode: ConditionCodes.TARGET_ELEM_EFFECTIVE,
    targetAfflictionCodes: [],
    targetDefBase: 10,
    targetDefDownPct: 0,
    targetDefBkRate: 0.6,
    targetStateCode: ConditionCodes.NONE,
    filterElementCode: [],
    filterAfflictionCondCode: [],
    filterSharedOnly: false,
  });

  const onCollapseClicked = () => {
    setCollapsed(!collapsed);

    scrollToTop();
  };

  return (
    <>
      <Collapse in={collapsed}>
        <div>
          <InputSummary inputData={inputData}/>
          <hr/>
        </div>
      </Collapse>
      <InputParameters
        collapsed={collapsed}
        inputData={inputData}
        setInputData={setInputData}
      />
      <hr/>
      <div className="text-right">
        <Button variant="outline-primary" onClick={onCollapseClicked} className="mr-2">
          {t('game.skill_atk.collapse')}
        </Button>
        <Button variant="outline-info" onClick={onSearchRequested(inputData)}>
          {t('game.skill_atk.search')}
        </Button>
      </div>
    </>
  );
};
