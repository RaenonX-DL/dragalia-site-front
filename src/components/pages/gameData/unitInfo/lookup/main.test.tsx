import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  ApiResponseCode,
  SupportedLanguages,
  UnitInfoLookupAnalyses,
  UnitInfoLookupLandingResponse,
  UnitInfoLookupResponse,
  UnitType,
} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {overrideObject} from '../../../../../utils/override';
import * as scrollUtils from '../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {InputData} from './in/types';
import {generateInputData} from './in/utils';
import {UnitInfoLookup} from './main';


describe('Analysis lookup page', () => {
  let fnScroll: jest.SpyInstance;
  let fnGetLookup: jest.SpyInstance<Promise<UnitInfoLookupResponse>, [string, SupportedLanguages]>;
  let fnGetLookupLanding: jest.SpyInstance<Promise<UnitInfoLookupLandingResponse>, [string, SupportedLanguages]>;
  let fnGaAnalysisLookup: jest.SpyInstance;

  const analyses: UnitInfoLookupAnalyses = {
    10950101: {
      lang: SupportedLanguages.CHT,
      type: UnitType.CHARACTER,
      unitId: 10950101,
      viewCount: 777,
      modifiedEpoch: 3,
      publishedEpoch: 1,
      userSubscribed: false,
    },
    10950102: {
      lang: SupportedLanguages.CHT,
      type: UnitType.CHARACTER,
      unitId: 10950102,
      viewCount: 888,
      modifiedEpoch: 6,
      publishedEpoch: 4,
      userSubscribed: false,
    },
    10950301: {
      lang: SupportedLanguages.CHT,
      type: UnitType.CHARACTER,
      unitId: 10950301,
      viewCount: 999,
      modifiedEpoch: 6,
      publishedEpoch: 4,
      userSubscribed: true,
    },
  };

  const lookupResponseNoAnalyses: UnitInfoLookupResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    analyses: {},
  };

  const lookupResponseHasAnalyses: UnitInfoLookupResponse = {
    ...lookupResponseNoAnalyses,
    analyses,
  };

  const lookupLandingResponse: UnitInfoLookupLandingResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    analyses: [analyses[10950102], analyses[10950301]],
    userSubscribed: false,
  };

  beforeEach(() => {
    fnScroll = jest.spyOn(scrollUtils, 'scrollRefToTop').mockImplementation(() => void 0);
    fnGetLookup = jest.spyOn(ApiRequestSender, 'analysisLookup').mockResolvedValue({
      code: ApiResponseCode.NOT_EXECUTED,
      success: false,
      analyses: [],
    });
    fnGetLookupLanding = jest.spyOn(ApiRequestSender, 'unitInfoLookupLanding')
      .mockResolvedValue(lookupLandingResponse);
    fnGaAnalysisLookup = jest.spyOn(GoogleAnalytics, 'analysisLookup');
  });

  it('searches and scrolls if found', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseHasAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
  });

  it('searches and scrolls even if not found', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByText(translationEN.misc.searchKeyword);
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.type(keywordInput.previousSibling as Element, 'AAA');
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('scrolls on not found, also scrolls on found', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseHasAnalyses);
    const {rerender} = renderReact(() => <UnitInfoLookup/>);

    const keywordInput = screen.getByText(translationEN.misc.searchKeyword);
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.type(keywordInput.previousSibling as Element, 'AAA');
    userEvent.click(searchButton);

    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
    expect(screen.queryByText('Gala Leonidas')).not.toBeInTheDocument();

    rerender();

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    userEvent.clear(keywordInput.previousSibling as Element);
    userEvent.click(searchButton);

    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(3));
    expect(await screen.findByAltText('Gala Leonidas')).toBeInTheDocument();
  });

  it('searches by element and type', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Flame')).toBeInTheDocument());

    const flameElemButton = screen.getByAltText('Flame');
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(flameElemButton);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Panther')).toBeInTheDocument());
    expect(screen.queryByAltText('Karina')).not.toBeInTheDocument();
  });

  it('searches by weapon type', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Axe')).toBeInTheDocument());

    const flameElemButton = screen.getByAltText('Axe');
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(flameElemButton);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by keyword', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    const {rerender} = renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByText(translationEN.misc.searchKeyword);
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    typeInput(keywordInput.previousSibling as Element, 'Karina', {rerender});
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by pressing `enter`', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByText(translationEN.misc.searchKeyword);
    userEvent.type(keywordInput.previousSibling as Element, 'Karina');
    userEvent.type(keywordInput.previousSibling as Element, '{enter}');

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('sends GA event', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Water')).toBeInTheDocument());
    expect(screen.queryByAltText('Wind')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByAltText('Axe')).toBeInTheDocument());

    const waterElemButton = screen.getByAltText('Water');
    const windElemButton = screen.getByAltText('Wind');
    const axeButton = screen.getByAltText('Axe');
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(waterElemButton);
    userEvent.click(windElemButton);
    userEvent.click(axeButton);
    userEvent.click(searchButton);

    const expectedInput: InputData = overrideObject(
      generateInputData(),
      {
        elements: [2, 3],
        weaponTypes: [4],
      },
    );

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    expect(fnGaAnalysisLookup).toHaveBeenCalledTimes(1);
    expect(fnGaAnalysisLookup).toHaveBeenCalledWith(expectedInput);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('shows error if no units matching the search criteria', async () => {
    fnGetLookup.mockResolvedValue(lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    const keywordInput = screen.getByText(translationEN.misc.searchKeyword);
    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.type(keywordInput.previousSibling as Element, 'AAAA');
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByText(translationEN.misc.noResult)).toBeInTheDocument());
    expect(fnScroll).toHaveBeenCalledTimes(2);
    const errorText = screen.getByText(translationEN.misc.noResult);
    expect(errorText).toHaveClass('alert-danger');
  });
});
