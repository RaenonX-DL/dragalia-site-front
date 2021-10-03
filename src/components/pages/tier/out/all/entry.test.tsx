import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {generateKeyPointData, generateUnitTierNote} from '../../../../../../test/data/mock/tierNote';
import {renderReact} from '../../../../../../test/render/main';
import {
  PartiallySupportedLanguages,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {Element, UnitInfoData} from '../../../../../api-def/resources';
import {overrideObject} from '../../../../../utils/override';
import {TierListEntry} from './entry';


describe('Tier list entry', () => {
  const unitInfo: UnitInfoData = {
    type: UnitType.CHARACTER,
    element: Element.FLAME,
    iconName: 'icon',
    rarity: 5,
    id: 10950101,
    name: {
      [SupportedLanguages.CHT]: 'CHT name',
      [SupportedLanguages.EN]: 'EN name',
      [SupportedLanguages.JP]: 'JP name',
      [PartiallySupportedLanguages.CHS]: 'CHS name',
    },
    cvEn: {
      [SupportedLanguages.CHT]: 'CHT EN CV name',
      [SupportedLanguages.EN]: 'EN EN CV name',
      [SupportedLanguages.JP]: 'JP EN CV name',
    },
    cvJp: {
      [SupportedLanguages.CHT]: 'CHT JP CV name',
      [SupportedLanguages.EN]: 'EN JP CV name',
      [SupportedLanguages.JP]: 'JP JP CV name',
    },
    releaseEpoch: 1,
  };

  const keyPointsData = generateKeyPointData();

  const tierNote = generateUnitTierNote();

  it('renders tier note on clicking note icon', async () => {
    renderReact(
      () => <TierListEntry tierNote={tierNote} keyPointsData={keyPointsData} unitInfo={unitInfo}/>,
    );

    const noteIcon = screen.getByText('', {selector: 'i.bi-card-text'});
    userEvent.click(noteIcon);

    expect(await screen.findByText('Some note.')).toBeInTheDocument();
  });

  it('shows comp dependent icon', async () => {
    renderReact(
      () => <TierListEntry tierNote={tierNote} keyPointsData={keyPointsData} unitInfo={unitInfo}/>,
    );

    expect(screen.getByText('', {selector: 'i.bi-people-fill'})).toBeInTheDocument();
  });

  it('hides comp dependent icon', async () => {
    renderReact(() => (
      <TierListEntry
        tierNote={overrideObject(tierNote, {tier: {conCoop: {isCompDependent: false}}})}
        keyPointsData={keyPointsData} unitInfo={unitInfo}
      />
    ));

    expect(screen.queryByText('', {selector: 'i.bi-people-fill'})).not.toBeInTheDocument();
  });

  it('shows key point icon if there are any associated key points', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {points: ['id1']})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(screen.getByText('', {selector: 'i.bi-bullseye'})).toBeInTheDocument();
  });

  it('hides key point icon if no associated key points', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {points: []})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(screen.queryByText('', {selector: 'i.bi-bullseye'})).not.toBeInTheDocument();
  });

  it('shows key point edit icon for admins', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {tier: {conCoop: {isCompDependent: false}}})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const keyPointsIcon = screen.getByText('', {selector: 'i.bi-bullseye'});
    userEvent.click(keyPointsIcon);

    expect(await screen.findByText('point')).toBeInTheDocument();
    // 1 for tier note (besides unit name), 1 for key points
    expect(screen.getAllByText('', {selector: 'i.bi-pencil-fill'})).toHaveLength(2);
  });

  it('hides key point edit icon for non-admins', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {tier: {conCoop: {isCompDependent: false}}})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: false}},
    );

    const keyPointsIcon = screen.getByText('', {selector: 'i.bi-bullseye'});
    userEvent.click(keyPointsIcon);

    expect(await screen.findByText('point')).toBeInTheDocument();
    expect(screen.queryByText('', {selector: 'i.bi-pencil-fill'})).not.toBeInTheDocument();
  });

  it('shows tier note edit icon for admins', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {tier: {conCoop: {isCompDependent: false}}})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(screen.getByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
  });

  it('hides tier note edit icon for non-admins', async () => {
    renderReact(
      () => (
        <TierListEntry
          tierNote={overrideObject(tierNote, {tier: {conCoop: {isCompDependent: false}}})}
          keyPointsData={keyPointsData} unitInfo={unitInfo}
        />
      ),
      {hasSession: true, user: {isAdmin: false}},
    );

    expect(screen.queryByText('', {selector: 'i.bi-pencil-fill'})).not.toBeInTheDocument();
  });
});
