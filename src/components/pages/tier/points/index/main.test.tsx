import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {ApiResponseCode, SupportedLanguages} from '../../../../../api-def/api';
import {DataPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makeDataUrl} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {KeyPointIndexPage} from './main';


describe('Key point index page', () => {
  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'getKeyPointsData').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      data: {
        idA: {
          type: 'strength',
          description: 'S1',
        },
        idB: {
          type: 'weakness',
          description: 'W1',
        },
      },
    });
  });

  it('shows all available key points', async () => {
    renderReact(() => <KeyPointIndexPage/>);

    expect(await screen.findByText('S1')).toBeInTheDocument();
    expect(screen.getByText('W1')).toBeInTheDocument();
  });

  it('can perform keyword search on key points', async () => {
    const {rerender} = renderReact(() => <KeyPointIndexPage/>);

    const keywordInput = await screen.findByText(translationEN.autoComplete.inputPlaceholder);
    typeInput(keywordInput.previousSibling as Element, 'S', {rerender});

    expect(screen.getByText('S1')).toBeInTheDocument();
    expect(screen.queryByText('W1')).not.toBeInTheDocument();
  });

  it('has the unit info page link on each key point', async () => {
    renderReact(() => <KeyPointIndexPage/>);

    const optionS1 = await screen.findByText('S1');

    const expectedUrl = makeDataUrl(DataPath.TIER_KEY_POINT, {id: 'idA', lang: SupportedLanguages.EN});
    expect(optionS1).toHaveAttribute('href', expectedUrl);
  });
});
