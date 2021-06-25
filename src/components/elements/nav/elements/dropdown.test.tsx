import React from 'react';

import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {GeneralPath} from '../../../../const/path/definitions';
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
    userEvent.click(dropdownTitle);

    const dummyLink = screen.getByText('dummy');
    expect(dummyLink).toHaveAttribute('href', GeneralPath.ABOUT);
    expect(screen.queryByText('header')).toHaveAttribute('role', 'heading');
    expect(screen.getByTestId('divider')).toHaveAttribute('role', 'separator');
  });

  it('shows active for the parent and the active dropdown item', async () => {
    renderReact(
      () => <NavDropdownMenu title={navDropdownTitle} items={navDropdownItems}/>,
      {
        routerOptions: {
          pathname: GeneralPath.ABOUT,
        },
      },
    );

    const dropdownTitle = screen.getByText('nav title');
    userEvent.click(dropdownTitle);

    const dummyLink = screen.getByText('dummy');
    // False positive of pointer event set to `none`
    fireEvent.click(dummyLink);

    expect(dropdownTitle).toHaveClass('active');
    expect(dummyLink).toHaveClass('active');
  });
});
