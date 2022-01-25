import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../../test/render/main';
import {
  SupportedLanguages,
  UnitInfoLookupEntry,
  UnitType,
} from '../../../../../../../api-def/api';
import {makePostUrl, PostPath} from '../../../../../../../api-def/paths';
import {translation as translationEN} from '../../../../../../../i18n/translations/en/translation';
import {UnitInfoRequireIcon} from '../../../../../../elements/gameData/unit/modal/types';
import {UnitInfoEntry} from './main';


describe('Analysis lookup entry', () => {
  const unitInfo: UnitInfoRequireIcon = {
    id: 10950101,
    name: 'Gala Leonidas',
    icon: {
      type: UnitType.CHARACTER,
      name: 'Gala Leonidas',
    },
  };
  const analysisMeta: UnitInfoLookupEntry = {
    type: UnitType.CHARACTER,
    lang: SupportedLanguages.CHT,
    unitId: 10950101,
    viewCount: 777,
    modifiedEpoch: 9000000,
    publishedEpoch: 8000000,
    userSubscribed: true,
  };

  it('renders analysis with correct info and link to click', async () => {
    renderReact(() => (
      <UnitInfoEntry unitInfo={unitInfo} analysisMeta={analysisMeta} simplified={false} disableSubscription/>
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.analysis))
      .toHaveAttribute(
        'href',
        makePostUrl(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.EN}),
      );
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'i.bi-cloud-arrow-up'})).toBeInTheDocument();
    expect(screen.getByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows unavailable as expected', async () => {
    renderReact(() => (
      <UnitInfoEntry unitInfo={unitInfo} simplified={false} disableSubscription/>
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.info)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitInfo.links.analysis)).not.toBeInTheDocument();
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.misc.timestamp.lastModified}`))).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });

  it('shows available but simplified entry', async () => {
    renderReact(() => (
      <UnitInfoEntry unitInfo={unitInfo} analysisMeta={analysisMeta} simplified disableSubscription/>
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).not.toHaveClass('text-muted');
    expect(screen.queryByText(/777/)).toBeInTheDocument();
    expect(screen.queryByText('', {selector: 'i.bi-cloud-arrow-up'})).not.toBeInTheDocument();
    expect(screen.queryByText('', {selector: 'i.bi-pencil-fill'})).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows unavailable even if simplified', async () => {
    renderReact(() => (
      <UnitInfoEntry unitInfo={unitInfo} simplified disableSubscription/>
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.info)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitInfo.links.analysis)).not.toBeInTheDocument();
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.misc.timestamp.lastModified}`))).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });
});
