import React from 'react';

import {fireEvent, screen, waitFor} from '@testing-library/react';
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
    fireEvent.change(summary, {target: {value: 'summary'}});
    const summonResult = screen.getByText(initial.summonResult, {selector: 'textarea'});
    fireEvent.change(summonResult, {target: {value: 'summonResult'}});
    const passives = screen.getByText(initial.passives, {selector: 'textarea'});
    fireEvent.change(passives, {target: {value: 'passives'}});
    const normalAttacks = screen.getByText(initial.normalAttacks, {selector: 'textarea'});
    fireEvent.change(normalAttacks, {target: {value: 'normalAttacks'}});
    const forceStrikes = screen.getByText(initial.forceStrikes, {selector: 'textarea'});
    fireEvent.change(forceStrikes, {target: {value: 'forceStrikes'}});
    const tipsBuilds = screen.getByText(initial.tipsBuilds, {selector: 'textarea'});
    fireEvent.change(tipsBuilds, {target: {value: 'tipsBuilds'}});
    const videos = screen.getByText(initial.videos, {selector: 'textarea'});
    fireEvent.change(videos, {target: {value: 'videos'}});
    const keywords = screen.getByText(initial.keywords, {selector: 'textarea'});
    fireEvent.change(keywords, {target: {value: 'keywords'}});
    const story = screen.getByText(initial.story, {selector: 'textarea'});
    fireEvent.change(story, {target: {value: 'story'}});

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    fireEvent.click(editButton);

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
    fireEvent.change(summary, {target: {value: 'summary'}});

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    fireEvent.click(editButton);

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
    fireEvent.change(summary, {target: {value: 'summary'}});

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    fireEvent.click(editButton);
  });
});
