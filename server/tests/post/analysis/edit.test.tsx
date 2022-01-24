import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AnalysisEditResponse,
  ApiResponseCode,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  SupportedLanguages,
  UnitType,
} from '../../../../src/api-def/api';
import {AnalysisEdit} from '../../../../src/components/pages/posts/analysis/edit';
import {translations} from '../../../../src/i18n/translations/main';
import {getTFunction} from '../../../../src/i18n/utils';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {renderReact} from '../../../../test/render/main';


describe('Analysis edit page', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  let fnFetch: jest.SpyInstance;

  const response: AnalysisEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    unitId: 10950101,
    emailResult: {
      accepted: [],
      rejected: [],
    },
  };

  const analysis = {
    ...response,
    lang: SupportedLanguages.EN,
    summary: 'sum',
    summonResult: 'smr',
    passives: 'psv',
    normalAttacks: 'nrm',
    videos: 'vid',
    viewCount: 7,
    modifiedEpoch: 55,
    publishedEpoch: 55,
    editNotes: [],
    isAltLang: false,
    otherLangs: [],
    userSubscribed: true,
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

  beforeEach(() => {
    fnFetch = jest.spyOn(ApiRequestSender, 'analysisGet');
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  it('blocks access for anonymous users (chara)', async () => {
    fnFetch.mockResolvedValue(charaResponse);

    renderReact(() => <AnalysisEdit/>);

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users (chara)', async () => {
    fnFetch.mockResolvedValue(charaResponse);

    renderReact(() => <AnalysisEdit/>, {hasSession: true});

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.forceStrikes)).not.toBeInTheDocument();
  });

  it('allows access for admin users (chara)', async () => {
    fnFetch.mockResolvedValue(charaResponse);

    renderReact(() => <AnalysisEdit/>, {user: {isAdmin: true}});

    expect((await screen.findAllByText(charaResponse.forceStrikes)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('blocks access for anonymous users (dragon)', async () => {
    fnFetch.mockResolvedValue(dragonResponse);

    renderReact(() => <AnalysisEdit/>);

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.suitableCharacters)).not.toBeInTheDocument();
  });

  it('blocks access for non-admin users (dragon)', async () => {
    fnFetch.mockResolvedValue(dragonResponse);

    renderReact(() => <AnalysisEdit/>, {hasSession: true});

    expect(await screen.findByText(description401)).toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(dragonResponse.suitableCharacters)).not.toBeInTheDocument();
  });

  it('allows access for admin users (dragon)', async () => {
    fnFetch.mockResolvedValue(dragonResponse);

    renderReact(() => <AnalysisEdit/>, {user: {isAdmin: true}});

    expect((await screen.findAllByText(dragonResponse.suitableCharacters)).length).toBeGreaterThan(0);
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
  });

  it('returns 404 if the post is not found', async () => {
    fnFetch.mockResolvedValue({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <AnalysisEdit/>, {user: {isAdmin: true}});

    expect(await screen.findByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(charaResponse.summary)).not.toBeInTheDocument();
  });

  it('displays alert if the post unit type is unknown', async () => {
    fnFetch.mockResolvedValue({...charaResponse, type: 8888});

    renderReact(() => <AnalysisEdit/>);

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

  it('does not send payload such as `viewCount` back (chara)', async () => {
    fnFetch.mockResolvedValue(charaResponse);

    const apiRequest = jest.spyOn(ApiRequestSender, 'analysisEditChara')
      .mockImplementation(async () => response);

    renderReact(() => <AnalysisEdit/>, {user: {isAdmin: true}});

    const editButton = await screen.findByText(translations[SupportedLanguages.EN].posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(apiRequest).toHaveBeenCalled(), {timeout: 1500});

    const keys = Object.keys(apiRequest.mock.calls[0][0]);
    expect(keys).toContain('forceStrikes');
    expect(keys).not.toContain('viewCount');
  });
});
