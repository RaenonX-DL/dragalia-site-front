import React from 'react';

import {screen} from '@testing-library/react';

import {
  ApiResponseCode,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  SupportedLanguages,
  UnitType,
} from '../../../src/api-def/api';
import {AnalysisPage} from '../../../src/components/pages/posts/analysis/output';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {translations} from '../../../src/i18n/translations/main';
import {getTFunction} from '../../../src/i18n/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Analysis page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const baseResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    lang: DEFAULT_LANG,
    unitId: 10950501,
    isAltLang: false,
    otherLangs: [],
    summary: 'sum',
    summonResult: 'smr',
    passives: 'psv',
    normalAttacks: 'nrm',
    videos: 'vid',
    keywords: 'kw',
    story: 'st',
    viewCount: 0,
    editNotes: [],
    publishedEpoch: 55,
    modifiedEpoch: 55,
  };

  const charaResponse: CharaAnalysisGetResponse = {
    ...baseResponse,
    type: UnitType.CHARACTER,
    forceStrikes: 'fs',
    skills: [],
    tipsBuilds: 'tp',
  };

  const dragonResponse: DragonAnalysisGetResponse = {
    ...baseResponse,
    type: UnitType.DRAGON,
    suitableCharacters: 'st',
    ultimate: 'ult',
    notes: 'not',
  };

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'analysisGet');
  });

  it('allows access for anonymous users (chara)', async () => {
    fnFetch.mockResolvedValueOnce(charaResponse);

    renderReact(() => <AnalysisPage/>, {hasSession: false});

    expect(await screen.findByText(charaResponse.forceStrikes)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for non-admin users (chara)', async () => {
    fnFetch.mockResolvedValueOnce(charaResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: false}});

    expect(await screen.findByText(charaResponse.forceStrikes)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for admin users (chara)', async () => {
    fnFetch.mockResolvedValueOnce(charaResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: true}});

    expect(await screen.findByText(charaResponse.forceStrikes)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for anonymous users (dragon)', async () => {
    fnFetch.mockResolvedValueOnce(dragonResponse);

    renderReact(() => <AnalysisPage/>, {hasSession: false});

    expect((await screen.findAllByText(dragonResponse.suitableCharacters)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for non-admin users (dragon)', async () => {
    fnFetch.mockResolvedValueOnce(dragonResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: false}});

    expect((await screen.findAllByText(dragonResponse.suitableCharacters)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('allows access for admin users (dragon)', async () => {
    fnFetch.mockResolvedValueOnce(dragonResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: true}});

    expect((await screen.findAllByText(dragonResponse.suitableCharacters)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <AnalysisPage/>);

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.summary)).not.toBeInTheDocument();
  });

  it('displays alert if the post unit type is unknown', async () => {
    fnFetch.mockResolvedValueOnce({...charaResponse, type: 8888});

    renderReact(() => <AnalysisPage/>);

    const alertText = getTFunction(translations[SupportedLanguages.EN])(
      (t) => t.posts.analysis.error.unknownType,
      {analysisType: '8888'},
    );

    expect(await screen.findByText(alertText)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.summary)).not.toBeInTheDocument();
  });

  it('shows at least 3 ads (chara)', async () => {
    fnFetch.mockResolvedValueOnce(charaResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: true}});

    expect((await screen.findAllByTestId('ads-in-post')).length).toBeGreaterThanOrEqual(3);
  });

  it('does not show ads if should not show (chara)', async () => {
    fnFetch.mockResolvedValueOnce(charaResponse);

    renderReact(() => <AnalysisPage/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText(charaResponse.summary)).toBeInTheDocument();
    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });

  it('shows at least 3 ads (dragon)', async () => {
    fnFetch.mockResolvedValueOnce(dragonResponse);

    renderReact(() => <AnalysisPage/>, {user: {isAdmin: true}});

    expect(await screen.findByText(dragonResponse.summary)).toBeInTheDocument();
    expect((await screen.findAllByTestId('ads-in-post')).length).toBeGreaterThanOrEqual(3);
  });

  it('does not show ads if should not show (dragon)', async () => {
    fnFetch.mockResolvedValueOnce(dragonResponse);

    renderReact(() => <AnalysisPage/>, {user: {adsFreeExpiry: new Date()}});

    expect(await screen.findByText(dragonResponse.summary)).toBeInTheDocument();
    expect(screen.queryByTestId('ads-in-post')).not.toBeInTheDocument();
  });
});
