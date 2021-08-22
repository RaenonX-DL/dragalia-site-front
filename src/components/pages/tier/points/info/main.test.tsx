import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {KeyPointInfoPage} from './main';


describe('Key point info page', () => {
  let fnGetInfo: jest.SpyInstance;

  beforeEach(() => {
    fnGetInfo = jest.spyOn(ApiRequestSender, 'getKeyPointInfo').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      info: {
        entry: {type: 'strength', description: 'Entry content'},
        linkedUnits: [10950101, 10950102],
      },
    });
  });

  it('lists linked units', async () => {
    renderReact(() => <KeyPointInfoPage/>);

    expect(await screen.findByText('Gala Leonidas')).toBeInTheDocument();
    expect(screen.getByText('Faris')).toBeInTheDocument();
  });

  it('shows warning if no linked unit', async () => {
    fnGetInfo.mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      info: {
        entry: {type: 'strength', description: 'Entry content'},
        linkedUnits: [],
      },
    });

    renderReact(() => <KeyPointInfoPage/>);

    expect(await screen.findByText(translationEN.game.unitTier.points.info.error.noLinkedUnits)).toBeInTheDocument();
  });
});
