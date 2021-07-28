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
import * as scrollUtils from '../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {InputData} from './in/types';
import {generateInputData, overrideInputData} from './in/utils';
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
    },
    10950102: {
      lang: SupportedLanguages.CHT,
      type: UnitType.CHARACTER,
      unitId: 10950102,
      viewCount: 888,
      modifiedEpoch: 6,
      publishedEpoch: 4,
    },
    10950301: {
      lang: SupportedLanguages.CHT,
      type: UnitType.CHARACTER,
      unitId: 10950301,
      viewCount: 999,
      modifiedEpoch: 6,
      publishedEpoch: 4,
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
  };

  beforeEach(() => {
    fnScroll = jest.spyOn(scrollUtils, 'scrollRefToTop').mockImplementation(() => void 0);
    fnGetLookup = jest.spyOn(ApiRequestSender, 'analysisLookup');
    fnGetLookupLanding = jest.spyOn(ApiRequestSender, 'unitInfoLookupLanding')
      .mockImplementation(async () => lookupLandingResponse);
    fnGaAnalysisLookup = jest.spyOn(GoogleAnalytics, 'analysisLookup');
  });

  it('searches and scrolls if found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseHasAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
  });

  it('searches and scrolls even if not found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.type(keywordInput, 'AAA');
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('scrolls on not found, also scrolls on found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    const {rerender} = renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.type(keywordInput, 'AAA');
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(fnScroll).toHaveBeenCalledTimes(2));
    expect(screen.queryByText('Gala Leonidas')).not.toBeInTheDocument();

    fnGetLookup.mockImplementationOnce(async () => lookupResponseHasAnalyses);
    rerender();

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    userEvent.clear(keywordInput);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument());
    expect(fnScroll).toHaveBeenCalledTimes(3);
  }, 15000); // Finding `Gala Leonidas` is time-consuming, causing false negative

  it('searches by element and type', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Flame')).toBeInTheDocument());

    const flameElemButton = screen.getByAltText('Flame');
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(flameElemButton);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument());
    expect(screen.queryByAltText('Karina')).not.toBeInTheDocument();
  });

  it('searches by weapon type', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Axe')).toBeInTheDocument());

    const flameElemButton = screen.getByAltText('Axe');
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(flameElemButton);
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by keyword', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    const {rerender} = renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    typeInput(keywordInput, 'Karina', {rerender});
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by pressing `enter`', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    userEvent.type(keywordInput, 'Karina');
    userEvent.type(keywordInput, '{enter}');

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Karina')).toBeInTheDocument());
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('sends GA event', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByAltText('Water')).toBeInTheDocument());
    expect(screen.queryByAltText('Wind')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByAltText('Axe')).toBeInTheDocument());

    const waterElemButton = screen.getByAltText('Water');
    const windElemButton = screen.getByAltText('Wind');
    const axeButton = screen.getByAltText('Axe');
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(waterElemButton);
    userEvent.click(windElemButton);
    userEvent.click(axeButton);
    userEvent.click(searchButton);

    const expectedInput: InputData = overrideInputData(
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
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <UnitInfoLookup/>);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.type(keywordInput, 'AAAA');
    userEvent.click(searchButton);

    expect(fnGetLookup).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByText(translationEN.posts.analysis.error.noResult)).toBeInTheDocument());
    expect(fnScroll).toHaveBeenCalledTimes(2);
    const errorText = screen.getByText(translationEN.posts.analysis.error.noResult);
    expect(errorText).toHaveClass('text-danger');
    expect(errorText).toHaveClass('text-center');
  });
});
