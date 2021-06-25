import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {AttackingSkillInput} from './main';


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

  it.todo('expands');

  it.todo('uses correct input data to search after changes');

  it.todo('shows correct summary after changes');
});
