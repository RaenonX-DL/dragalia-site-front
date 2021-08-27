import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {ApiResponseCode} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {TierList} from './main';


describe('Tier list page', () => {
  let fnFetchTierNote: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'getKeyPointsData').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {},
    });
    fnFetchTierNote = jest.spyOn(ApiRequestSender, 'getUnitTierNote').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        10650503: {
          points: ['61174cef5dc5094fe82e9ee9'],
          tier: {conSolo: {isCompDependent: false, ranking: 'S', note: 'Some note.'}},
          lastUpdateEpoch: 1628734262003,
        },
        10950501: {
          points: [],
          tier: {conCoop: {isCompDependent: false, ranking: 'A', note: 'Some note.'}},
          lastUpdateEpoch: 1628534262003,
        },
      },
    });
  });

  it('fetches unit tier note on load', async () => {
    renderReact(() => <TierList/>);

    await waitFor(() => expect(fnFetchTierNote).toHaveBeenCalledTimes(1));
  });

  it('performs search and return results without error', async () => {
    renderReact(() => <TierList/>);

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    // Partial text of the tier note tips
    expect(await screen.findByText(/tier/)).toBeInTheDocument();
  });

  it('loads the tier notes correctly', async () => {
    renderReact(() => <TierList/>);

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    // S tier of 10650503 CoN Solo
    expect(await screen.findByText('S', undefined, {timeout: 3000})).toBeInTheDocument();
    // A tier of 10950501 CoN Coop
    expect(await screen.findByText('A')).toBeInTheDocument();
  }, 10000); // Takes longer to perform unconditioned search

  it('shows key point edit page button for admin', async () => {
    renderReact(
      () => <TierList/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    const pointEdit = screen.getByText(translationEN.game.unitTier.points.edit);
    expect(pointEdit).toHaveAttribute('href', `/en${GeneralPath.TIER_POINTS_EDIT}`);
  });

  it('hides key point edit page button for non-admins', async () => {
    renderReact(
      () => <TierList/>,
      {hasSession: true, user: {isAdmin: false}},
    );

    expect(screen.queryByText(translationEN.game.unitTier.points.edit)).not.toBeInTheDocument();
  });

  it('shows categorized tier note if displaying certain dimension only', async () => {
    renderReact(
      () => <TierList/>,
      {hasSession: true, user: {isAdmin: false}},
    );

    const ssOnlyButton = screen.getByText('SS');
    userEvent.click(ssOnlyButton);

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    // S / A / B / C should appear exactly once
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
