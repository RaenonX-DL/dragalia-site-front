import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {ApiResponseCode, SupportedLanguages} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {backupDispatchers} from '../../../../../state/backup/dispatchers';
import {BackupDispatcherName} from '../../../../../state/backup/types';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {QuestNewForm} from './new';
import {generatePayload} from './utils';


describe('New quest post form', () => {
  let fnIdCheck: jest.SpyInstance;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useFakeTimers();
    fnIdCheck = jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
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
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    jest.advanceTimersByTime(1100); // Meta checks only after 1 sec
    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
  });

  it('shows valid after typing in valid ID', async () => {
    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByText(translationEN.posts.info.id);
    typeInput(seqId.previousSibling as Element, '7', {clear: true, rerender});
    jest.advanceTimersByTime(1100);

    expect(seqId.previousSibling).toHaveClass('is-valid');
  });

  it('shows invalid after typing in invalid ID', async () => {
    jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: false,
    });

    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {user: {isAdmin: true}},
    );

    const seqId = screen.getByText(translationEN.posts.info.id);
    typeInput(seqId.previousSibling as Element, '7', {clear: true, rerender});
    jest.advanceTimersByTime(1100);

    await waitFor(() => expect(seqId.previousSibling).toHaveClass('is-invalid'));
  });

  it('loads backup data', async () => {
    renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: {...generatePayload(SupportedLanguages.EN, 'admin'), addendum: 'add'},
            misc: null,
          },
        },
      },
    );

    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('does not crash given unmatched backup data scheme', async () => {
    renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: {
              ...generatePayload(SupportedLanguages.EN, 'admin'),
              // @ts-ignore
              add: 'add2',
              addendum: 'add',
            },
          },
        },
      },
    );

    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('does not crash given incomplete backup data', async () => {
    const {addendum, positional, ...questBackup} = {
      ...generatePayload(SupportedLanguages.EN, 'admin'),
      video: 'vid',
    };

    renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            // @ts-ignore
            quest: questBackup,
          },
        },
      },
    );

    expect(screen.getByText('vid')).toBeInTheDocument();
  });

  it('saves new backup on change', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_QUEST_GUIDE);

    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: {...generatePayload(SupportedLanguages.EN, 'admin'), addendum: 'add'},
            misc: null,
          },
        },
      },
    );

    const addendum = screen.getByText('add');
    typeInput(addendum, 'addendum', {rerender});

    expect(fnBackup).toHaveBeenCalled();
  });

  it('clears the backup after publishing', async () => {
    jest.useRealTimers(); // Have to call this for dispatcher spy to work properly
    const fnClear = jest.spyOn(backupDispatchers, BackupDispatcherName.CLEAR_QUEST_GUIDE);
    jest.spyOn(ApiRequestSender, 'questPublish').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      seqId: 7,
    });

    renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: {
              seqId: 7,
              lang: SupportedLanguages.CHT,
              title: 'ttl',
              general: 'gen',
              video: 'vid',
              positional: [
                {
                  position: 'pos',
                  rotations: 'rot',
                  builds: 'bld',
                  tips: 'tps',
                },
              ],
              addendum: 'adm',
            },
            misc: null,
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
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_QUEST_GUIDE);

    const {rerender} = renderReact(
      () => <QuestNewForm/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {chara: null, dragon: null},
            quest: {...generatePayload(SupportedLanguages.EN, 'admin'), addendum: 'add'},
            misc: null,
          },
        },
      },
    );

    const addendum = screen.getByText('add');
    typeInput(addendum, 'addendum', {rerender});

    // @ts-ignore
    const {uid} = fnBackup.mock.calls[0][0];
    expect(uid).toBeUndefined();
  });
});
