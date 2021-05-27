import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../../test/render/main';
import {AnalysisLookupEntry, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {UnitInfoData} from '../../../../../../api-def/resources';
import {PostPath} from '../../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../../utils/path/make';
import {AnalysisEntry} from './entry';

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
  const analysisMeta: AnalysisLookupEntry = {
    type: UnitType.CHARACTER,
    lang: SupportedLanguages.CHT,
    unitId: 10950101,
    viewCount: 777,
    modifiedEpoch: 9000000,
    publishedEpoch: 8000000,
  };

  it('renders analysis with correct info and link to click', async () => {
    renderReact(() => (
      <AnalysisEntry
        unitInfo={unitInfo}
        analysisMeta={analysisMeta}
        isFetchingMeta={false}
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).not.toHaveClass('text-danger');
    expect(unitName).not.toHaveClass('text-muted');
    expect(unitName)
      .toHaveAttribute(
        'href',
        makePostPath(PostPath.ANALYSIS, {lang: SupportedLanguages.EN, pid: 10950101}),
      );
    expect(screen.queryByText(/777/)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows that the analysis meta is fetching', async () => {
    renderReact(() => (
      <AnalysisEntry
        unitInfo={unitInfo}
        isFetchingMeta
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).toHaveClass('text-muted');
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.analysis.error.unavailable)).not.toBeInTheDocument();
  });

  it('shows unavailable as expected', async () => {
    renderReact(() => (
      <AnalysisEntry
        unitInfo={unitInfo}
        isFetchingMeta={false}
        simplified={false}
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).toHaveClass('text-muted');
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });

  it('shows available but simplified entry', async () => {
    renderReact(() => (
      <AnalysisEntry
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
      <AnalysisEntry
        unitInfo={unitInfo}
        isFetchingMeta={false}
        simplified
      />
    ));

    expect(screen.getByAltText('Gala Leonidas')).toBeInTheDocument();
    const unitName = screen.getByText('Gala Leonidas');
    expect(unitName).toHaveClass('text-muted');
    expect(screen.queryByText(/777/)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.published}`))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${translationEN.posts.info.lastModified}`))).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.message.info.fetching)).not.toBeInTheDocument();
    const unavailable = screen.getByText(translationEN.posts.analysis.error.unavailable);
    expect(unavailable).toHaveClass('text-danger');
  });
});
