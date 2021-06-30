import React from 'react';

import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import * as warnings from '../warnings/overLength';
import * as calcs from './in/utils/calculate';
import * as utils from './in/utils/inputData';
import {overwriteInputData} from './in/utils/inputData';
import {AttackingSkillLookup} from './main';
import * as output from './out/main';


describe('ATK skill lookup', () => {
  const inputDataTemplate = utils.generateInputData();
  let fnOverLengthCheck: jest.SpyInstance;

  const waitForEntryProcessed = async () => {
    await waitFor(() => expect(fnOverLengthCheck).toHaveBeenCalledTimes(1));
  };

  const waitForResourcesLoaded = async () => {
    await waitFor(() => expect(screen.getByText(translationEN.misc.search)).not.toBeDisabled());
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    fnOverLengthCheck = jest.spyOn(warnings, 'overLengthWarningCheck');
  });

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

    renderReact(() => <AttackingSkillLookup/>);

    // Initial search
    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    fnOverLengthCheck.mockClear();
    const dispelOnly = screen.getByText(translationEN.game.skillAtk.name.filterDispelOnly);
    userEvent.click(dispelOnly);
    userEvent.click(searchButton);

    await waitForEntryProcessed();

    expect(screen.getByText('Order: SP', {selector: 'button'})).toBeInTheDocument();
  }, 10000);

  it('re-search on order changed', async () => {
    renderReact(() => <AttackingSkillLookup/>);

    // Wait until all resources are loaded
    await waitForResourcesLoaded();

    const sortOrderButton = screen.getByText('Order: Damage', {selector: 'button'});
    userEvent.click(sortOrderButton);

    const sspOrderButton = screen.getByText(translationEN.game.skillAtk.spInfo.ssp);
    fireEvent.click(sspOrderButton);

    await waitForEntryProcessed();
  });

  it('does not allow creating preset if the user is anonymous', async () => {
    renderReact(() => <AttackingSkillLookup/>);

    // Wait until all resources are loaded
    await waitForResourcesLoaded();

    // Initial search
    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    await waitForEntryProcessed();

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    userEvent.click(shareButton);

    const mustLoginWarning = translationEN.game.skillAtk.error.presetMustLogin;
    await waitFor(() => expect(screen.getByText(mustLoginWarning)).toBeInTheDocument());
  });

  it('cannot create preset on load', async () => {
    renderReact(() => <AttackingSkillLookup/>);

    // Wait until all resources are loaded
    await waitForResourcesLoaded();

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    expect(shareButton.parentNode).toBeDisabled();
  });

  it('cannot create preset if there are no results', async () => {
    jest.spyOn(calcs, 'getCalculatedEntries').mockReturnValue([]);
    const outputComponent = jest.spyOn(output, 'AttackingSkillOutput');

    renderReact(() => <AttackingSkillLookup/>);

    // Wait until all resources are loaded
    await waitForResourcesLoaded();
    outputComponent.mockClear();

    // Initial search
    const searchButton = await screen.findByText(
      translationEN.misc.search,
      {selector: 'button:enabled'},
      {timeout: 2000},
    );
    userEvent.click(searchButton);

    await waitFor(() => expect(outputComponent).toHaveBeenCalledTimes(1));

    const shareButton = screen.getByText('', {selector: 'i.bi-share-fill'});
    expect(shareButton.parentNode).toBeDisabled();
  });
});
