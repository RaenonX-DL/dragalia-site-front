import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {overwriteInputData} from './in/utils/inputData';
import * as utils from './in/utils/inputData';
import {AttackingSkillLookup} from './main';


describe('ATK skill lookup', () => {
  const inputDataTemplate = utils.generateInputData();

  it('only display damage info', async () => {
    jest.spyOn(utils, 'generateInputData').mockImplementation(() => (
      overwriteInputData(
        inputDataTemplate,
        {
          filter: {
            afflictionCondCode: [109], // 109 for affliction condition code defined in the parser
          },
          display: {
            damageInfo: true,
            spInfo: false,
            affliction: false,
            actualDamage: false,
            animationInfo: false,
            damageDist: false,
          },
        },
      )
    ));

    renderReact(() => <AttackingSkillLookup/>);

    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    expect(await screen.findByText('Summer Julietta', undefined, {timeout: 2000})).toBeInTheDocument();
    // Damage info from S!Julietta
    expect(screen.getByText('2708%')).toBeInTheDocument();
    expect(screen.getAllByText('3 HIT').length).toBe(2); // There are multiple 3 hit bog skills
    // Actual damage from S!Julietta
    expect(screen.queryByText('161,524')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.queryByAltText('Bog')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.queryByText('', {selector: 'svg > rect'})).not.toBeInTheDocument();
  });

  it('only display affliction', async () => {
    jest.spyOn(utils, 'generateInputData').mockImplementation(() => (
      overwriteInputData(
        inputDataTemplate,
        {
          filter: {
            afflictionCondCode: [109], // 109 for affliction condition code defined in the parser
          },
          display: {
            damageInfo: false,
            spInfo: false,
            affliction: true,
            actualDamage: false,
            animationInfo: false,
            damageDist: false,
          },
        },
      )
    ));

    renderReact(() => <AttackingSkillLookup/>);

    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    expect(await screen.findByText('Summer Julietta', undefined, {timeout: 2000})).toBeInTheDocument();
    // Damage info from S!Julietta
    expect(screen.queryByText('2708%')).not.toBeInTheDocument();
    expect(screen.queryAllByText('3 HIT').length).toBe(0);
    // Actual damage from S!Julietta
    expect(screen.queryByText('161,524')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    await waitFor(() => expect(screen.getAllByAltText('Bog').length).toBeGreaterThan(0));
    // Affliction from S!Julietta
    expect(screen.queryByText('', {selector: 'svg > rect'})).not.toBeInTheDocument();
  });

  it('only display damage distribution', async () => {
    jest.spyOn(utils, 'generateInputData').mockImplementation(() => (
      overwriteInputData(
        inputDataTemplate,
        {
          filter: {
            afflictionCondCode: [109], // 109 for affliction condition code defined in the parser
          },
          display: {
            damageInfo: false,
            spInfo: false,
            affliction: false,
            actualDamage: false,
            animationInfo: false,
            damageDist: true,
          },
        },
      )
    ));

    renderReact(() => <AttackingSkillLookup/>);

    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    expect(await screen.findByText('Summer Julietta', undefined, {timeout: 2000})).toBeInTheDocument();
    // Damage info from S!Julietta
    expect(screen.queryByText('2708%')).not.toBeInTheDocument();
    expect(screen.queryAllByText('3 HIT').length).toBe(0);
    // Actual damage from S!Julietta
    expect(screen.queryByText('161,524')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.queryByAltText('Bog')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.getAllByText('', {selector: 'svg > rect'}).length).toBeGreaterThan(0);
  });

  it('only display actual damage', async () => {
    jest.spyOn(utils, 'generateInputData').mockImplementation(() => (
      overwriteInputData(
        inputDataTemplate,
        {
          filter: {
            afflictionCondCode: [109], // 109 for affliction condition code defined in the parser
          },
          display: {
            damageInfo: false,
            spInfo: false,
            affliction: false,
            actualDamage: true,
            animationInfo: false,
            damageDist: false,
          },
        },
      )
    ));

    renderReact(() => <AttackingSkillLookup/>);

    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    expect(await screen.findByText('Summer Julietta', undefined, {timeout: 2000})).toBeInTheDocument();

    // Damage info from S!Julietta
    expect(screen.queryByText('2708%')).not.toBeInTheDocument();
    expect(screen.queryAllByText('3 HIT').length).toBe(0);
    // Actual damage from S!Julietta
    expect(screen.getByText('161,524')).toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.queryByAltText('Bog')).not.toBeInTheDocument();
    // Affliction from S!Julietta
    expect(screen.queryByText('', {selector: 'svg > rect'})).not.toBeInTheDocument();
  });

  it('does not change the sort order if search again', async () => {
    jest.spyOn(utils, 'generateInputData').mockImplementation(() => (
      overwriteInputData(inputDataTemplate, {sortBy: 'sp'})
    ));

    const {rerender} = renderReact(() => <AttackingSkillLookup/>);

    // Initial search
    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);
    rerender();

    const dispelOnly = screen.getByText(translationEN.game.skillAtk.name.filterDispelOnly);
    userEvent.click(dispelOnly);
    rerender();
    userEvent.click(searchButton);
    rerender();

    // No ideas for checking if the order is really unchanged
    // - Spy on scroll top won't work because the change is not immediately reflected
    await new Promise((r) => setTimeout(r, 1000));

    expect(screen.getByText('Order: SP', {selector: 'button'})).toBeInTheDocument();
  }, 10000);

  it.todo('sorts on order changed');
});
