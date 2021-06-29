import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {generateCalculatedEntry} from '../../../../../../../../test/data/mock/skill';
import {renderReact} from '../../../../../../../../test/render/main';
import {StatusEnums} from '../../../../../../../api-def/resources';
import {translation as translationEN} from '../../../../../../../i18n/translations/en/translation';
import {ResourceLoader} from '../../../../../../../utils/services/resources/loader';
import {CalculatedSkillEntry} from '../../types';
import {SectionSpInfo} from './main';


describe('SP info section', () => {
  const calculatedDataTemplate: CalculatedSkillEntry = generateCalculatedEntry();
  let statusEnums: StatusEnums;

  beforeAll(async () => {
    statusEnums = await ResourceLoader.getEnumAfflictionStatus();
  });

  it('collapses on load', async () => {
    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedDataTemplate}
        statusEnums={statusEnums}
      />
    ));

    expect(screen.queryByText('1200', {selector: '.collapse.show'})).not.toBeInTheDocument();
  });

  it('shows table on click to expand', async () => {
    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedDataTemplate}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
  });

  it('shows SSP efficiency indexes if sharable', async () => {
    const calculatedData: CalculatedSkillEntry = {
      ...calculatedDataTemplate,
      skillEntry: {
        ...calculatedDataTemplate.skillEntry,
        skill: {
          ...calculatedDataTemplate.skillEntry.skill,
          sharable: true,
        },
      },
    };

    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedData}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSsp)).toBeInTheDocument();
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSsp)).toBeInTheDocument();
  });

  it('hides SSP efficiency indexes if not sharable', async () => {
    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedDataTemplate}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
    expect(screen.queryByText(translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSsp)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSsp)).not.toBeInTheDocument();
  });

  it('hides affliction efficiency if no affliction', async () => {
    const calculatedData: CalculatedSkillEntry = {
      ...calculatedDataTemplate,
      skillEntry: {
        ...calculatedDataTemplate.skillEntry,
        skill: {
          ...calculatedDataTemplate.skillEntry.skill,
          afflictions: [],
        },
      },
    };

    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedData}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
    expect(screen.queryByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSp)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSsp)).not.toBeInTheDocument();
  });

  it('shows affliction efficiency if there are any afflictions', async () => {
    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedDataTemplate}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSp)).toBeInTheDocument();
  });

  it('shows all efficiency indexes if sharable and afflicts', async () => {
    const calculatedData: CalculatedSkillEntry = {
      ...calculatedDataTemplate,
      skillEntry: {
        ...calculatedDataTemplate.skillEntry,
        skill: {
          ...calculatedDataTemplate.skillEntry.skill,
          sharable: true,
        },
      },
    };

    renderReact(() => (
      <SectionSpInfo
        calculatedData={calculatedData}
        statusEnums={statusEnums}
      />
    ));

    const efficiencyButton = screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiencyIndexes,
      {selector: 'button'},
    );
    userEvent.click(efficiencyButton);

    await waitFor(() => expect(screen.getByText(
      translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
      {selector: '.collapse.show *'},
    )).toBeInTheDocument());
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.modPctPer1KSsp)).toBeInTheDocument();
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSp)).toBeInTheDocument();
    expect(screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSsp)).toBeInTheDocument();
  });
});
