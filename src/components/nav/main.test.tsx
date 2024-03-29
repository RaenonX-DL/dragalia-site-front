import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../test/render/main';
import {GeneralPath} from '../../api-def/paths';
import {translation as translationEN} from '../../i18n/translations/en/translation';
import {layoutDispatchers} from '../../state/layout/dispatchers';
import {LayoutDispatcherName} from '../../state/layout/types';
import {NavigationBody} from './main/body';
import {NavigationLandscape} from './main/landscape';


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

  it('does not show admin only path for non-admin', async () => {
    renderReact(
      () => <NavigationBody/>,
      {hasSession: true, user: {isAdmin: false}},
    );

    expect(screen.queryByText(translationEN.meta.inUse.admin.announcement.title)).not.toBeInTheDocument();
  });

  it('shows admin only path', async () => {
    renderReact(
      () => <NavigationBody/>,
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(screen.getByText(translationEN.meta.inUse.admin.announcement.title)).toBeInTheDocument();
  });

  it('hides the navbar', async () => {
    const fnSetCollapse = jest.spyOn(layoutDispatchers, LayoutDispatcherName.CHANGE_COLLAPSE);

    renderReact(
      () => <NavigationLandscape/>,
      {preloadState: {layout: {width: 'full', collapse: false}}},
    );

    const collapseButton = screen.getByText('', {selector: 'i.bi-arrow-bar-left'});
    userEvent.click(collapseButton);
    await waitFor(() => expect(fnSetCollapse).toHaveBeenNthCalledWith(1, true));

    fnSetCollapse.mockRestore();
  });

  it('shows the navbar', async () => {
    const fnSetCollapse = jest.spyOn(layoutDispatchers, LayoutDispatcherName.CHANGE_COLLAPSE);

    renderReact(
      () => <NavigationLandscape/>,
      {preloadState: {layout: {width: 'full', collapse: true}}},
    );

    const showButton = screen.getByText('', {selector: 'i.bi-arrow-bar-right'});
    userEvent.click(showButton);
    await waitFor(() => expect(fnSetCollapse).toHaveBeenNthCalledWith(1, false));

    fnSetCollapse.mockRestore();
  });
});
