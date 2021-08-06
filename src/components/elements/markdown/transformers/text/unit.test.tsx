import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../../../../api-def/api';
import {DepotPaths, SimpleUnitInfo} from '../../../../../api-def/resources';
import {MarkdownUnitName} from './unit';


describe('Unit link', () => {
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

  it('transforms to unit link with both unit ID and name used', async () => {
    const text = '10950101/Gala Leonidas';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {resources: {simpleUnitInfo}},
    );

    expect(screen.getByText('Gala Leonidas')).toBeInTheDocument();
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('transforms to unit link with unit ID only', async () => {
    const text = '10950101';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {resources: {simpleUnitInfo}},
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.queryByText('10950101')).not.toBeInTheDocument();
  });

  it('shows unit icon', async () => {
    const text = '10950101';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {resources: {simpleUnitInfo}},
    );

    const unitIcon = screen.getByText('', {selector: 'img'});
    expect(unitIcon).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));
  });

  it('shows original text if the unit info is not found', async () => {
    const text = '10950102/Gala Leonidas';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {resources: {simpleUnitInfo}},
    );

    expect(screen.getByText('Gala Leonidas')).toBeInTheDocument();
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('shows original text if the content is invalid', async () => {
    const text = 'Text';

    renderReact(
      () => <MarkdownUnitName>{text}</MarkdownUnitName>,
      {resources: {simpleUnitInfo}},
    );

    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
