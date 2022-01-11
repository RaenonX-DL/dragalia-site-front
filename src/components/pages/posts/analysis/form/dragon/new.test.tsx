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
import {AnalysisFormDragonNew} from './new';
import {generatePayload} from './utils';


describe('New dragon analysis form', () => {
  let fnIdCheck: jest.SpyInstance;

  const changeToValidUnitIdAndWaitPass = async () => {
    const unitId = screen.getByDisplayValue(0);
    userEvent.clear(unitId);
    userEvent.type(unitId, '20950101');
    jest.advanceTimersByTime(1100);
    await waitFor(() => expect(unitId).toHaveClass('is-valid'));
  };

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
      () => <AnalysisFormDragonNew/>,
      {user: {isAdmin: true}},
    );

    jest.advanceTimersByTime(1100); // Meta checks only after 1 sec
    await waitFor(() => expect(fnIdCheck).toHaveBeenCalled());
  });

  it('shows valid after typing in ID', async () => {
    renderReact(
      () => <AnalysisFormDragonNew/>,
      {user: {isAdmin: true}},
    );

    await changeToValidUnitIdAndWaitPass();
  });

  it('loads backup data', async () => {
    renderReact(
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: null,
              dragon: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                videos: 'vid',
              },
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
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: null,
              dragon: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
                // @ts-ignore
                video: 'vid',
              },
            },
            quest: null,
          },
        },
      },
    );

    expect(screen.getByText('sum')).toBeInTheDocument();
  });

  it('does not crash given incomplete backup data', async () => {
    const {suitableCharacters, ...backup} = {
      ...generatePayload(SupportedLanguages.EN, 'admin'),
      videos: 'vid',
    };

    renderReact(
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            // @ts-ignore
            analysis: {chara: null, dragon: backup},
            quest: null,
          },
        },
      },
    );

    expect(screen.getByText('vid')).toBeInTheDocument();
  });

  it('saves new backup on change', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_DRAGON_ANALYSIS);

    const {rerender} = renderReact(
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: null,
              dragon: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
              },
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
    const fnClear = jest.spyOn(backupDispatchers, BackupDispatcherName.CLEAR_DRAGON_ANALYSIS);
    jest.spyOn(ApiRequestSender, 'analysisPublishDragon').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      unitId: 10950101,
    });

    renderReact(
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: null,
              dragon: {
                unitId: 20950101,
                lang: SupportedLanguages.EN,
                type: UnitType.DRAGON,
                summary: 'summary',
                summonResult: 'smn',
                passives: 'psv',
                normalAttacks: 'nrm',
                ultimate: 'ult',
                suitableCharacters: 'sut',
                notes: 'not',
                videos: 'vid',
              },
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
      {timeout: 2000},
    );
    userEvent.click(publishButton);

    await waitFor(() => expect(fnClear).toHaveBeenCalled());
  });

  it('should not backup UID', async () => {
    const fnBackup = jest.spyOn(backupDispatchers, BackupDispatcherName.BACKUP_DRAGON_ANALYSIS);

    const {rerender} = renderReact(
      () => <AnalysisFormDragonNew/>,
      {
        user: {isAdmin: true},
        preloadState: {
          backup: {
            analysis: {
              chara: null,
              dragon: {
                ...generatePayload(SupportedLanguages.EN, 'admin'),
                summary: 'sum',
              },
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
