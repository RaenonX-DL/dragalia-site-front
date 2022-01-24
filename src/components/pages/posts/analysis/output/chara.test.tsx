import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  CharaAnalysisGetResponse,
  SupportedLanguageNames,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {makePostUrl, PostPath} from '../../../../../api-def/paths';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {AnalysisOutputChara} from './chara';


describe('Analysis output (Character)', () => {
  const analysisResponse: CharaAnalysisGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    lang: SupportedLanguages.CHT,
    type: UnitType.CHARACTER,
    unitId: 10950101,
    summary: 'sum',
    summonResult: 'res',
    passives: 'psv',
    normalAttacks: 'auto',
    forceStrikes: 'fs',
    skills: [
      {
        name: 'name',
        info: 'inf',
        rotations: 'rot',
        tips: 'tip',
      },
    ],
    tipsBuilds: 'bld',
    videos: 'vid',
    viewCount: 777,
    editNotes: [
      {
        timestampEpoch: 10000,
        note: 'edn',
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
    renderReact(() => <AnalysisOutputChara analysis={analysisResponse}/>);

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('fs')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('inf')).toBeInTheDocument();
    expect(screen.getByText('rot')).toBeInTheDocument();
    expect(screen.getByText('tip')).toBeInTheDocument();
    expect(screen.getByText('bld')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText(/edn/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly if has alt lang', async () => {
    renderReact(() => (
      <AnalysisOutputChara analysis={{
        ...analysisResponse,
        isAltLang: true,
        otherLangs: [SupportedLanguages.CHT],
      }}/>
    ));

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('fs')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('inf')).toBeInTheDocument();
    expect(screen.getByText('rot')).toBeInTheDocument();
    expect(screen.getByText('tip')).toBeInTheDocument();
    expect(screen.getByText('bld')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText(/edn/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${altLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${otherLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`${chtName}`)).length).toBe(2);
  });

  it('gives correct link for alt lang redirection', async () => {
    renderReact(() => (
      <AnalysisOutputChara analysis={{
        ...analysisResponse,
        isAltLang: true,
        otherLangs: [SupportedLanguages.CHT],
      }}/>
    ));

    const altLangLink = screen.getAllByText(chtName)[0];
    expect(altLangLink).toHaveAttribute(
      'href',
      makePostUrl(PostPath.ANALYSIS, {pid: analysisResponse.unitId, lang: SupportedLanguages.CHT}),
    );
  });

  it('renders correctly if no edit notes', async () => {
    renderReact(() => <AnalysisOutputChara analysis={{...analysisResponse, editNotes: []}}/>);

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('fs')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('inf')).toBeInTheDocument();
    expect(screen.getByText('rot')).toBeInTheDocument();
    expect(screen.getByText('tip')).toBeInTheDocument();
    expect(screen.getByText('bld')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.queryByText(/edn/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly for admin', async () => {
    renderReact(
      () => <AnalysisOutputChara analysis={analysisResponse}/>,
      {user: {isAdmin: true}},
    );

    expect(screen.getByText(translationEN.posts.manage.addChara)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.addDragon)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.edit)).toBeInTheDocument();
    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('fs')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('inf')).toBeInTheDocument();
    expect(screen.getByText('rot')).toBeInTheDocument();
    expect(screen.getByText('tip')).toBeInTheDocument();
    expect(screen.getByText('bld')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText(/edn/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('unsubscribes', async () => {
    const fnUpdateSubscription = jest.spyOn(ApiRequestSender, 'removeSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(
      () => <AnalysisOutputChara analysis={{...analysisResponse, userSubscribed: true}}/>,
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
      () => <AnalysisOutputChara analysis={{...analysisResponse, userSubscribed: false}}/>,
      {hasSession: true},
    );

    const updateSubscriptionBtn = await screen.findByText(translationEN.misc.subscription.add);
    userEvent.click(updateSubscriptionBtn);

    await waitFor(() => expect(fnUpdateSubscription).toHaveBeenCalled());

    expect(fnUpdateSubscription).toHaveBeenCalled();
  });
});
