import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ObjectId} from 'mongodb';

import {renderReact} from '../../../../../../../test/render/main';
import {PostType} from '../../../../../../api-def/api';
import {translation as translationEN} from '../../../../../../i18n/translations/en/translation';
import {UserConfig} from '../../type';
import {UserSettingsSubscriptions} from './main';


describe('Subscription config panel', () => {
  let config: UserConfig;
  let fnSetConfig: jest.Mock;

  beforeEach(() => {
    fnSetConfig = jest.fn().mockImplementation((newConfig) => config = newConfig);

    config = {
      subscriptionKeys: [
        {type: 'const', name: 'ALL_TIER'},
        {type: 'post', postType: PostType.QUEST, id: 7},
      ],
    };
  });

  it('does not remove from candidate list if an option is deselected', async () => {
    const {rerender} = renderReact(
      () => (
        <UserSettingsSubscriptions config={config} setConfig={fnSetConfig} getUnitName={() => 'unit name'}/>
      ),
      {hasSession: true},
    );

    const candidate = screen.getAllByText(`Quest Guides #7`)[0];
    userEvent.click(candidate);

    rerender();

    expect(screen.getByText(`Quest Guides #7`)).toBeInTheDocument();
  });

  it('sends correct payload after changes', async () => {
    const uid = new ObjectId();
    renderReact(
      () => (
        <UserSettingsSubscriptions config={config} setConfig={fnSetConfig} getUnitName={() => 'unit name'}/>
      ),
      {hasSession: true, user: {uid}},
    );

    const candidate = screen.getAllByText(`Quest Guides #7`)[0];
    userEvent.click(candidate);

    const expected: UserConfig = {
      subscriptionKeys: config.subscriptionKeys,
    };
    expect(fnSetConfig).toHaveBeenCalledWith(expected);
  });

  it('removes all subscriptions', async () => {
    const uid = new ObjectId();
    renderReact(
      () => (
        <UserSettingsSubscriptions config={config} setConfig={fnSetConfig} getUnitName={() => 'unit name'}/>
      ),
      {hasSession: true, user: {uid}},
    );

    const removeAllButton = screen.getByText(translationEN.userControl.subscriptions.removeAll);
    userEvent.click(removeAllButton);

    const expected: UserConfig = {
      subscriptionKeys: [],
    };
    expect(fnSetConfig).toHaveBeenCalledWith(expected);
  });
});
