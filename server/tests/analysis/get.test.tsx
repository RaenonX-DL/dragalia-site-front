import React from 'react';

import {screen} from '@testing-library/react';

import AnalysisPage from '../../../pages/[lang]/analysis/[pid]';
import {
  ApiResponseCode,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  SupportedLanguages,
  UnitType,
} from '../../../src/api-def/api';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {translations} from '../../../src/i18n/translations/main';
import {getTFunction} from '../../../src/i18n/utils';
import {renderReact} from '../../../test/render/main';


describe('Analysis get request', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

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

  it('allows access for anonymous users (chara)', () => {
    renderReact(
      () => <AnalysisPage response={charaResponse}/>,
      {hasSession: false},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).toBeInTheDocument();
  });

  it('allows access for non-admin users (chara)', () => {
    renderReact(
      () => <AnalysisPage response={charaResponse}/>,
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).toBeInTheDocument();
  });

  it('allows access for admin users (chara)', () => {
    renderReact(
      () => <AnalysisPage response={charaResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).toBeInTheDocument();
  });

  it('allows access for anonymous users (dragon)', () => {
    renderReact(
      () => <AnalysisPage response={dragonResponse}/>,
      {hasSession: false},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(dragonResponse.suitableCharacters).length).toBeGreaterThan(0);
  });

  it('allows access for non-admin users (dragon)', () => {
    renderReact(
      () => <AnalysisPage response={dragonResponse}/>,
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(dragonResponse.suitableCharacters).length).toBeGreaterThan(0);
  });

  it('allows access for admin users (dragon)', () => {
    renderReact(
      () => <AnalysisPage response={dragonResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(dragonResponse.suitableCharacters).length).toBeGreaterThan(0);
  });

  it('returns 404 if the post is not found', () => {
    renderReact(() => <AnalysisPage response={null}/>);

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.summary)).not.toBeInTheDocument();
  });

  it('displays alert if the post unit type is unknown', () => {
    renderReact(() => <AnalysisPage response={{...charaResponse, type: 8888}}/>);

    const alertText = getTFunction(translations[SupportedLanguages.EN])(
      (t) => t.posts.analysis.error.unknownType,
      {analysisType: '8888'},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.summary)).not.toBeInTheDocument();
    expect(screen.queryByText(alertText)).toBeInTheDocument();
  });
});
