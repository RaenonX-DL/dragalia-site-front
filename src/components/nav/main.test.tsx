import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../test/render/main';
import {GeneralPath} from '../../const/path/definitions';
import {translation as translationEN} from '../../i18n/translations/en/translation';
import {NavigationBody} from './main/body';


describe('Navigation bar', () => {
  it('shows the clicked item as active', async () => {
    const {rerender} = renderReact(() => <NavigationBody/>);

    const thanksButton = screen.getByText(translationEN.meta.inUse.thanks.title);
    userEvent.click(thanksButton);
    rerender();

    expect(thanksButton).toHaveClass('active');
  });

  it('shows as active on load', async () => {
    renderReact(
      () => <NavigationBody/>,
      {routerOptions: {pathname: GeneralPath.ABOUT}},
    );

    const aboutButton = screen.getByText(translationEN.meta.inUse.about.title);

    expect(aboutButton).toHaveAttribute('data-test-is-active', 'true');
  });
});
