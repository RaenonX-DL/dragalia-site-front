import React from 'react';

import {screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {mockData} from '../../../../test/data/mock/homepage';
import {renderReact} from '../../../../test/render/main';
import {ApiResponseCode, PostType, SupportedLanguages} from '../../../api-def/api';
import {GeneralPath} from '../../../api-def/paths';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {Home} from './main';


describe('Homepage', () => {
  let fnFetchHomepageLanding: jest.SpyInstance;
  let fnRemoveSubscription: jest.SpyInstance;

  beforeEach(() => {
    fnFetchHomepageLanding = jest.spyOn(ApiRequestSender, 'getHomepageLanding').mockResolvedValue({
      success: true,
      code: ApiResponseCode.SUCCESS,
      data: mockData,
      subscribed: {
        post: {
          [PostType.MISC]: true,
          [PostType.ANALYSIS]: true,
          [PostType.QUEST]: false,
        },
        announcement: true,
      },
    });
    fnRemoveSubscription = jest.spyOn(ApiRequestSender, 'removeSubscription').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
  });

  it('shows ads', async () => {
    renderReact(() => <Home/>);

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    expect(screen.getAllByTestId('ads-tool-bottom').length).toBe(2);
  });

  it('hides ads', async () => {
    renderReact(
      () => <Home/>,
      {user: {adsFreeExpiry: new Date()}},
    );

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    expect(screen.queryByTestId('ads-tool-bottom')).not.toBeInTheDocument();
  });

  it('shows loading', async () => {
    renderReact(() => <Home/>);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('shows site features', async () => {
    renderReact(() => <Home/>);

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    let button = screen.getByText(translationEN.meta.inUse.gameData.info.title);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.INFO_LOOKUP}`);

    button = screen.getByText(translationEN.meta.inUse.tier.lookup.title);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.TIER_LOOKUP}`);

    button = screen.getByText(translationEN.meta.inUse.gameData.ex.title);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.EX}`);

    button = screen.getByText(translationEN.meta.inUse.thanks.title);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.SPECIAL_THANKS}`);
  });

  it('shows stats', async () => {
    renderReact(() => <Home/>);

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    expect(screen.getByText(translationEN.home.section.stats.header.perLang)).toBeInTheDocument();
    expect(screen.getByText(translationEN.home.section.stats.header.perCountry)).toBeInTheDocument();
  });

  it('shows recently updated posts', async () => {
    renderReact(() => <Home/>);

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    mockData.posts[PostType.QUEST].forEach((post) => expect(screen.getByText(post.title)).toBeInTheDocument());
    mockData.posts[PostType.MISC].forEach((post) => expect(screen.getByText(post.title)).toBeInTheDocument());
    mockData.posts[PostType.ANALYSIS].forEach((post) => expect(screen.getByText(post.title)).toBeInTheDocument());
  });

  it('loads announcement subscription correctly', async () => {
    renderReact(() => <Home/>);

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    const tips = screen.getByText(translationEN.home.message.onSiteAnnouncementEnabled)
      .nextElementSibling as HTMLElement;
    expect(within(tips).getByText('', {selector: 'i.bi-bell'})).toBeInTheDocument();
  });

  it('updates announcement subscription', async () => {
    const id = new ObjectId().toHexString();
    renderReact(() => <Home/>, {user: {id}});

    await waitFor(() => expect(fnFetchHomepageLanding).toHaveBeenCalled());

    const tips = screen.getByText(translationEN.home.message.onSiteAnnouncementEnabled)
      .nextElementSibling as HTMLElement;
    const subButton = within(tips).getByText('', {selector: 'i.bi-bell'});
    userEvent.click(subButton);

    expect(fnRemoveSubscription).toHaveBeenCalledWith(id, {type: 'const', name: 'ANNOUNCEMENT'});
  });
});
