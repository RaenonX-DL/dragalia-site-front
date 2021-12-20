import React from 'react';

import {screen} from '@testing-library/react';

import {generateKeyPointData, generateUnitTierNote} from '../../../../../test/data/mock/tierNote';
import {renderReact} from '../../../../../test/render/main';
import {ApiResponseCode} from '../../../../api-def/api';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {TierNoteUnit} from './main';


describe('Single unit tier note', () => {
  const keyPointsData = generateKeyPointData();

  const tierNote = generateUnitTierNote();

  let fnGetTierNote: jest.SpyInstance;

  beforeEach(() => {
    fnGetTierNote = jest.spyOn(ApiRequestSender, 'getUnitTierNoteSingle').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: tierNote,
    });
    jest.spyOn(ApiRequestSender, 'getKeyPointsData').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: keyPointsData,
    });
  });

  it('shows unit tier notes correctly', async () => {
    renderReact(
      () => <TierNoteUnit/>,
      {user: {isAdmin: true}, contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.tier.edit)).toBeInTheDocument();
    // Con co-op note in mock data
    expect(screen.getByText('Some note.')).toBeInTheDocument();
    // Con co-op ranking in mock data
    expect(screen.getByText('B')).toBeInTheDocument();
    // Key point description
    expect(screen.getByText('point')).toBeInTheDocument();
  });

  it('shows unranked tips', async () => {
    fnGetTierNote.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: null,
    });

    renderReact(
      () => <TierNoteUnit/>,
      {user: {isAdmin: true}, contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.tips.notRanked)).toBeInTheDocument();
  });

  it('shows buttons for editing if the user is an admin', async () => {
    renderReact(
      () => <TierNoteUnit/>,
      {user: {isAdmin: true}, contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.tier.edit)).toBeInTheDocument();
    expect(screen.getByText(translationEN.game.unitTier.points.edit)).toBeInTheDocument();
  });

  it('hides buttons for editing if the user is not an admin', async () => {
    renderReact(
      () => <TierNoteUnit/>,
      {contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.points.title)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitTier.tier.edit)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitTier.points.edit)).not.toBeInTheDocument();
  });

  it('shows ads', async () => {
    renderReact(
      () => <TierNoteUnit/>,
      {contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.points.title)).toBeInTheDocument();
    expect(screen.getByTestId('ads-page-top')).toBeInTheDocument();
    expect(screen.getByTestId('ads-unit-key-point-top')).toBeInTheDocument();
    expect(screen.getByTestId('ads-tier-results-end')).toBeInTheDocument();
  });

  it('hides ads', async () => {
    renderReact(
      () => <TierNoteUnit/>,
      {user: {adsFreeExpiry: new Date()}, contextParams: {unitId: 10750101}},
    );

    expect(await screen.findByText(translationEN.game.unitTier.points.title)).toBeInTheDocument();
    expect(screen.queryByTestId('ads-page-top')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ads-unit-key-point-top')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ads-tier-results-end')).not.toBeInTheDocument();
  });
});
