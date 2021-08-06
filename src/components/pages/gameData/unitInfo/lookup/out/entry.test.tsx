import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {UnitInfoLookupEntry, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';
import {PostPath} from '../../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {makePostUrl} from '../../../../../../utils/path/make';
import {UnitInfoEntry} from './entry';


describe('Analysis lookup entry', () => {
  const name = {
    [SupportedLanguages.CHT]: 'name CHT',
    [SupportedLanguages.EN]: 'Gala Leonidas',
    [SupportedLanguages.JP]: 'name JP',
  };

  const unitInfo: UnitInfoData = {
    type: UnitType.CHARACTER,
    name,
    id: 10950101,
    rarity: 5,
    element: 2,
    iconName: 'icon',
    cvEn: name,
    cvJp: name,
    releaseEpoch: 900000,
  };
  const analysisMeta: UnitInfoLookupEntry = {
    type: UnitType.CHARACTER,
    lang: SupportedLanguages.CHT,
    unitId: 10950101,
    viewCount: 777,
    modifiedEpoch: 9000000,
    publishedEpoch: 8000000,
  };

  it('renders analysis with correct info and link to click', async () => {
    renderReact(() => (
      <UnitInfoEntry
        unitInfo={unitInfo}
        analysisMeta={analysisMeta}
        isFetchingMeta={false}
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.analysis))
      .toHaveAttribute(
        'href',
        makePostUrl(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.EN}),
      );
    expect(screen.queryByText(/777/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows that the analysis meta is fetching', async () => {
    renderReact(() => (
      <UnitInfoEntry
        unitInfo={unitInfo}
        isFetchingMeta
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows unavailable as expected', async () => {
    renderReact(() => (
      <UnitInfoEntry
        unitInfo={unitInfo}
        isFetchingMeta={false}
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.info)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitInfo.links.analysis)).not.toBeInTheDocument();
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });

  it('shows available but simplified entry', async () => {
    renderReact(() => (
      <UnitInfoEntry
        unitInfo={unitInfo}
        analysisMeta={analysisMeta}
        isFetchingMeta={false}
        simplified
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).not.toHaveClass('text-muted');
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows unavailable even if simplified', async () => {
    renderReact(() => (
      <UnitInfoEntry
        unitInfo={unitInfo}
        isFetchingMeta={false}
        simplified
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    userEvent.click(unitName);

    expect(await screen.findByText(translationEN.game.unitInfo.links.info)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.unitInfo.links.analysis)).not.toBeInTheDocument();
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });
});
