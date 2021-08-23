import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {makeGeneralUrl} from '../../../utils/path/make';
import {Link} from './link';


describe('Link element', () => {
  it('passes `href` to its children if specified', async () => {
    renderReact(() => (
      <Link href={GeneralPath.HOME} locale={SupportedLanguages.CHT} passHref>
        <span/>
      </Link>
    ));

    const anchorElem = screen.getByText('', {selector: 'span'});
    expect(anchorElem).toHaveAttribute('href', makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('renders as <a> if no `passHref`', async () => {
    renderReact(() => <Link href={GeneralPath.HOME} locale={SupportedLanguages.CHT} content="a"/>);

    const anchorElem = screen.getByText('a', {selector: 'a'});
    expect(anchorElem).toHaveAttribute('href', makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('disregards language in `href`', async () => {
    renderReact(() => (
      <Link
        href={makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.EN})}
        locale={SupportedLanguages.CHT}
        content="a"
      />
    ));

    const anchorElem = screen.getByText('a', {selector: 'a'});
    expect(anchorElem).toHaveAttribute('href', makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('triggers `onClick`', async () => {
    const fnOnClick = jest.fn();

    renderReact(() => <Link onClick={fnOnClick} content="A"/>);

    const anchorElem = screen.getByText('A');
    userEvent.click(anchorElem);

    expect(fnOnClick).toHaveBeenCalled();
  });

  it('accepts props for <a> if used', async () => {
    renderReact(() => (
      <Link
        href={makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.EN})}
        locale={SupportedLanguages.CHT}
        content="a"
        anchorProps={{target: '_blank'}}
      />
    ));

    const anchorElem = screen.getByText('a', {selector: 'a'});
    expect(anchorElem).toHaveAttribute('target', '_blank');
  });
});
