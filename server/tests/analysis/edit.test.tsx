import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AnalysisEdit from '../../../pages/[lang]/analysis/[pid]/edit';
import {
  AnalysisEditResponse,
  ApiResponseCode,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  SupportedLanguages,
  UnitType,
} from '../../../src/api-def/api';
import {translations} from '../../../src/i18n/translations/main';
import {getTFunction} from '../../../src/i18n/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../test/render/main';


describe('Analysis edit page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  const response: AnalysisEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    unitId: 10950101,
  };

  const analysis = {
    ...response,
    lang: SupportedLanguages.EN,
    summary: 'sum',
    summonResult: 'smr',
    passives: 'psv',
    normalAttacks: 'nrm',
    videos: 'vid',
    story: 'str',
    keywords: 'kw',
    viewCount: 7,
    modifiedEpoch: 55,
    publishedEpoch: 55,
    editNotes: [],
    isAltLang: false,
    otherLangs: [],
  };

  const charaResponse: CharaAnalysisGetResponse = {
    ...analysis,
    type: UnitType.CHARACTER,
    forceStrikes: 'fs',
    skills: [],
    tipsBuilds: 'tb',
  };

  const dragonResponse: DragonAnalysisGetResponse = {
    ...analysis,
    type: UnitType.DRAGON,
    suitableCharacters: 'st',
    ultimate: 'ult',
    notes: 'not',
  };

  it('blocks access for anonymous users (chara)', () => {
    renderReact(() => <AnalysisEdit response={charaResponse}/>);

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users (chara)', () => {
    renderReact(
      () => <AnalysisEdit response={charaResponse}/>,
      {hasSession: true},
    );

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).not.toBeInTheDocument();
  });

  it('allows access for admin users (chara)', () => {
    renderReact(
      () => <AnalysisEdit response={charaResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(charaResponse.forceStrikes).length).toBeGreaterThan(0);
  });

  it('blocks access for anonymous users (dragon)', () => {
    renderReact(() => <AnalysisEdit response={dragonResponse}/>);

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.suitableCharacters)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users (dragon)', () => {
    renderReact(
      () => <AnalysisEdit response={dragonResponse}/>,
      {hasSession: true},
    );

    expect(screen.queryByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.suitableCharacters)).not.toBeInTheDocument();
  });

  it('allows access for admin users (dragon)', () => {
    renderReact(
      () => <AnalysisEdit response={dragonResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryAllByText(dragonResponse.suitableCharacters).length).toBeGreaterThan(0);
  });

  it('returns 404 if the post is not found', () => {
    renderReact(
      () => <AnalysisEdit response={null}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
  });

  it('displays alert if the post unit type is unknown', () => {
    renderReact(() => <AnalysisEdit response={{...charaResponse, type: 8888}}/>);

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

  it('does not send payload such as `viewCount` back (chara)', async () => {
    const apiRequest = jest.spyOn(ApiRequestSender, 'analysisEditChara')
      .mockImplementation(async () => response);

    renderReact(
      () => <AnalysisEdit response={charaResponse}/>,
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translations[SupportedLanguages.EN].posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(async () => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
    });

    const keys = Object.keys(apiRequest.mock.calls[0][0]);
    expect(keys).toContain('forceStrikes');
    expect(keys).not.toContain('viewCount');
  });
});
