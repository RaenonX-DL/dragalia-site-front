import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import status from '../../../../test/data/resources/enums/status.json';
import {renderReact} from '../../../../test/render/main';
import {PartiallySupportedLanguages, SupportedLanguages, UnitType} from '../../../api-def/api';
import {DepotPaths, SimpleUnitInfo} from '../../../api-def/resources';
import {Markdown} from './main';
import {makeAfflictionIconMarkdown} from './transformers/text/icon/utils';


describe('Markdown', () => {
  describe('Markdown - Regression', () => {
    it('renders normal links as <a>', async () => {
      renderReact(() => <Markdown>{'[some link](/link)'}</Markdown>);

      const linkElement = screen.getByText('some link');
      expect(linkElement).toHaveAttribute('href', '/link');
      expect(linkElement).toHaveAttribute('target', '_blank');
    });

    it('renders referenced link in responsive table header', async () => {
      const text = `[RefLink]: https://dl.raenonx.cc/analysis/48\n[RefLink] | Header\n:---: | :---:\nData 1 | Data 2`;

      renderReact(() => <Markdown>{text}</Markdown>);

      const linkElement = screen.getAllByText('RefLink')[0];
      expect(linkElement).toHaveAttribute('href', 'https://dl.raenonx.cc/analysis/48');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(screen.getByText('Data 1')).toBeInTheDocument();
      expect(screen.getByText('Data 2')).toBeInTheDocument();
      expect(screen.getAllByText('Header')).toHaveLength(2);
    });

    it('renders multiple responsive tables correctly', async () => {
      const text = `A | B\n:---: | :---:\nA1 | B1\n\nC | D\n:---: | :---:\nC1 | D1`;

      renderReact(() => <Markdown>{text}</Markdown>);

      // Should only have 2 elements available for each header: 1 for desktop, 1 for mobile (responsive header)
      expect(screen.getAllByText('A')).toHaveLength(2);
      expect(screen.getAllByText('B')).toHaveLength(2);
      expect(screen.getAllByText('C')).toHaveLength(2);
      expect(screen.getAllByText('D')).toHaveLength(2);
    });

    it('renders unit icon correctly in responsive header', async () => {
      const text = `--10750105/Y!Cleo-- | B\n:---: | :---:\nA1 | B1`;

      renderReact(() => <Markdown>{text}</Markdown>);

      // Should only have 2 elements available for each header: 1 for desktop, 1 for mobile (responsive header)
      expect(screen.getAllByText('Y!Cleo')).toHaveLength(2);
    });
  });

  describe('Markdown - Syntax Nesting', () => {
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
  });

  describe('Markdown - Text Transform', () => {
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
  });

  describe('Markdown - Table', () => {
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
  });

  describe('Markdown - Text Coloring', () => {
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

      // 1 for normal; 1 for responsive header
      const headCell = screen.getAllByText('col 2', {selector: 'span'})[0];
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

    it('shows original if the color syntax is unclosed', async () => {
      const markdown = '::[#757575]Text';

      renderReact(() => <Markdown>{markdown}</Markdown>);

      expect(screen.getByText('::[#757575]Text')).toBeInTheDocument();
    });
  });

  describe('Markdown - Text Enlarging', () => {
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
  });

  describe('Markdown - Text Calculator', () => {
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
  });

  describe('Markdown - Unit Link', () => {
    const simpleUnitInfo: SimpleUnitInfo = {
      '10950101': {
        name: {
          [SupportedLanguages.CHT]: 'CHT',
          [SupportedLanguages.EN]: 'EN',
          [SupportedLanguages.JP]: 'JP',
          [PartiallySupportedLanguages.CHS]: 'CHS',
        },
        type: UnitType.CHARACTER,
        icon: '100013_04_r05',
      },
    };

    it('transforms to unit link', async () => {
      const markdown = '--10950101--';

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {simpleUnitInfo}},
      );

      const unitIcon = screen.getByText('', {selector: 'img'});
      expect(unitIcon).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));

      const unitLink = screen.getByText('EN');
      userEvent.click(unitLink);

      expect(await screen.findByText('Analysis')).toBeInTheDocument();
    });

    it('transforms to unit link in a sentence', async () => {
      const markdown = 'Some text --10950101-- about a unit.';

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {simpleUnitInfo}},
      );

      const unitIcon = screen.getByText('', {selector: 'img'});
      expect(unitIcon).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));

      const unitLink = screen.getByText('EN');
      userEvent.click(unitLink);

      expect(await screen.findByText('Analysis')).toBeInTheDocument();
    });
  });

  describe('Markdown - Affliction Icon', () => {
    it('shows affliction icon in sentence', async () => {
      const markdown = 'Afflicts poison';

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Poison/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Poison');
    });

    it('does not show multiple affliction icons for one if already exists', async () => {
      const markdown = `${makeAfflictionIconMarkdown(status.status[0])} poison`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getAllByText(/poison/).length).toBe(1);
      expect(screen.getAllByText('', {selector: 'img'}).length).toBe(1);
    });

    it('shows multiple affliction icons for different afflictions', async () => {
      const markdown = `Afflicts poison, also afflicts poison`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getAllByText('', {selector: 'img'}).length).toBe(2);
    });

    it('shows affliction icon in table cell', async () => {
      const markdown = `head | col 2\n:---: | :---:\nX | poison`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Poison/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Poison');
    });

    it('shows affliction icon in <strong> text', async () => {
      const markdown = `**Afflicts poison**.`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Poison/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Poison');
    });

    it('shows affliction icon in heading', async () => {
      const markdown = `### Afflicts poison`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Poison/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Poison');
    });

    it('shows affliction icon in colored text', async () => {
      const markdown = `::[green] Afflicts poison::`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Poison/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Poison');
    });

    it('shows correct icon for Flashburn', async () => {
      const markdown = `::[green] Afflicts Flashburn::`;

      renderReact(
        () => <Markdown>{markdown}</Markdown>,
        {resources: {afflictions: status}},
      );

      expect(screen.getByText(/Flashburn/)).toBeInTheDocument();
      expect(screen.getByText('', {selector: 'img'})).toHaveAttribute('alt', 'Flashburn');
    });
  });
});
