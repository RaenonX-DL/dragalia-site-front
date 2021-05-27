import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api/other/lang';
import {GeneralPath} from '../../../../const/path/definitions';
import {makeSimplePath} from '../../../../utils/path/make';
import {NavDropdownMenu} from './dropdown';
import {NavDropdownEntry} from './types';

describe('Nav dropdown', () => {
  const navDropdownTitle = 'nav title';
  const navDropdownItems: Array<NavDropdownEntry> = [
    {
      type: 'divider',
    },
    {
      type: 'item',
      path: GeneralPath.ABOUT,
      text: 'dummy',
    },
    {
      type: 'header',
      text: 'header',
    },
  ];

  it('renders items correctly after clicking the title', async () => {
    renderReact(() => <NavDropdownMenu title={navDropdownTitle} items={navDropdownItems}/>);

    const dropdownTitle = screen.getByText('nav title');
    act(() => {
      fireEvent.click(dropdownTitle);
    });

    await waitFor(async () => {
      const dummyLink = screen.getByText('dummy');
      expect(dummyLink).toHaveAttribute('href', makeSimplePath(GeneralPath.ABOUT, {lang: SupportedLanguages.EN}));
      expect(screen.queryByText('header')).toHaveAttribute('role', 'heading');
      expect(screen.getByTestId('divider')).toHaveAttribute('role', 'separator');
    });
  });

  it('shows active for the parent and the selected item after click', async () => {
    renderReact(() => <NavDropdownMenu title={navDropdownTitle} items={navDropdownItems}/>);

    const dropdownTitle = screen.getByText('nav title');
    act(() => {
      fireEvent.click(dropdownTitle);
    });

    const dummyLink = screen.getByText('dummy');
    act(() => {
      fireEvent.click(dummyLink);
    });

    await waitFor(async () => {
      expect(dropdownTitle).toHaveClass('active');
      expect(dummyLink).toHaveClass('active');
    });
  });
});
