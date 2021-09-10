import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  QuestPostGetResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostUrl} from '../../../../../utils/path/make';
import {QuestPostOutput} from './main';


describe('Quest post output', () => {
  const postResponse: QuestPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
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

  it('renders correctly if no alt lang', async () => {
    renderReact(() => (
      <QuestPostOutput post={postResponse}/>
    ));

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
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
    renderReact(() => (
      <QuestPostOutput post={{
        ...postResponse,
        isAltLang: true,
        otherLangs: [SupportedLanguages.CHT],
      }}/>
    ));

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
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
    renderReact(() => (
      <QuestPostOutput post={{
        ...postResponse,
        isAltLang: true,
        otherLangs: [SupportedLanguages.CHT],
      }}/>
    ));

    // `Link` element won't contain locale in `href`
    const altLangLink = screen.getAllByText(chtName)[0];
    expect(altLangLink).toHaveAttribute(
      'href',
      makePostUrl(PostPath.QUEST, {pid: postResponse.seqId, lang: SupportedLanguages.CHT}),
    );
  });

  it('renders correctly if no edit notes', async () => {
    renderReact(() => (
      <QuestPostOutput post={{
        ...postResponse,
        editNotes: [],
      }}/>
    ));

    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
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
    renderReact(
      () => <QuestPostOutput post={postResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.getByText(translationEN.posts.manage.add)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.edit)).toBeInTheDocument();
    expect(screen.getByText(/general/)).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
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
