import React from 'react';

import {screen} from '@testing-library/react';

import AnalysisLookup from '../../../pages/[lang]/analysis';
import {AnalysisLookupLandingResponse, ApiResponseCode, SupportedLanguages} from '../../../src/api-def/api';
import {translations} from '../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Analysis listing page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let lookupLandingFunc: jest.SpyInstance;
  const lookupLandingResponse: AnalysisLookupLandingResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    analyses: [],
  };

  beforeEach(() => {
    lookupLandingFunc = jest.spyOn(ApiRequestSender, 'analysisLookupLanding')
      .mockImplementation(() => Promise.resolve(lookupLandingResponse));
  });

  it('allows access for anonymous users', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {hasSession: false},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });

  it('allows access for non-admin users', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });

  it('allows access for admin users', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });

  it('shows at least 3 ads', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryAllByTestId('ads-post-list').length).toBeGreaterThanOrEqual(1);
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.queryByTestId('ads-post-list')).not.toBeInTheDocument();
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });
});
