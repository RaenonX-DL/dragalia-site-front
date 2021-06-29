import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {generateAttackingSkillEntry} from '../../../../../../../test/data/mock/skill';
import {renderReact} from '../../../../../../../test/render/main';
import {AttackingSkillData, DepotPaths, StatusEnums} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../utils/services/resources/loader';
import {SectionAffliction} from './affliction';


describe('Affliction section', () => {
  const templateEntry: AttackingSkillData = generateAttackingSkillEntry();
  let statusEnums: StatusEnums;

  beforeAll(async () => {
    statusEnums = await ResourceLoader.getEnumAfflictionStatus();
  });

  it('shows affliction with name', async () => {
    const entry = {...templateEntry};

    renderReact(() => <SectionAffliction atkSkillEntry={entry} statusEnums={statusEnums}/>);

    await waitFor(() => expect(screen.getByAltText('Blindness')).toBeInTheDocument());

    const afflictionIcon = screen.getByAltText('Blindness');
    expect(afflictionIcon).toHaveAttribute('src', DepotPaths.getAfflictionIconURL('afflictionIcon'));
    expect(screen.getByText('Blindness @ 1.50 s (120% / 15 s)')).toBeInTheDocument();
  });

  it('shows unstackable affliction badge', async () => {
    const entry = {
      ...templateEntry,
      skill: {
        ...templateEntry.skill,
        afflictions: [{
          actionTime: 1.5,
          duration: 15,
          probabilityPct: 120,
          stackable: false,
          statusCode: 5,
          statusConditionCode: 0,
          statusIcon: 'afflictionIcon',
        }],
      },
    };

    renderReact(() => <SectionAffliction atkSkillEntry={entry} statusEnums={statusEnums}/>);

    expect(screen.getByText(translationEN.game.skillAtk.entry.unstackable, {selector: 'span.badge'}))
      .toBeInTheDocument();
  });

  it('shows stackable affliction badge', async () => {
    const entry = {...templateEntry};

    renderReact(() => <SectionAffliction atkSkillEntry={entry} statusEnums={statusEnums}/>);

    expect(screen.getByText(translationEN.game.skillAtk.entry.stackable, {selector: 'span.badge'}))
      .toBeInTheDocument();
  });

  it('does not show anything if the entry does not have affliction', async () => {
    const entry = {
      ...templateEntry,
      skill: {
        ...templateEntry.skill,
        afflictions: [],
      },
    };

    const {container} = renderReact(() => <SectionAffliction atkSkillEntry={entry} statusEnums={statusEnums}/>);

    expect(container.firstChild).toBeNull();
  });
});
