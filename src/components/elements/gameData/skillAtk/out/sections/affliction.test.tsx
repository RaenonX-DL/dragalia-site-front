import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../../api-def/api';
import {AttackingSkillData, DepotPaths, Element} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {SectionAffliction} from './affliction';


describe('Affliction section', () => {
  const templateEntry: AttackingSkillData = {
    chara: {
      element: Element.FLAME,
      iconName: 'icon',
      name: {
        [SupportedLanguages.CHT]: 'CHT name',
        [SupportedLanguages.EN]: 'EN name',
        [SupportedLanguages.JP]: 'JP name',
      },
    },
    condition: [],
    skill: {
      afflictions: [{
        actionTime: 1.5,
        duration: 15,
        probabilityPct: 120,
        stackable: true,
        statusCode: 5,
        statusConditionCode: 0,
        statusIcon: 'afflictionIcon',
      }],
      buffCountBoost: [],
      buffZoneBoost: {
        self: 0,
        ally: 0,
      },
      crisisMax: [],
      dispelMax: false,
      dispelTimingMax: [],
      hitsMax: 0,
      identifiers: ['s1'],
      internalId: 109501011,
      modsMax: [7],
      name: {
        [SupportedLanguages.CHT]: 'CHT skill',
        [SupportedLanguages.EN]: 'EN skill',
        [SupportedLanguages.JP]: 'JP skill',
      },
      sharable: false,
      spMax: 9999,
      ssCost: 5,
      ssSp: 17777,
    },
    uniqueHash: 'hash',
  };

  it('shows affliction with name', async () => {
    const entry = {...templateEntry};

    renderReact(() => <SectionAffliction atkSkillEntry={entry}/>);

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

    renderReact(() => <SectionAffliction atkSkillEntry={entry}/>);

    expect(screen.getByText(translationEN.game.skillAtk.entry.unstackable, {selector: 'span.badge'}))
      .toBeInTheDocument();
  });

  it('shows stackable affliction badge', async () => {
    const entry = {...templateEntry};

    renderReact(() => <SectionAffliction atkSkillEntry={entry}/>);

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

    const {container} = renderReact(() => <SectionAffliction atkSkillEntry={entry}/>);

    expect(container.firstChild).toBeNull();
  });
});
