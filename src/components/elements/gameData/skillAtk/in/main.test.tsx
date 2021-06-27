import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {AttackingSkillInput} from './main';
import {generateInputData, overwriteInputData} from './utils';


describe('ATK skill input', () => {
  let fnOnSearch: jest.Mock;

  beforeEach(() => {
    fnOnSearch = jest.fn();
  });

  it('collapsed to summary on load', async () => {
    renderReact(() => <AttackingSkillInput onSearchRequested={fnOnSearch}/>);

    const inspireButton = screen.queryByText(
      translationEN.game.skillAtk.name.crtInspired,
      {selector: '.collapse.show'},
    );
    expect(inspireButton).not.toBeInTheDocument();
  });

  it('cannot search if no info to display', async () => {
    renderReact(() => <AttackingSkillInput onSearchRequested={fnOnSearch}/>);

    const displayDamageInfo = screen.getByText(translationEN.game.skillAtk.display.options.damageInfo);
    const displaySpInfo = screen.getByText(translationEN.game.skillAtk.display.options.spInfo);
    const displayAffliction = screen.getByText(
      translationEN.game.skillAtk.display.options.affliction,
      {selector: 'span'},
    );
    userEvent.click(displayDamageInfo);
    userEvent.click(displaySpInfo);
    userEvent.click(displayAffliction);

    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);

    const errorMessage = translationEN.game.skillAtk.error.noInfoToDisplay;
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
    expect(fnOnSearch).not.toHaveBeenCalled();
  });

  it('sends correct items to display in input data', async () => {
    renderReact(() => <AttackingSkillInput onSearchRequested={fnOnSearch}/>);

    const displayAffliction = screen.getByText(
      translationEN.game.skillAtk.display.options.affliction,
      {selector: 'span'},
    );
    userEvent.click(displayAffliction);

    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);

    expect(fnOnSearch).toHaveBeenCalledTimes(1);
    expect(fnOnSearch)
      .toHaveBeenLastCalledWith(overwriteInputData(generateInputData(), {display: {affliction: false}}));
  });

  it.todo('expands');

  it.todo('uses correct input data to search after changes');

  it.todo('shows correct summary after changes');
});
