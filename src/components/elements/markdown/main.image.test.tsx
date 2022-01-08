import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {Markdown} from './main';
import {KEYWORD_FOR_MODAL} from './transformers/image/const';


describe('Markdown (Image)', () => {
  it('shows image in original markdown syntax', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg)'}</Markdown>);

    expect(screen.getByAltText('Alt')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });

  it('shows unit image as icon', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg[unit-icon])'}</Markdown>);

    const image = screen.getByAltText('Alt');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
    expect(image).toHaveClass('unit-icon');
  });

  it('allows injecting CSS class to image', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg[w-100])'}</Markdown>);

    const image = screen.getByAltText('Alt');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
    expect(image).toHaveClass('w-100');
  });

  it('escapes sensitive characters', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg["><script></script>])'}</Markdown>);

    const image = screen.getByAltText('Alt');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
    expect(image).not.toHaveAttribute('class');
  });

  it('renders image link as <img>', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.jpeg'}</Markdown>);

    const imageElement = screen.getByAltText('image');
    expect(imageElement).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });

  it('renders GIF as a clickable button', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.gif'}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openImage);
    userEvent.click(openButton);

    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.gif');
  });

  it('records a GIF has been opened', async () => {
    const fnGAShowGif = jest.spyOn(GoogleAnalytics, 'showImage');
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.gif'}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openImage);
    userEvent.click(openButton);
    expect(fnGAShowGif).toHaveBeenCalledTimes(1);
  });

  it('renders image as a clickable button if specified', async () => {
    renderReact(() => <Markdown>{`![Alt](https://i.imgur.com/mtxtE5j.jpeg[${KEYWORD_FOR_MODAL}])`}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openImage);
    userEvent.click(openButton);

    const image = screen.getByAltText('Alt');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
    expect(image).not.toHaveClass(KEYWORD_FOR_MODAL);
  });
});
