import React from 'react';

import {screen} from '@testing-library/react';

import AnalysisLookup from '../../../../pages/[lang]/info';
import {UnitInfoLookupLandingResponse, ApiResponseCode, SupportedLanguages} from '../../../../src/api-def/api';
import {translations} from '../../../../src/i18n/translations/main';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Unit info searching page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let lookupLandingFunc: jest.SpyInstance;
  const lookupLandingResponse: UnitInfoLookupLandingResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    analyses: [],
    userSubscribed: true,
  };

  beforeEach(() => {
    lookupLandingFunc = jest.spyOn(ApiRequestSender, 'unitInfoLookupLanding')
      .mockResolvedValue(lookupLandingResponse);
    lookupLandingFunc = jest.spyOn(ApiRequestSender, 'analysisLookup')
      .mockResolvedValue({
        code: ApiResponseCode.SUCCESS,
        success: true,
        analyses: [],
      });
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

  it('shows ads', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryAllByTestId('ads-page-top').length).toBeGreaterThanOrEqual(1);
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });

  it('does not show ads if should not show', () => {
    renderReact(
      () => <AnalysisLookup/>,
      {user: {adsFreeExpiry: new Date()}},
    );

    expect(screen.queryByTestId('ads-page-top')).not.toBeInTheDocument();
    expect(lookupLandingFunc).toHaveBeenCalledTimes(1);
  });
});
