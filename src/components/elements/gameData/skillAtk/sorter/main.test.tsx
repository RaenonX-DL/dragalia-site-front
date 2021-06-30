import React from 'react';

import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {AttackingSkillSorter} from './main';


describe('ATK skill entry sorter', () => {
  let onOrderPicked: jest.Mock;

  beforeEach(() => {
    onOrderPicked = jest.fn();
  });

  it('shows the current sort order', async () => {
    renderReact(() => <AttackingSkillSorter onOrderPicked={onOrderPicked}/>);

    expect(screen.getByText(`Order: ${translationEN.game.skillAtk.sort.damageDesc}`)).toBeInTheDocument();
  });

  it('dispatches on order picked event', async () => {
    renderReact(() => <AttackingSkillSorter onOrderPicked={onOrderPicked}/>);

    const dropdownButton = screen.getByText(/Order/);
    userEvent.click(dropdownButton);

    const orderButton = screen.getByText(translationEN.game.skillAtk.spInfo.efficiency.secPer1KSp);
    fireEvent.click(orderButton);

    expect(onOrderPicked).toHaveBeenCalledTimes(1);
  });
});
