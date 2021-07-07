import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {Markdown} from './main';


describe('Markdown (Image)', () => {
  it('shows image in original markdown syntax', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg)'}</Markdown>);

    expect(screen.getByAltText('Alt')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });

  it('shows unit image as icon', async () => {
    renderReact(() => <Markdown>{'![Alt](https://i.imgur.com/mtxtE5j.jpeg[unitIcon])'}</Markdown>);

    const image = screen.getByAltText('Alt');
    expect(image).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
    expect(image).toHaveClass('unitIcon');
  });

  it('renders image link as <img>', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.jpeg'}</Markdown>);

    const imageElement = screen.getByAltText('image');
    expect(imageElement).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });

  it('renders GIF as a clickable button', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.gif'}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openGif);
    userEvent.click(openButton);

    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.gif');
  });

  it('records a GIF has been opened', async () => {
    const fnGAShowGif = jest.spyOn(GoogleAnalytics, 'showGif');
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.gif'}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openGif);
    userEvent.click(openButton);
    expect(fnGAShowGif).toHaveBeenCalledTimes(1);
  });
});
