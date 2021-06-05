import React from 'react';

import {act, screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  DragonAnalysisGetResponse,
  SupportedLanguageNames,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../utils/path/make';
import {AnalysisOutputDragon} from './dragon';


describe('Analysis output (Character)', () => {
  const analysisResponse: DragonAnalysisGetResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    isAdmin: false,
    lang: SupportedLanguages.CHT,
    type: UnitType.DRAGON,
    unitId: 10950101,
    summary: 'sum',
    summonResult: 'res',
    passives: 'psv',
    normalAttacks: 'auto',
    notes: 'not',
    suitableCharacters: 'suc',
    ultimate: 'ult',
    videos: 'vid',
    story: 'str',
    keywords: 'kw',
    viewCount: 777,
    editNotes: [
      {
        timestampEpoch: 10000,
        note: 'edn',
      },
    ],
    isAltLang: false,
    otherLangs: [],
    modifiedEpoch: 10000,
    publishedEpoch: 9000,
  };

  const altLangTips = translationEN.posts.message.altLang
    .replace(
      '{{langUi}}',
      SupportedLanguageNames[SupportedLanguages.EN],
    )
    .replace(
      '{{langPost}}',
      SupportedLanguageNames[SupportedLanguages.CHT],
    );
  const otherLangTips = translationEN.posts.message.otherLang;
  const chtName = SupportedLanguageNames[SupportedLanguages.CHT];

  it('renders correctly if no alt lang', async () => {
    await act(async () => {
      renderReact(() => (
        <AnalysisOutputDragon analysis={analysisResponse}/>
      ));
    });

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('not')).toBeInTheDocument();
    expect(screen.getByText('suc')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('kw')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText('edn')).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly if has alt lang', async () => {
    await act(async () => {
      renderReact(() => (
        <AnalysisOutputDragon analysis={{
          ...analysisResponse,
          isAltLang: true,
          otherLangs: [SupportedLanguages.CHT],
        }}/>
      ));
    });

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('not')).toBeInTheDocument();
    expect(screen.getByText('suc')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('kw')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText('edn')).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).toBeInTheDocument();
    expect(screen.queryAllByText(new RegExp(`${chtName}`)).length).toBe(2);
  });

  it('gives correct link for alt lang redirection', async () => {
    await act(async () => {
      renderReact(() => (
        <AnalysisOutputDragon analysis={{
          ...analysisResponse,
          isAltLang: true,
          otherLangs: [SupportedLanguages.CHT],
        }}/>
      ));
    });

    const altLangLink = screen.getAllByText(chtName)[0];
    expect(altLangLink).toHaveAttribute(
      'href',
      makePostPath(PostPath.ANALYSIS, {pid: analysisResponse.unitId}),
    );
  });

  it('renders correctly if no edit notes', async () => {
    await act(async () => {
      renderReact(() => (
        <AnalysisOutputDragon analysis={{
          ...analysisResponse,
          editNotes: [],
        }}/>
      ));
    });

    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('not')).toBeInTheDocument();
    expect(screen.getByText('suc')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('kw')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.queryByText('edn')).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });

  it('renders correctly for admin', async () => {
    await act(async () => {
      renderReact(() => (
        <AnalysisOutputDragon analysis={{
          ...analysisResponse,
          isAdmin: true,
        }}/>
      ));
    });

    expect(screen.getByText(translationEN.posts.manage.addChara)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.addDragon)).toBeInTheDocument();
    expect(screen.getByText(translationEN.posts.manage.edit)).toBeInTheDocument();
    expect(screen.getByText('sum')).toBeInTheDocument();
    expect(screen.getByText('res')).toBeInTheDocument();
    expect(screen.getByText('psv')).toBeInTheDocument();
    expect(screen.getByText('auto')).toBeInTheDocument();
    expect(screen.getByText('not')).toBeInTheDocument();
    expect(screen.getByText('suc')).toBeInTheDocument();
    expect(screen.getByText('ult')).toBeInTheDocument();
    expect(screen.getByText('vid')).toBeInTheDocument();
    expect(screen.getByText('str')).toBeInTheDocument();
    expect(screen.getByText('kw')).toBeInTheDocument();
    expect(screen.getByText(/777/)).toBeInTheDocument();
    expect(screen.getByText('edn')).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${altLangTips}`, 'g'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`${otherLangTips}`, 'g'))).not.toBeInTheDocument();
  });
});
