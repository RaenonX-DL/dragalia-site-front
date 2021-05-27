import React from 'react';

import {act, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  DragonAnalysisGetResponse,
  SupportedLanguageNames,
  SupportedLanguages,
  UnitType,
} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {AnalysisOutput} from './main';

describe('Analysis output (Character)', () => {
  let fnGetAnalysis: jest.SpyInstance;

  const baseResponse: DragonAnalysisGetResponse = {
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

  beforeEach(() => {
    fnGetAnalysis = jest.spyOn(ApiRequestSender, 'analysisGet');
  });

  it('renders correctly if no alt lang', async () => {
    fnGetAnalysis.mockImplementationOnce(async () => baseResponse);
    await act(async () => {
      renderReact(() => (
        <AnalysisOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetAnalysis).toHaveBeenCalledTimes(1);
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
    fnGetAnalysis.mockImplementationOnce(async () => ({
      ...baseResponse,
      isAltLang: true,
      otherLangs: [SupportedLanguages.CHT],
    }));
    await act(async () => {
      renderReact(() => (
        <AnalysisOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetAnalysis).toHaveBeenCalledTimes(1);
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

  it('renders correctly if no edit notes', async () => {
    fnGetAnalysis.mockImplementationOnce(async () => ({
      ...baseResponse,
      editNotes: [],
    }));
    await act(async () => {
      renderReact(() => (
        <AnalysisOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetAnalysis).toHaveBeenCalledTimes(1);
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
    fnGetAnalysis.mockImplementationOnce(async () => ({
      ...baseResponse,
      isAdmin: true,
    }));
    await act(async () => {
      renderReact(() => (
        <AnalysisOutput fnSetTitle={() => void 0}/>
      ));
    });

    await waitFor(() => {
      expect(fnGetAnalysis).toHaveBeenCalledTimes(1);
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
