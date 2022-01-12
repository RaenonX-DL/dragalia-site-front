import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api';
import {GeneralPath} from '../../../api-def/paths';
import {NavItemDropdownContainable} from '../type';
import {NavDropdownMenu} from './dropdown';


describe('Nav dropdown', () => {
  const navDropdownTitle = () => 'nav title';
  const navDropdownItems: NavItemDropdownContainable[] = [
    {
      type: 'divider',
    },
    {
      type: 'path',
      path: GeneralPath.ABOUT,
      text: () => 'dummy',
    },
    {
      type: 'header',
      text: () => 'header',
    },
  ];

  it('shows collapsed content after clicking the title', async () => {
    renderReact(() => (
      <NavDropdownMenu type="dropdown" text={navDropdownTitle} entries={navDropdownItems}/>
    ));

    const dropdownTitle = screen.getByText(navDropdownTitle());
    userEvent.click(dropdownTitle);

    expect(await screen.findByText('', {selector: 'div.collapse.show'})).toBeInTheDocument();
  });

  it('renders correct link', async () => {
    renderReact(() => (
      <NavDropdownMenu type="dropdown" text={navDropdownTitle} entries={navDropdownItems}/>
    ));

    const dummyLink = screen.getByText('dummy');
    expect(dummyLink).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.ABOUT}`);
  });

  it('shows active for the parent and the active dropdown item', async () => {
    renderReact(
      () => (
        <NavDropdownMenu
          type="dropdown"
          text={navDropdownTitle}
          entries={navDropdownItems}
          pathnameNoLang={GeneralPath.ABOUT}
        />
      ),
    );

    expect(screen.getByText(navDropdownTitle())).toHaveAttribute('data-test-is-active', 'true');
    expect(screen.getByText('dummy')).toHaveAttribute('data-test-is-active', 'true');
  });
});
