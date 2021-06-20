import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  CharaAnalysisEditPayload,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {AnalysisFormCharaEdit} from './charaEdit';


describe('Character edit form', () => {
  let fnSendRequest: jest.Mock;

  const initial: CharaAnalysisEditPayload = {
    uid: new ObjectId().toHexString(),
    unitId: 10950101,
    type: UnitType.CHARACTER,
    lang: SupportedLanguages.CHT,
    summary: 'sum',
    summonResult: 'smr',
    passives: 'psv',
    normalAttacks: 'nra',
    forceStrikes: 'fs',
    skills: [],
    tipsBuilds: 'tb',
    videos: 'vid',
    keywords: 'kw',
    story: 'str',
    editNote: '',
  };

  beforeEach(() => {
    fnSendRequest = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
    });
    jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  it('edits', async () => {
    renderReact(
      () => (
        <AnalysisFormCharaEdit
          initialAnalysis={initial}
          fnSendRequest={fnSendRequest}
        />
      ),
      {
        user: {
          id: new ObjectId(initial.uid),
          isAdmin: true,
        },
      },
    );

    const summary = screen.getByText(initial.summary, {selector: 'textarea'});
    userEvent.clear(summary);
    userEvent.type(summary, 'summary');
    const summonResult = screen.getByText(initial.summonResult, {selector: 'textarea'});
    userEvent.clear(summonResult);
    userEvent.type(summonResult, 'summonResult');
    const passives = screen.getByText(initial.passives, {selector: 'textarea'});
    userEvent.clear(passives);
    userEvent.type(passives, 'passives');
    const normalAttacks = screen.getByText(initial.normalAttacks, {selector: 'textarea'});
    userEvent.clear(normalAttacks);
    userEvent.type(normalAttacks, 'normalAttacks');
    const forceStrikes = screen.getByText(initial.forceStrikes, {selector: 'textarea'});
    userEvent.clear(forceStrikes);
    userEvent.type(forceStrikes, 'forceStrikes');
    const tipsBuilds = screen.getByText(initial.tipsBuilds, {selector: 'textarea'});
    userEvent.clear(tipsBuilds);
    userEvent.type(tipsBuilds, 'tipsBuilds');
    const videos = screen.getByText(initial.videos, {selector: 'textarea'});
    userEvent.clear(videos);
    userEvent.type(videos, 'videos');
    const keywords = screen.getByText(initial.keywords, {selector: 'textarea'});
    userEvent.clear(keywords);
    userEvent.type(keywords, 'keywords');
    const story = screen.getByText(initial.story, {selector: 'textarea'});
    userEvent.clear(story);
    userEvent.type(story, 'story');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    expect(fnSendRequest).toHaveBeenCalledTimes(1);
    expect(fnSendRequest).toHaveBeenCalledWith({
      uid: initial.uid,
      unitId: 10950101,
      type: UnitType.CHARACTER,
      lang: SupportedLanguages.CHT,
      summary: 'summary',
      summonResult: 'summonResult',
      passives: 'passives',
      normalAttacks: 'normalAttacks',
      forceStrikes: 'forceStrikes',
      skills: [],
      tipsBuilds: 'tipsBuilds',
      videos: 'videos',
      keywords: 'keywords',
      story: 'story',
      editNote: '',
    });
  });

  it('redirects after publish', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    renderReact(
      () => (
        <AnalysisFormCharaEdit
          initialAnalysis={initial}
          fnSendRequest={fnSendRequest}
        />
      ),
      {
        user: {
          id: new ObjectId(initial.uid),
          isAdmin: true,
        },
      },
    );

    const summary = screen.getByText(initial.summary, {selector: 'textarea'});
    userEvent.type(summary, 'summary');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalledWith(makePostPath(
        PostPath.ANALYSIS,
        {pid: initial.unitId, lang: SupportedLanguages.EN},
      ));
    });
    expect(window.location.assign).not.toHaveBeenCalledTimes(2);
  });

  it('shows the error if an error occurred before submission', async () => {
    fnSendRequest.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_INSUFFICIENT_PERMISSION,
      success: false,
    });

    renderReact(
      () => (
        <AnalysisFormCharaEdit
          initialAnalysis={initial}
          fnSendRequest={fnSendRequest}
        />
      ),
      {
        user: {
          id: new ObjectId(initial.uid),
          isAdmin: false,
        },
      },
    );

    const summary = screen.getByText(initial.summary, {selector: 'textarea'});
    userEvent.type(summary, 'summary');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);
  });
});
