import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ConditionEnumMap, SkillEnums, SkillIdentifierInfo, StatusEnums} from '../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {InputData} from '../in/types';
import {AttackingSkillOutput} from './main';


describe('ATK skill entry output', () => {
  const displayConfig: InputData['display'] = {
    actualDamage: false,
    damageInfo: true,
    damageDist: false,
    affliction: true,
    spInfo: true,
    animationInfo: false,
  };
  let conditionEnumMap: ConditionEnumMap;
  let skillIdentifierInfo: SkillIdentifierInfo;
  let skillEnums: SkillEnums;
  let statusEnums: StatusEnums;

  beforeAll(async () => {
    conditionEnumMap = await ResourceLoader.getEnumAllConditions();
    skillIdentifierInfo = await ResourceLoader.getSkillIdentifierInfo();
    skillEnums = await ResourceLoader.getEnumSkill();
    statusEnums = await ResourceLoader.getEnumAfflictionStatus();
  });

  it('shows no result if no entries to display', async () => {
    renderReact(() => (
      <AttackingSkillOutput
        displayConfig={displayConfig}
        calculatedEntries={[]}
        conditionEnumMap={conditionEnumMap}
        skillIdentifierInfo={skillIdentifierInfo}
        skillEnums={skillEnums}
        statusEnums={statusEnums}
      />
    ));

    expect(screen.getByText(translationEN.game.skillAtk.error.noResult)).toBeInTheDocument();
  });

  it.todo('shows animation info warning');

  it.todo('shows affliction warning');

  it.todo('renders actual skill entries');

  it.todo('shows actual damage if specified');
});
