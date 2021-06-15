import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {GeneralPath} from '../../../const/path/definitions';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {PostManageBar} from './manageBar';


describe('Post manage bar', () => {
  it('has `href` to create a new post', async () => {
    renderReact(() => (
      <PostManageBar newButtons={[
        {
          url: GeneralPath.ABOUT,
          title: 'New',
        },
        {
          url: GeneralPath.HOME,
          title: 'New 2',
        },
      ]}/>
    ));

    expect(screen.getByText('New')).toHaveAttribute('href', GeneralPath.ABOUT);
    expect(screen.getByText('New 2')).toHaveAttribute('href', GeneralPath.HOME);
  });

  it('has `href` to edit a post', async () => {
    renderReact(() => (
      <PostManageBar
        newButtons={[{url: GeneralPath.ABOUT, title: 'New'}]}
        editPostUrl={'/edit'}
      />
    ));

    expect(screen.getByText(translationEN.posts.manage.edit)).toHaveAttribute('href', '/edit');
  });
});
