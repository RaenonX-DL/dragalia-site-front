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

  it('renders image links as <img>', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.jpeg'}</Markdown>);

    const imageElement = screen.getByAltText('image');
    expect(imageElement).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
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
});
