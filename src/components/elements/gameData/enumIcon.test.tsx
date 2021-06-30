import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {DepotPaths} from '../../../api-def/resources/paths';
import {EnumEntry} from '../../../api-def/resources/types/enum';
import {EnumEntryImageIcon} from './enumIcon';


describe('Enum entry icon', () => {
  it('shows image if the image path is available', async () => {
    const entry: EnumEntry = {
      code: 7,
      name: 'enum',
      imagePath: '/image.jpg',
      trans: {
        [SupportedLanguages.CHT]: 'enum CHT',
        [SupportedLanguages.EN]: 'enum EN',
        [SupportedLanguages.JP]: 'enum JP',
      },
    };
    renderReact(() => <EnumEntryImageIcon entry={entry}/>);
    expect(screen.getByAltText('enum EN')).toHaveAttribute('src', DepotPaths.getImageURL('/image.jpg'));
  });

  it('shows translation if the image is unavailable', async () => {
    const entry: EnumEntry = {
      code: 7,
      name: 'enum',
      imagePath: null,
      trans: {
        [SupportedLanguages.CHT]: 'enum CHT',
        [SupportedLanguages.EN]: 'enum EN',
        [SupportedLanguages.JP]: 'enum JP',
      },
    };
    renderReact(() => <EnumEntryImageIcon entry={entry}/>);

    expect(screen.getByText('enum EN')).toBeInTheDocument();
  });

  it('shows nothing if the entry is undefined', async () => {
    const {container} = renderReact(() => <EnumEntryImageIcon entry={undefined}/>);

    expect(container.firstChild).toBeNull();
  });
});
