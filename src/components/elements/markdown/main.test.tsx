import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {Markdown} from './main';


describe('Markdown', () => {
  it('renders normal links as <a>', async () => {
    renderReact(() => <Markdown>{'[some link](/link)'}</Markdown>);

    const linkElement = screen.getByText('some link');
    expect(linkElement).toHaveAttribute('href', '/link');
    expect(linkElement).toHaveAttribute('target', '_blank');
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
});
