import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  QuestPostGetResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {makePostUrl, PostPath} from '../../../../../api-def/paths';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
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
    userSubscribed: true,
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

  it('unsubscribes', async () => {
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'removeSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(
      () => <QuestPostOutput post={{...postResponse, userSubscribed: true}}/>,
      {hasSession: true},
    );

    const updateSubscriptionBtn = await screen.findByText(translationEN.misc.subscription.remove);
    userEvent.click(updateSubscriptionBtn);

    await waitFor(() => expect(fnUpdateSubscription).toHaveBeenCalled());

    expect(fnUpdateSubscription).toHaveBeenCalled();
  });

  it('subscribes', async () => {
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'addSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(
      () => <QuestPostOutput post={{...postResponse, userSubscribed: false}}/>,
      {hasSession: true},
    );

    const updateSubscriptionBtn = await screen.findByText(translationEN.misc.subscription.add);
    userEvent.click(updateSubscriptionBtn);

    await waitFor(() => expect(fnUpdateSubscription).toHaveBeenCalled());

    expect(fnUpdateSubscription).toHaveBeenCalled();
  });
});
