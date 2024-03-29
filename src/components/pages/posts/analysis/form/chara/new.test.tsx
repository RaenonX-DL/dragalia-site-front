import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../../test/render/main';
import {typeInput} from '../../../../../../../test/utils/event';
import {ApiResponseCode, SupportedLanguages, UnitType} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {backupDispatchers} from '../../../../../../state/backup/dispatchers';
import {BackupDispatcherName} from '../../../../../../state/backup/types';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {AnalysisFormCharaNew} from './new';
import {generatePayload} from './utils';


describe('New character analysis form', () => {
  let fnIdCheck: jest.SpyInstance;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useFakeTimers();
    fnIdCheck = jest.spyOn(ApiRequestSender, 'analysisIdCheck').mockResolvedValue({
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
      () => <AnalysisFormCharaNew/>,
      {user: {isAdmin: true}},
    );

    jest.advanceTimersByTime(1100); // Meta checks only after 1 sec
    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
  });

  it('shows valid after typing in ID', async () => {
    const {rerender} = renderReact(
      () => <AnalysisFormCharaNew/>,
      {user: {isAdmin: true}},
    );

    const unitId = screen.getByDisplayValue(0);
    userEvent.clear(unitId);
    typeInput(unitId, '10950101', {rerender});

    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(unitId).toHaveClass('is-valid'));
  });

  it('loads backup data', async () => {
    renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                videos: 'vid',
              },
              dragon: null,
            },
            quest: null,
            misc: null,
          },
        },
      },
    );

    expect(screen.getByText('vid')).toBeInTheDocument();
  });

  it('does not crash given unmatched backup data scheme', async () => {
    renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
                // @ts-ignore
                video: 'vid',
              },
              dragon: null,
            },
            quest: null,
          },
        },
      },
    );

    expect(screen.getByText('sum')).toBeInTheDocument();
  });

  it('does not crash given incomplete backup data', async () => {
    const {skills, ...backup} = {
      ...generatePayload(SupportedLanguages.EN, 'admin'),
      videos: 'vid',
    };

    renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            // @ts-ignore
            analysis: {chara: backup, dragon: null},
            quest: null,
          },
        },
      },
    );

    expect(screen.getByText('vid')).toBeInTheDocument();
  });

  it('saves new backup on change', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_CHARA_ANALYSIS);

    const {rerender} = renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
              },
              dragon: null,
            },
            quest: null,
            misc: null,
          },
        },
      },
    );

    const summary = screen.getByText('sum');
    typeInput(summary, 'summary', {rerender});

    expect(fnBackup).toHaveBeenCalled();
  });

  it('clears the backup after publishing', async () => {
    jest.useRealTimers(); // Have to call this for dispatcher spy to work properly
    const fnClear = jest.spyOn(backupDispatchers, BackupDispatcherName.CLEAR_CHARA_ANALYSIS);
    jest.spyOn(ApiRequestSender, 'analysisPublishChara').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
      emailResult: {accepted: [], rejected: []},
    });

    renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: {
                unitId: 10550101,
                type: UnitType.CHARACTER,
                lang: SupportedLanguages.CHT,
                summary: 'summary',
                summonResult: 'summonResult',
                passives: 'passives',
                normalAttacks: 'normalAttacks',
                forceStrikes: 'forceStrikes',
                skills: [],
                tipsBuilds: 'tipsBuilds',
                videos: 'videos',
                sendUpdateEmail: true,
              },
              dragon: null,
            },
            quest: null,
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
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_CHARA_ANALYSIS);

    const {rerender} = renderReact(
      () => <AnalysisFormCharaNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
              },
              dragon: null,
            },
            quest: null,
            misc: null,
          },
        },
      },
    );

    const summary = screen.getByText('sum');
    typeInput(summary, 'summary', {rerender});

    // @ts-ignore
    const {uid} = fnBackup.mock.calls[0][0];
    expect(uid).toBeUndefined();
  });
});
