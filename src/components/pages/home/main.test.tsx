import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {mockData} from '../../../../test/data/mock/homepage';
import {renderReact} from '../../../../test/render/main';
import {ApiResponseCode, PostType, SupportedLanguages} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {Home} from './main';


describe('Homepage', () => {
  let fnFetchHomepageLanding: jest.SpyInstance;

  beforeEach(() => {
    fnFetchHomepageLanding = jest.spyOn(ApiRequestSender, 'getHomepageLanding').mockResolvedValue({
      success: true,
      code: ApiResponseCode.SUCCESS,
      data: mockData,
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
});
