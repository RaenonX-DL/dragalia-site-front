import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../../api-def/api';
import {DepotPaths, SimpleUnitInfo} from '../../../api-def/resources';
import {Markdown} from './main';


describe('Markdown', () => {
  it('renders normal links as <a>', async () => {
    renderReact(() => <Markdown>{'[some link](/link)'}</Markdown>);

    const linkElement = screen.getByText('some link');
    expect(linkElement).toHaveAttribute('href', '/link');
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('uses custom syntax within <strong>', async () => {
    renderReact(() => <Markdown>{'**==5+5==**'}</Markdown>);

    expect(screen.getByText('10', {selector: 'strong > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h1>', async () => {
    renderReact(() => <Markdown>{'# ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h1 > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h2>', async () => {
    renderReact(() => <Markdown>{'## ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h2 > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h3>', async () => {
    renderReact(() => <Markdown>{'### ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h3 > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h4>', async () => {
    renderReact(() => <Markdown>{'#### ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h4 > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h5>', async () => {
    renderReact(() => <Markdown>{'##### ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h5 > span'})).toBeInTheDocument();
  });

  it('uses custom syntax within <h6>', async () => {
    renderReact(() => <Markdown>{'###### ==5+5=='}</Markdown>);

    expect(screen.getByText('10', {selector: 'h6 > span'})).toBeInTheDocument();
  });

  it('renders long youtube video link as embed', async () => {
    renderReact(() => <Markdown>{'https://www.youtube.com/watch?v=m8B_tlk-pl0'}</Markdown>);

    const embedElement = screen.getByTestId('youtubeEmbed');
    expect(embedElement).toHaveAttribute('src', '//www.youtube.com/embed/m8B_tlk-pl0');
  });

  it('renders short youtube video link as embed', async () => {
    renderReact(() => <Markdown>{'https://youtu.be/m8B_tlk-pl0'}</Markdown>);

    const embedElement = screen.getByTestId('youtubeEmbed');
    expect(embedElement).toHaveAttribute('src', '//www.youtube.com/embed/m8B_tlk-pl0');
  });

  it('renders texts as <div>', async () => {
    renderReact(() => <Markdown>{'some text'}</Markdown>);

    expect(screen.getByText('some text', {selector: 'div'})).toBeInTheDocument();
  });

  it('renders a table correctly', async () => {
    const tableText = 'head | col 2\n:---: | :---:\nX | Y';

    renderReact(() => <Markdown>{tableText}</Markdown>);

    expect(screen.getByText('head', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col 2', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('X', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('Y', {selector: 'td'})).toBeInTheDocument();
  });

  it('does not crash if the table is incomplete', async () => {
    const tableText = 'head | col 2\n:---: | :---:\nX';

    renderReact(() => <Markdown>{tableText}</Markdown>);

    expect(screen.getByText('head', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col 2', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('X', {selector: 'td'})).toBeInTheDocument();
  });

  it('renders multiple tables correctly', async () => {
    const tableText = 'head | col 2\n:---: | :---:\nX | Y';
    const table2Text = 'footer | col B\n:---: | :---:\nZ | A';

    renderReact(() => <Markdown>{`${tableText}\n\n${table2Text}`}</Markdown>);

    expect(screen.getByText('head', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col 2', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('X', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('Y', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('footer', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col B', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('Z', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('A', {selector: 'td'})).toBeInTheDocument();
  });

  it('colors the text by RGB', async () => {
    const markdown = '::[#757575]Text::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: '#757575'});
  });

  it('colors the text by preset color', async () => {
    const markdown = '::[red]Text::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors multiple texts', async () => {
    const markdown = 'No color ::[#757575]Text 1:: ::[red]Text 2::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text 1', {selector: 'span'})).toHaveStyle({color: '#757575'});
    expect(screen.getByText('Text 2', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text in table', async () => {
    const markdown = 'head | ::[red]col 2::\n:---: | :---:\nX | Y';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    const headCell = screen.getByText('col 2', {selector: 'span'});
    expect(headCell).toHaveStyle({color: 'red'});
    expect(headCell.parentElement?.tagName).toBe('TH');
  });

  it('colors text in table header', async () => {
    const markdown = 'head | col 2\n:---: | :---:\nX | ::[red]Y::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Y', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text in list', async () => {
    const markdown = '- X\n- ::[red]Y::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Y', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('only color the desired text', async () => {
    const markdown = 'Highlight ::[red]red:: only';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('red', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('does not color if the syntax is incomplete', async () => {
    const markdown = '[red]red';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('[red]red')).toBeInTheDocument();
  });

  it('enlarges the whole text', async () => {
    const markdown = '!!whole!!';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('whole', {selector: 'span'})).toHaveStyle({fontSize: '1.5rem'});
  });

  it('enlarges the desired text', async () => {
    const markdown = 'Partial !!enlarge!! me';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('enlarge', {selector: 'span'})).toHaveStyle({fontSize: '1.5rem'});
  });

  it('enlarges within colored text', async () => {
    const markdown = '::[red]Some !!enlarged!! text::';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    const elem = screen.getByText('enlarged', {selector: 'span'});
    expect(elem).toHaveStyle({fontSize: '1.5rem'});
    expect(elem.parentElement).toHaveStyle({color: 'red'});
  });

  it('colors text with some enlarged', async () => {
    const markdown = '!!Enlarged and ::[red]colored::!!';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    const elem = screen.getByText('colored', {selector: 'span'});
    expect(elem).toHaveStyle({color: 'red'});
    expect(elem.parentElement).toHaveStyle({fontSize: '1.5rem'});
  });

  it('shows original if the color syntax is unclosed', async () => {
    const markdown = '::[#757575]Text';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('::[#757575]Text')).toBeInTheDocument();
  });

  it('calculates and show the result', async () => {
    const markdown = '==5 + 5 [fx]==';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('10 (5 + 5)')).toBeInTheDocument();
  });

  it('calculates complicating expression', async () => {
    const markdown = '==[fx] 13% x 2 + 38% x 1== (3 Hit)';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('(13% x 2 + 38% x 1) 64%')).toBeInTheDocument();
    expect(screen.getByText(/(3 Hit)/)).toBeInTheDocument();
  });

  it('skips calculating invalid expression', async () => {
    const markdown = '==something==';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('something')).toBeInTheDocument();
  });

  const simpleUnitInfo: SimpleUnitInfo = {
    '10950101': {
      name: {
        [SupportedLanguages.CHT]: 'CHT',
        [SupportedLanguages.EN]: 'EN',
        [SupportedLanguages.JP]: 'JP',
      },
      type: UnitType.CHARACTER,
      icon: '100013_04_r05',
    },
  };

  it('transforms to unit link', async () => {
    const markdown = '--10950101--';

    renderReact(
      () => <Markdown>{markdown}</Markdown>,
      {simpleUnitInfo},
    );

    const unitIcon = screen.getByText('', {selector: 'img'});
    expect(unitIcon).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));

    const unitLink = screen.getByText('EN');
    userEvent.click(unitLink);

    expect(await screen.findByText('Analysis')).toBeInTheDocument();
  });

  it('transforms to unit link in a sentence', async () => {
    const markdown = 'Some text --10950101-- about an unit.';

    renderReact(
      () => <Markdown>{markdown}</Markdown>,
      {simpleUnitInfo},
    );

    const unitIcon = screen.getByText('', {selector: 'img'});
    expect(unitIcon).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));

    const unitLink = screen.getByText('EN');
    userEvent.click(unitLink);

    expect(await screen.findByText('Analysis')).toBeInTheDocument();
  });
});
