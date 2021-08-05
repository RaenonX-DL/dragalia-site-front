import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {ApiResponseCode, SupportedLanguages, UnitType} from '../../../../api-def/api';
import {Element} from '../../../../api-def/resources/types/element';
import {Weapon} from '../../../../api-def/resources/types/weapon';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {UnitNameRefPage} from './main';


describe('Name reference management', () => {
  let fnGetRefs: jest.SpyInstance;
  let fnSetRefs: jest.SpyInstance;
  let fnGetUnitInfo: jest.SpyInstance;

  beforeEach(() => {
    fnGetRefs = jest.spyOn(ApiRequestSender, 'getUnitNameRefManage').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      refs: [
        {
          unitId: 10950101,
          name: 'G!Leon',
        },
        {
          unitId: 10950201,
          name: 'Furis',
        },
      ],
    });
    fnSetRefs = jest.spyOn(ApiRequestSender, 'updateUnitNameRefs').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
    fnGetUnitInfo = jest.spyOn(ResourceLoader, 'getCharacterInfo').mockResolvedValue([
      {
        id: 10950101,
        element: Element.FLAME,
        cvEn: {
          [SupportedLanguages.CHT]: 'CV EN CHT 1',
          [SupportedLanguages.EN]: 'CV EN EN 1',
          [SupportedLanguages.JP]: 'CV EN JP 1',
        },
        cvJp: {
          [SupportedLanguages.CHT]: 'CV JP CHT 1',
          [SupportedLanguages.EN]: 'CV JP EN 1',
          [SupportedLanguages.JP]: 'CV JP JP 1',
        },
        hasUniqueDragon: false,
        iconName: 'icon 1',
        name: {
          [SupportedLanguages.CHT]: 'CHARA CHT 1',
          [SupportedLanguages.EN]: 'CHARA EN 1',
          [SupportedLanguages.JP]: 'CHARA JP 1',
        },
        rarity: 5,
        releaseEpoch: 0,
        weapon: Weapon.SWORD,
        type: UnitType.CHARACTER,
      },
      {
        id: 10950201,
        element: Element.FLAME,
        cvEn: {
          [SupportedLanguages.CHT]: 'CV EN CHT 2',
          [SupportedLanguages.EN]: 'CV EN EN 2',
          [SupportedLanguages.JP]: 'CV EN JP 2',
        },
        cvJp: {
          [SupportedLanguages.CHT]: 'CV JP CHT 2',
          [SupportedLanguages.EN]: 'CV JP EN 2',
          [SupportedLanguages.JP]: 'CV JP JP 2',
        },
        hasUniqueDragon: false,
        iconName: 'icon 2',
        name: {
          [SupportedLanguages.CHT]: 'CHARA CHT 2',
          [SupportedLanguages.EN]: 'CHARA EN 2',
          [SupportedLanguages.JP]: 'CHARA JP 2',
        },
        rarity: 5,
        releaseEpoch: 0,
        weapon: Weapon.SWORD,
        type: UnitType.CHARACTER,
      },
      {
        id: 10850101,
        element: Element.FLAME,
        cvEn: {
          [SupportedLanguages.CHT]: 'CV EN CHT 3',
          [SupportedLanguages.EN]: 'CV EN EN 3',
          [SupportedLanguages.JP]: 'CV EN JP 3',
        },
        cvJp: {
          [SupportedLanguages.CHT]: 'CV JP CHT 3',
          [SupportedLanguages.EN]: 'CV JP EN 3',
          [SupportedLanguages.JP]: 'CV JP JP 3',
        },
        hasUniqueDragon: false,
        iconName: 'icon 3',
        name: {
          [SupportedLanguages.CHT]: 'CHARA CHT 3',
          [SupportedLanguages.EN]: 'CHARA EN 3',
          [SupportedLanguages.JP]: 'CHARA JP 3',
        },
        rarity: 5,
        releaseEpoch: 0,
        weapon: Weapon.SWORD,
        type: UnitType.CHARACTER,
      },
    ]);
  });

  it('gets all references on load', async () => {
    renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    await waitFor(() => expect(fnGetRefs).toHaveBeenCalled());
  });

  it('disables update if any of the unit name is empty', async () => {
    renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    const desiredNameInput = await screen.findByDisplayValue('G!Leon');
    userEvent.clear(desiredNameInput);

    expect(desiredNameInput).toHaveClass('is-invalid');

    const updateButton = screen.getByText(translationEN.misc.update);
    expect(updateButton).toBeDisabled();
  });

  it('disables update if any of the unit ID is invalid', async () => {
    const {rerender} = renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    const unitIdInput = await screen.findByDisplayValue('10950101');
    typeInput(unitIdInput, '1', {rerender});

    expect(unitIdInput).toHaveClass('is-invalid');

    const updateButton = screen.getByText(translationEN.misc.update);
    expect(updateButton).toBeDisabled();
  });

  it('allows update if no invalid input', async () => {
    const {rerender} = renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});
    await waitFor(() => expect(fnGetUnitInfo).toHaveBeenCalled());

    const unitIdInput = await screen.findByDisplayValue('10950101');
    userEvent.clear(unitIdInput);
    typeInput(unitIdInput, '10850101', {rerender});

    await waitFor(() => expect(unitIdInput).toHaveClass('is-valid'));

    const updateButton = screen.getByText(translationEN.misc.update);
    await waitFor(() => expect(updateButton).toBeEnabled());
  });

  it('updates correctly', async () => {
    const {rerender} = renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    const unitIdInput = await screen.findByDisplayValue('10950101');
    userEvent.clear(unitIdInput);
    typeInput(unitIdInput, '10850101', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    // Correct data sent?
    await waitFor(() => expect(fnSetRefs).toHaveBeenCalled());
    expect(fnSetRefs.mock.calls[0][2]).toStrictEqual([
      {
        unitId: 10850101,
        name: 'G!Leon',
      },
      {
        unitId: 10950201,
        name: 'Furis',
      },
    ]);

    // Updated marker shown?
    expect(screen.getByText('', {selector: 'i.bi-cloud-check'})).toBeInTheDocument();

    // Blocks re-update?
    expect(updateButton).toBeDisabled();
  });

  it('shows warning and does not block update on submission failed', async () => {
    fnSetRefs.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    });

    const {rerender} = renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    // Trigger update
    const unitIdInput = await screen.findByDisplayValue('10950101');
    userEvent.clear(unitIdInput);
    typeInput(unitIdInput, '10850101', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    expect(await screen.findByText('', {selector: 'i.bi-exclamation-circle'})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]))).toBeInTheDocument();
  });

  it('disables update button on load', async () => {
    renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    const updateButton = await screen.findByText(translationEN.misc.update);
    expect(updateButton).toBeDisabled();
  });

  it('enables update button after any change', async () => {
    const {rerender} = renderReact(() => <UnitNameRefPage/>, {hasSession: true, user: {isAdmin: true}});

    const unitIdInput = await screen.findByDisplayValue('10950101');
    userEvent.clear(unitIdInput);
    typeInput(unitIdInput, '10850101', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    await waitFor(() => expect(fnSetRefs).toHaveBeenCalled());
    expect(screen.getByText('', {selector: 'i.bi-cloud-check'})).toBeInTheDocument();
    expect(updateButton).toBeDisabled();

    userEvent.clear(unitIdInput);
    typeInput(unitIdInput, '10950101', {rerender});
    expect(updateButton).toBeEnabled();
  });
});
