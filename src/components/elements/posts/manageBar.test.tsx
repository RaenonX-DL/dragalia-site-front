import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api';
import {GeneralPath} from '../../../api-def/paths';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {PostManageBar} from './manageBar';


describe('Post manage bar', () => {
  it('has `href` to create a new post', async () => {
    renderReact(() => (
      <PostManageBar newButtons={[
        {
          pathname: GeneralPath.ABOUT,
          text: 'New',
        },
        {
          pathname: GeneralPath.EX,
          text: 'New 2',
        },
      ]}/>
    ));

    expect(screen.getByText('New')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.ABOUT}`);
    expect(screen.getByText('New 2')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.EX}`);
  });

  it('has `href` to edit a post', async () => {
    renderReact(() => (
      <PostManageBar
        newButtons={[{pathname: GeneralPath.ABOUT, text: 'New'}]}
        editPostUrl="/edit"
      />
    ));

    const expectedLink = `/${SupportedLanguages.EN}/edit`;
    expect(screen.getByText(translationEN.posts.manage.edit)).toHaveAttribute('href', expectedLink);
  });
});
