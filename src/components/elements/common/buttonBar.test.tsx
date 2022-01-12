import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api';
import {GeneralPath, PATH_ROOT} from '../../../api-def/paths';
import {ButtonBar} from './buttonBar';


describe('Button bar', () => {
  it('prepends language to the button link', async () => {
    renderReact(() => <ButtonBar buttons={[
      {pathname: GeneralPath.ABOUT, text: 'About', variant: 'primary'},
    ]}/>);

    expect(screen.getByText('About')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.ABOUT}`);
  });

  it('ignores the language passed in and attaches the current language', async () => {
    renderReact(() => <ButtonBar buttons={[
      {pathname: `/${SupportedLanguages.CHT}${GeneralPath.ABOUT}`, text: 'About', variant: 'primary'},
    ]}/>);

    expect(screen.getByText('About')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.ABOUT}`);
  });

  it('handles language-sensitive pathname correctly', async () => {
    renderReact(() => <ButtonBar buttons={[
      {pathname: `${PATH_ROOT}${GeneralPath.ABOUT}`, text: 'About', variant: 'primary'},
    ]}/>);

    expect(screen.getByText('About')).toHaveAttribute('href', `/${SupportedLanguages.EN}${GeneralPath.ABOUT}`);
  });

  it('triggers `onClick`', async () => {
    const onClick = jest.fn();
    renderReact(() => <ButtonBar buttons={[
      {text: 'About', variant: 'primary', onClick},
    ]}/>);

    const button = screen.getByText('About');
    userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
