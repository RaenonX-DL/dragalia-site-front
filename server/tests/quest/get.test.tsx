import React from 'react';

import {screen} from '@testing-library/react';

import QuestPage from '../../../pages/[lang]/quest/[pid]';
import {
  ApiResponseCode,
  QuestPostGetResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {translations} from '../../../src/i18n/translations/main';
import {renderReact} from '../../../test/render/main';


describe('Quest get request', () => {
  const description401 = translations[SupportedLanguages.EN].meta.error['401'].description;
  const description404 = translations[SupportedLanguages.EN].meta.error['404'].description;

  const response: QuestPostGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: false,
    lang: DEFAULT_LANG,
    isAltLang: false,
    otherLangs: [],
    seqId: 0,
    title: 'ttl',
    general: 'gen',
    video: 'vid',
    positional: [],
    addendum: '',
    viewCount: 0,
    editNotes: [],
    publishedEpoch: 55,
    modifiedEpoch: 55,
  };

  it('allows access for anonymous users (chara)', () => {
    renderReact(
      () => <QuestPage response={response}/>,
      {hasSession: false},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(response.general)).toBeInTheDocument();
  });

  it('allows access for non-admin users (chara)', () => {
    renderReact(
      () => <QuestPage response={response}/>,
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(response.general)).toBeInTheDocument();
  });

  it('allows access for admin users (chara)', () => {
    renderReact(
      () => <QuestPage response={response}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).not.toBeInTheDocument();
    expect(screen.queryByText(response.general)).toBeInTheDocument();
  });

  it('returns 404 if the post is not found', () => {
    renderReact(() => <QuestPage response={null}/>);

    expect(screen.queryByText(description401)).not.toBeInTheDocument();
    expect(screen.queryByText(description404)).toBeInTheDocument();
    expect(screen.queryByText(response.general)).not.toBeInTheDocument();
  });
});
