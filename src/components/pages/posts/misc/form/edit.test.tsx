import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {ApiResponseCode, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {MiscEditForm} from './edit';


describe('Misc post edit form', () => {
  let fnSendRequest: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'miscIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
    fnSendRequest = jest.spyOn(ApiRequestSender, 'miscEdit').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      seqId: 7,
    });
  });

  it('attaches edit note', async () => {
    renderReact(
      () => (
        <MiscEditForm
          post={{
            code: ApiResponseCode.SUCCESS,
            success: true,
            seqId: 7,
            lang: SupportedLanguages.EN,
            title: 'ttl',
            sections: [{title: 'A', content: 'A1'}],
            isAltLang: false,
            otherLangs: [],
            publishedEpoch: 0,
            modifiedEpoch: 0,
            viewCount: 0,
            editNotes: [],
          }}
        />
      ),
      {user: {isAdmin: true}},
    );

    const editNote = screen.getByPlaceholderText(translationEN.posts.manage.editNote);
    userEvent.type(editNote, 'Edit Note');

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].editNote).toBe('Edit Note');
  });
});
