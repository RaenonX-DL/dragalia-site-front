import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api';
import {SimpleUnitInfo} from '../../../../../api-def/resources';
import {MarkdownUnitName} from './unit';


describe('Unit link', () => {
  const simpleUnitInfo: SimpleUnitInfo = {
    '10950101': {
      name: {
        [SupportedLanguages.CHT]: 'CHT',
        [SupportedLanguages.EN]: 'EN',
        [SupportedLanguages.JP]: 'JP',
      },
    },
  };

  it('transforms to unit link with both unit ID and name used', async () => {
    const text = '10950101|Gala Leonidas';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {simpleUnitInfo},
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.queryByText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('transforms to unit link with unit ID only', async () => {
    const text = '10950101';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {simpleUnitInfo},
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.queryByText('Gala Leonidas')).not.toBeInTheDocument();
  });

  it('shows original text if the unit info is not found', async () => {
    const text = '10950102|Gala Leonidas';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {simpleUnitInfo},
    );

    expect(screen.getByText('Gala Leonidas')).toBeInTheDocument();
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('shows original text if the content is invalid', async () => {
    const text = 'Text';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {simpleUnitInfo},
    );

    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
