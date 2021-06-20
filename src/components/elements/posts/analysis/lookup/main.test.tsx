import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api/other/lang';
import {UnitType} from '../../../../../api-def/api/other/unit';
import {
  AnalysisLookupAnalyses,
  AnalysisLookupLandingResponse,
  AnalysisLookupResponse,
} from '../../../../../api-def/api/post/analysis/response';
import {ApiResponseCode} from '../../../../../api-def/api/responseCode';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import * as scrollUtils from '../../../../../utils/scroll';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {InputData} from './in/types';
import {AnalysisPostLookup} from './main';


describe('Analysis lookup page', () => {
  let fnScroll: jest.SpyInstance;
  let fnGetLookup: jest.SpyInstance<Promise<AnalysisLookupResponse>, [string, SupportedLanguages]>;
  let fnGetLookupLanding: jest.SpyInstance<Promise<AnalysisLookupLandingResponse>, [string, SupportedLanguages]>;
  let fnGaAnalysisLookup: jest.SpyInstance;

  const analyses: AnalysisLookupAnalyses = {
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

  const lookupResponseNoAnalyses: AnalysisLookupResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    analyses: {},
  };

  const lookupResponseHasAnalyses: AnalysisLookupResponse = {
    ...lookupResponseNoAnalyses,
    analyses,
  };

  const lookupLandingResponse: AnalysisLookupLandingResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    analyses: [analyses[10950102], analyses[10950301]],
  };

  beforeEach(() => {
    fnScroll = jest.spyOn(scrollUtils, 'scrollRefToTop').mockImplementation(() => void 0);
    fnGetLookup = jest.spyOn(ApiRequestSender, 'analysisLookup');
    fnGetLookupLanding = jest.spyOn(ApiRequestSender, 'analysisLookupLanding')
      .mockImplementation(async () => lookupLandingResponse);
    fnGaAnalysisLookup = jest.spyOn(GoogleAnalytics, 'analysisLookup');
  });

  it('searches and scrolls if found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseHasAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    });

    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(fnScroll).toHaveBeenCalledTimes(2);
    });
  });

  it('searches and scrolls even if not found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    });

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: 'AAA'}});
    });
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(fnScroll).toHaveBeenCalledTimes(2);
    });
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('scrolls on not found, also scrolls on found', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    const {rerender} = renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    });

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: 'AAA'}});
    });
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(fnScroll).toHaveBeenCalledTimes(2);
    });
    expect(screen.queryByText('Gala Leonidas')).not.toBeInTheDocument();

    fnGetLookup.mockImplementationOnce(async () => lookupResponseHasAnalyses);
    rerender();

    expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: ''}});
    });
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(fnScroll).toHaveBeenCalledTimes(3);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Gala Leonidas')).toBeInTheDocument();
    });
  }, 10000); // Finding `Gala Leonidas` is time-consuming, causing false negative

  it('searches by type', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
      expect(screen.queryByAltText('elementsFLAME')).toBeInTheDocument();
    });

    const flameElemButton = screen.getByAltText('elementsFLAME');
    act(() => {
      fireEvent.click(flameElemButton);
    });
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Gala Leonidas')).toBeInTheDocument();
    });
    expect(screen.queryByAltText('Karina')).not.toBeInTheDocument();
  });

  it('searches by weapon type', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
      expect(screen.queryByAltText('weaponTypesAXE')).toBeInTheDocument();
    });

    const flameElemButton = screen.getByAltText('weaponTypesAXE');
    act(() => {
      fireEvent.click(flameElemButton);
    });
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Karina')).toBeInTheDocument();
    });
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by keyword', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    });

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: 'Karina'}});
    });
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Karina')).toBeInTheDocument();
    });
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('searches by pressing `enter`', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
    });

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: 'Karina'}});
    });
    fireEvent.submit(keywordInput);

    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Karina')).toBeInTheDocument();
    });
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('sends GA event', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    await waitFor(() => {
      expect(fnGetLookupLanding).toHaveBeenCalledTimes(1);
      expect(screen.queryByAltText('elementsWATER')).toBeInTheDocument();
      expect(screen.queryByAltText('elementsWIND')).toBeInTheDocument();
      expect(screen.queryByAltText('weaponTypesAXE')).toBeInTheDocument();
    });

    const waterElemButton = screen.getByAltText('elementsWATER');
    act(() => {
      fireEvent.click(waterElemButton);
    });
    const windElemButton = screen.getByAltText('elementsWIND');
    act(() => {
      fireEvent.click(windElemButton);
    });
    const axeButton = screen.getByAltText('weaponTypesAXE');
    act(() => {
      fireEvent.click(axeButton);
    });
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    const expectedInput: InputData = {
      types: [],
      elements: [2, 3],
      weaponTypes: [4],
      keyword: '',
    };
    await waitFor(async () => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
      expect(fnGaAnalysisLookup).toHaveBeenCalledTimes(1);
      expect(fnGaAnalysisLookup).toHaveBeenCalledWith(expectedInput);
    });
    await waitFor(async () => {
      expect(screen.queryByAltText('Karina')).toBeInTheDocument();
    });
    expect(screen.queryByAltText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('shows error if no units matching the search criteria', async () => {
    fnGetLookup.mockImplementationOnce(async () => lookupResponseNoAnalyses);
    renderReact(() => <AnalysisPostLookup/>);

    const keywordInput = screen.getByPlaceholderText(translationEN.misc.searchKeyword);
    act(() => {
      fireEvent.change(keywordInput, {target: {value: 'AAAA'}});
    });
    const searchButton = screen.getByText(translationEN.misc.search);
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(fnGetLookup).toHaveBeenCalledTimes(1);
      expect(fnScroll).toHaveBeenCalledTimes(2);
      expect(screen.queryByText(translationEN.posts.analysis.error.noResult)).toBeInTheDocument();
    });
    const errorText = screen.getByText(translationEN.posts.analysis.error.noResult);
    expect(errorText).toHaveClass('text-danger');
    expect(errorText).toHaveClass('text-center');
  });
});
