import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {ApiResponseCode, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {backupDispatchers} from '../../../../../state/backup/dispatchers';
import {BackupDispatcherName} from '../../../../../state/backup/types';
import {overrideObject} from '../../../../../utils/override';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {MiscNew} from './new';
import {generatePayload} from './utils';


describe('New misc post form', () => {
  let fnIdCheck: jest.SpyInstance;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useFakeTimers();
    fnIdCheck = jest.spyOn(ApiRequestSender, 'miscIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('performs ID check on load', async () => {
    renderReact(
      () => <MiscNew/>,
      {user: {isAdmin: true}},
    );

    jest.advanceTimersByTime(1100); // Meta checks only after 1 sec
    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
  });

  it('shows valid after typing in valid ID', async () => {
    const {rerender} = renderReact(
      () => <MiscNew/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(seqId, '7', {clear: true, rerender});
    jest.advanceTimersByTime(1100);

    expect(seqId).toHaveClass('is-valid');
  });

  it('shows invalid after typing in invalid ID', async () => {
    jest.spyOn(ApiRequestSender, 'miscIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
    });

    const {rerender} = renderReact(
      () => <MiscNew/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByPlaceholderText(translationEN.posts.info.id);
    typeInput(seqId, '7', {clear: true, rerender});
    jest.advanceTimersByTime(1100);

    await waitFor(() => expect(seqId).toHaveClass('is-invalid'));
  });

  it('loads backup data', async () => {
    renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            misc: {...overrideObject(generatePayload(SupportedLanguages.EN), {title: 'Title'})},
          },
        },
      },
    );

    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  it('does not crash given unmatched backup data scheme', async () => {
    renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            // @ts-ignore
            misc: {...overrideObject(generatePayload(SupportedLanguages.EN), {title: 'Title', c: 'A'})},
          },
        },
      },
    );

    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  it('does not crash given incomplete backup data', async () => {
    const {sections, ...miscBackup} = {
      ...generatePayload(SupportedLanguages.EN, 'admin'),
      title: 'Title',
    };

    renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            // @ts-ignore
            misc: miscBackup,
          },
        },
      },
    );

    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  it('saves new backup on change', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_MISC_POST);

    const {rerender} = renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            misc: {...generatePayload(SupportedLanguages.EN, 'admin'), title: 'Title'},
          },
        },
      },
    );

    const title = screen.getByDisplayValue('Title');
    typeInput(title, 'Title', {rerender});

    expect(fnBackup).toHaveBeenCalled();
  });

  it('clears the backup after publishing', async () => {
    jest.useRealTimers(); // Have to call this for dispatcher spy to work properly
    const fnClear = jest.spyOn(backupDispatchers, BackupDispatcherName.CLEAR_MISC_POST);
    jest.spyOn(ApiRequestSender, 'miscPublish').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      seqId: 7,
    });

    renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            misc: {...generatePayload(SupportedLanguages.EN, 'admin'), title: 'Title'},
          },
        },
      },
    );

    const publishButton = await screen.findByText(
      translationEN.posts.manage.publish,
      {selector: 'button:enabled'},
    );
    userEvent.click(publishButton);

    await waitFor(() => expect(fnClear).toHaveBeenCalled());
  });

  it('should not backup UID', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_MISC_POST);

    const {rerender} = renderReact(
      () => <MiscNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: null,
            misc: {...generatePayload(SupportedLanguages.EN, 'admin'), title: 'Title'},
          },
        },
      },
    );

    const title = screen.getByDisplayValue('Title');
    typeInput(title, 'Title', {rerender});

    // @ts-ignore
    const {uid} = fnBackup.mock.calls[0][0];
    expect(uid).toBeUndefined();
  });
});
