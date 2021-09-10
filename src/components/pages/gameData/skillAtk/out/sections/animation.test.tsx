import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {generateAttackingSkillEntry} from '../../../../../../../test/data/mock/skill';
import {renderReact} from '../../../../../../../test/render/main';
import {ConditionEnumMap, SkillEnums} from '../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../utils/services/resources/loader';
import {SectionAnimation} from './animation';


describe('ATK skill entry - Animation info section', () => {
  let atkSkillEntryTemplate = {...generateAttackingSkillEntry()};
  atkSkillEntryTemplate = {
    ...atkSkillEntryTemplate,
    skill: {
      ...atkSkillEntryTemplate.skill,
      hitTimingSecMax: [0.7, 1.3, 2.0],
      cancelActionsMax: [
        {
          action: 0,
          time: 2.7,
          conditions: [],
        },
        {
          action: 0,
          time: 5.4,
          conditions: [181],
        },
      ],
    },
  };
  let conditionEnumMap: ConditionEnumMap;
  let skillEnums: SkillEnums;

  beforeAll(async () => {
    conditionEnumMap = await ResourceLoader.getEnumAllConditions();
    skillEnums = await ResourceLoader.getEnumSkill();
  });

  it('collapses hit timing table on load', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.queryByText('2.00', {selector: '.collapse.show'})).not.toBeInTheDocument();
  });

  it('collapses cancel info table on load', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.queryByText('5.40', {selector: '.collapse.show'})).not.toBeInTheDocument();
  });

  it('expands to show hit timing table', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    const hitTimingButton = screen.getByText(
      new RegExp(translationEN.game.skillAtk.animation.hitTiming),
      {selector: 'button'},
    );
    userEvent.click(hitTimingButton);

    await waitFor(() => expect(screen.getByText('2.00', {selector: '.collapse.show *'})).toBeInTheDocument());
  });

  it('expands to show cancel info table', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    const cancelInfoButton = screen.getByText(new RegExp(translationEN.game.skillAtk.animation.cancelInfo));
    userEvent.click(cancelInfoButton);

    await waitFor(() => expect(screen.getByText('5.40', {selector: '.collapse.show *'})).toBeInTheDocument());
  });

  it('hides hit timing table on button click', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    const hitTimingButton = screen.getByText(
      new RegExp(translationEN.game.skillAtk.animation.hitTiming),
      {selector: 'button'},
    );
    userEvent.click(hitTimingButton);

    await waitFor(() => expect(screen.getByText('2.00', {selector: '.collapse.show *'})).toBeInTheDocument());

    userEvent.click(hitTimingButton);

    await waitFor(() => expect(screen.queryByText('2.00', {selector: '.collapse.show *'})).not.toBeInTheDocument());
  });

  it('hides cancel info table on button click', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    const cancelInfoButton = screen.getByText(new RegExp(translationEN.game.skillAtk.animation.cancelInfo));
    userEvent.click(cancelInfoButton);

    await waitFor(() => expect(screen.getByText('5.40', {selector: '.collapse.show *'})).toBeInTheDocument());

    userEvent.click(cancelInfoButton);

    await waitFor(() => expect(screen.queryByText('5.40', {selector: '.collapse.show *'})).not.toBeInTheDocument());
  });

  it('shows cancel action precondition column if any cancel action has it', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.getByText(translationEN.game.skillAtk.animation.cancelHeader.preConditions))
      .toBeInTheDocument();
    expect(screen.getByText('Target State: OD')).toBeInTheDocument();
  });

  it('hides cancel action precondition column if no cancel action has it', async () => {
    const atkSkillEntry = {
      ...atkSkillEntryTemplate,
      skill: {
        ...atkSkillEntryTemplate.skill,
        cancelActionsMax: [{
          action: 0,
          time: 2.7,
          conditions: [],
        }],
      },
    };

    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntry}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.queryByText(new RegExp(translationEN.game.skillAtk.animation.cancelHeader.preConditions)))
      .not.toBeInTheDocument();
  });

  it('shows earliest hit timing', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.getByText(/0.70 sec @ Earliest/)).toBeInTheDocument();
  });

  it('shows disabled button for cancel info if unavailable', async () => {
    const atkSkillEntry = {
      ...atkSkillEntryTemplate,
      skill: {
        ...atkSkillEntryTemplate.skill,
        cancelActionsMax: [],
      },
    };

    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntry}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.getByText(new RegExp(translationEN.game.skillAtk.animation.cancelInfo)))
      .toHaveAttribute('disabled');
  });

  it('shows earliest cancel timing', async () => {
    renderReact(() => (
      <SectionAnimation
        atkSkillEntry={atkSkillEntryTemplate}
        conditionEnumMap={conditionEnumMap}
        skillEnums={skillEnums}
      />
    ));

    expect(screen.getByText(/2.70 sec @ Earliest/)).toBeInTheDocument();
  });
});
