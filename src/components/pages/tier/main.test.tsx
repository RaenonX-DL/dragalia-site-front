import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {ApiResponseCode} from '../../../api-def/api';
import {GeneralPath} from '../../../api-def/paths';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import data from './../../../../test/data/resources/info/chara.json';
import {MaxEntriesToDisplay} from './const';
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
      userSubscribed: true,
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
    expect((await screen.findAllByText(/tier/)).length).toBeGreaterThan(0);
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

  it('shows no result on not found', async () => {
    renderReact(() => <TierList/>);

    const searchInput = await screen.findByText(translationEN.misc.searchKeyword);
    userEvent.type(searchInput.previousSibling as Element, 'test');

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    // Partial text of the tier note tips
    expect(await screen.findByText(translationEN.misc.noResult)).toBeInTheDocument();
  });

  it('does not suddenly show more items on clicking show all', async () => {
    // Move entries at index `MaxEntriesToDisplay +/- 10` to the last
    const unitDataEntries = [
      ...data.slice(0, MaxEntriesToDisplay - 10),
      ...data.slice(MaxEntriesToDisplay + 10),
      ...data.slice(MaxEntriesToDisplay - 10, MaxEntriesToDisplay + 10),
    ];

    fnFetchTierNote.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: Object.fromEntries(unitDataEntries
        .map((entry, idx) => {
          let tier;
          if (idx < 50) {
            tier = {kaleidoscape: {isCompDependent: false, ranking: 'S', note: 'Some note.'}};
          } else {
            tier = {kaleidoscape: {isCompDependent: false, ranking: 'A', note: 'Some note.'}};
          }

          return [entry.id, {points: [], tier, lastUpdateEpoch: 1628534262003 - entry.id}];
        })),
      userSubscribed: true,
    });

    renderReact(() => <TierList/>);

    const kaleidoscapeDimensionButton = await screen.findByText(translationEN.game.unitTier.display['kaleidoscape']);
    userEvent.click(kaleidoscapeDimensionButton);

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    const initialChildCount = (await screen.findByText('S', {selector: 'h4'}))
      .nextElementSibling?.childElementCount as number;
    expect(initialChildCount).toBeGreaterThan(0);

    userEvent.click(await screen.findByText(translationEN.misc.showAll, {selector: 'button'}));

    const expandedChildCount = (await screen.findByText('S', {selector: 'h4'}))
      .nextElementSibling?.childElementCount as number;
    expect(expandedChildCount).toBeGreaterThan(0);

    expect(initialChildCount).toBe(expandedChildCount);
  });
});
