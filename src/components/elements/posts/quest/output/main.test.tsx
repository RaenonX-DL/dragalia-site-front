import React from 'react';

import {act, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  SupportedLanguages,
  QuestPostGetResponse,
  SupportedLanguageNames,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {QuestPostOutput} from './main';

describe('Quest post output', () => {
  let fnGetQuestPost: jest.SpyInstance;

  const baseResponse: QuestPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    isAdmin: false,
    lang: SupportedLanguages.CHT,
    seqId: 7,
    title: 'title',
    general: 'general',
    video: 'video',
    positional: [
      {
        position: 'pst',
        builds: 'builds',
        rotations: 'rotations',
        tips: 'tips',
      },
    ],
    addendum: 'addendum',
    viewCount: 777,
    editNotes: [
      {
        timestampEpoch: 10000,
        note: 'edit note',
      },
    ],
    isAltLang: false,
    otherLangs: [],
    modifiedEpoch: 10000,
    publishedEpoch: 9000,
  };

  const altLangTips = translationEN.posts.message.altLang
    .replace(
      '{{langUi}}',
      SupportedLanguageNames[SupportedLanguages.EN],
    )
    .replace(
      '{{langPost}}',
      SupportedLanguageNames[SupportedLanguages.CHT],
    );
  const otherLangTips = translationEN.posts.message.otherLang;
  const chtName = SupportedLanguageNames[SupportedLanguages.CHT];

  beforeEach(() => {
    fnGetQuestPost = jest.spyOn(ApiRequestSender, 'questGet');
  });

  it('renders correctly if no alt lang', async () => {
    fnGetQuestPost.mockImplementationOnce(async () => baseResponse);
    await act(async () => {
      renderReact(() => (
        <QuestPostOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetQuestPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText(/video/)).toBeInTheDocument();
    expect(screen.getByText('pst')).toBeInTheDocument();
    expect(screen.getByText(/builds/)).toBeInTheDocument();
    expect(screen.getByText(/rotations/)).toBeInTheDocument();
    expect(screen.getByText(/tips/)).toBeInTheDocument();
    expect(screen.getByText(/addendum/)).toBeInTheDocument();
    expect(screen.getByText(/edit note/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly if has alt lang', async () => {
    fnGetQuestPost.mockImplementationOnce(async () => ({
      ...baseResponse,
      isAltLang: true,
      otherLangs: [SupportedLanguages.CHT],
    }));
    await act(async () => {
      renderReact(() => (
        <QuestPostOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetQuestPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText(/video/)).toBeInTheDocument();
    expect(screen.getByText('pst')).toBeInTheDocument();
    expect(screen.getByText(/builds/)).toBeInTheDocument();
    expect(screen.getByText(/rotations/)).toBeInTheDocument();
    expect(screen.getByText(/tips/)).toBeInTheDocument();
    expect(screen.getByText(/addendum/)).toBeInTheDocument();
    expect(screen.getByText(/edit note/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.queryAllByText(new RegExp(`${chtName}`)).length).toBe(2);
  });

  it('gives correct link for alt lang redirection', async () => {
    fnGetQuestPost.mockImplementationOnce(async () => ({
      ...baseResponse,
      isAltLang: true,
      otherLangs: [SupportedLanguages.CHT],
    }));
    await act(async () => {
      renderReact(() => (
        <QuestPostOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetQuestPost).toHaveBeenCalledTimes(1);
    });

    const altLangLink = screen.getAllByText(chtName)[0];
    expect(altLangLink).toHaveAttribute(
      'href',
      makePostPath(PostPath.QUEST, {lang: baseResponse.lang, pid: baseResponse.seqId}),
    );
  });

  it('renders correctly if no edit notes', async () => {
    fnGetQuestPost.mockImplementationOnce(async () => ({
      ...baseResponse,
      editNotes: [],
    }));
    await act(async () => {
      renderReact(() => (
        <QuestPostOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetQuestPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText(/video/)).toBeInTheDocument();
    expect(screen.getByText('pst')).toBeInTheDocument();
    expect(screen.getByText(/builds/)).toBeInTheDocument();
    expect(screen.getByText(/rotations/)).toBeInTheDocument();
    expect(screen.getByText(/tips/)).toBeInTheDocument();
    expect(screen.getByText(/addendum/)).toBeInTheDocument();
    expect(screen.queryByText(/edit note/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly for admin', async () => {
    fnGetQuestPost.mockImplementationOnce(async () => ({
      ...baseResponse,
      isAdmin: true,
    }));
    await act(async () => {
      renderReact(() => (
        <QuestPostOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetQuestPost).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(translationEN.posts.manage.add)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.edit)).toBeInTheDocument();
    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText(/video/)).toBeInTheDocument();
    expect(screen.getByText('pst')).toBeInTheDocument();
    expect(screen.getByText(/builds/)).toBeInTheDocument();
    expect(screen.getByText(/rotations/)).toBeInTheDocument();
    expect(screen.getByText(/tips/)).toBeInTheDocument();
    expect(screen.getByText(/addendum/)).toBeInTheDocument();
    expect(screen.getByText(/edit note/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });
});
