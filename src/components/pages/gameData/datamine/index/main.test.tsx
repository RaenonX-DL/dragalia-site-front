import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {UpdatedIndexCatalog} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {DatamineCatalog} from './main';


describe('Datamine listing index', () => {
  const mockData: UpdatedIndexCatalog = [
    {
      timestampIso: '2021-12-20T09:02:22+0000',
      fileName: '202020-202020',
      versionCode: 'ABC',
    },
  ];

  let fnGetDatamineCatalog: jest.SpyInstance;

  beforeEach(() => {
    fnGetDatamineCatalog = jest.spyOn(ResourceLoader, 'getDatamineIndexCatalog').mockResolvedValue(mockData);
  });

  it('renders available versions', async () => {
    renderReact(() => <DatamineCatalog/>);

    expect(fnGetDatamineCatalog).toHaveBeenCalled();

    expect(await screen.findByText('ABC')).toBeInTheDocument();
  });
});
