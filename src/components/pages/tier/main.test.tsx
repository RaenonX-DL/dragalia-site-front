import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {ApiResponseCode} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {TierList} from './main';


describe('Tier list page', () => {
  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'getKeyPointsData').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {},
    });
  });

  it('performs search and return results without error', async () => {
    renderReact(() => <TierList/>);

    const searchButton = screen.getByText('Search');
    userEvent.click(searchButton);

    expect(await screen.findByText(/tier/)).toBeInTheDocument();
  });

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
});
