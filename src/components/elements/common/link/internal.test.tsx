import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api';
import {GeneralPath} from '../../../../const/path/definitions';
import {makeGeneralUrl} from '../../../../utils/path/make';
import {InternalLink} from './internal';


describe('Link element', () => {
  it('passes `href` to its children if specified', async () => {
    renderReact(() => (
      <InternalLink href={GeneralPath.HOME} locale={SupportedLanguages.CHT} passHref>
        <span/>
      </InternalLink>
    ));

    const anchorElem = screen.getByText('', {selector: 'span'});
    expect(anchorElem).toHaveAttribute('href', makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('renders as <a> if no `passHref`', async () => {
    renderReact(() => <InternalLink href={GeneralPath.HOME} locale={SupportedLanguages.CHT} content="a"/>);

    const anchorElem = screen.getByText('a', {selector: 'a'});
    expect(anchorElem).toHaveAttribute('href', makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.CHT}));
  });

  it('disregards language in `href`', async () => {
    renderReact(() => (
      <InternalLink
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

    renderReact(() => <InternalLink onClick={fnOnClick} content="A"/>);

    const anchorElem = screen.getByText('A');
    userEvent.click(anchorElem);

    expect(fnOnClick).toHaveBeenCalled();
  });

  it('accepts props for <a> if used', async () => {
    renderReact(() => (
      <InternalLink
        href={makeGeneralUrl(GeneralPath.HOME, {lang: SupportedLanguages.EN})}
        locale={SupportedLanguages.CHT}
        content="a"
        anchorProps={{target: '_blank'}}
      />
    ));

    const anchorElem = screen.getByText('a', {selector: 'a'});
    expect(anchorElem).toHaveAttribute('target', '_blank');
  });

  it('passed down class names', async () => {
    renderReact(() => (
      <InternalLink href={GeneralPath.HOME} locale={SupportedLanguages.CHT} className="class" passHref>
        <span/>
      </InternalLink>
    ));

    const child = screen.getByText('', {selector: 'span'});
    expect(child).toHaveClass('class');
  });

  it('keeps the class names of the children', async () => {
    renderReact(() => (
      <InternalLink href={GeneralPath.HOME} locale={SupportedLanguages.CHT} className="class" passHref>
        <span className="class2"/>
      </InternalLink>
    ));

    const child = screen.getByText('', {selector: 'span'});
    expect(child).toHaveClass('class');
    expect(child).toHaveClass('class2');
  });
});
