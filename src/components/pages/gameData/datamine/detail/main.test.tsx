import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../../test/render/main';
import {DepotPaths, UpdatedIndex, UpdatedIndexCatalog} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {DatamineDetail} from './main';


describe('Datamine detail', () => {
  const mockCatalog: UpdatedIndexCatalog = [
    {
      timestampIso: '2021-12-20T09:02:22+0000',
      fileName: '202020-202020',
      versionCode: 'A',
    },
  ];

  const mockIndex: UpdatedIndex = {
    tw: [
      {
        name: 'Task 1',
        subtasks: [
          {name: 'Subtask 1', paths: ['Path1']},
          {name: 'Subtask 2', paths: ['Path2']},
        ],
      },
      {
        name: 'Task 2',
        subtasks: [{name: 'Subtask 3', paths: ['Path3', 'Path4.png']}],
      },
    ],
    en: [],
    cn: [],
    jp: [],
  };

  let fnGetDetail: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(ResourceLoader, 'getDatamineIndexCatalog').mockResolvedValue(mockCatalog);
    fnGetDetail = jest.spyOn(ResourceLoader, 'getDatamineIndexDetail').mockResolvedValue(mockIndex);
  });

  it('renders multiple tasks', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByText(/Task 1/)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/)).toBeInTheDocument();
  });

  it('renders multiple subtasks', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByText('Subtask 1')).toBeInTheDocument();
    expect(screen.getByText('Subtask 2')).toBeInTheDocument();
  });

  it('renders multiple paths', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByText(DepotPaths.getURLofUpdatedFile('Path1'))).toBeInTheDocument();
    expect(screen.getByText(DepotPaths.getURLofUpdatedFile('Path2'))).toBeInTheDocument();
  });

  it('renders images correctly', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByAltText(DepotPaths.getURLofUpdatedFile('Path4.png'))).toBeInTheDocument();
  });

  it('renders link for non-image', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByText(DepotPaths.getURLofUpdatedFile('Path1'), {selector: 'a'})).toBeInTheDocument();
  });

  it('shows ads', async () => {
    renderReact(() => <DatamineDetail/>, {routerOptions: {query: {id: 'A'}}});

    expect(await screen.findByTestId('ads-page-top')).toBeInTheDocument();
    expect(screen.getByTestId('ads-tool-bottom')).toBeInTheDocument();
  });

  it('hides ads', async () => {
    renderReact(
      () => <DatamineDetail/>,
      {hasSession: true, user: {adsFreeExpiry: new Date()}, routerOptions: {query: {id: 'A'}}},
    );

    await waitFor(() => expect(fnGetDetail).toHaveBeenCalled());

    expect(screen.queryByText('ads-page-top')).not.toBeInTheDocument();
    expect(screen.queryByText('ads-tool-bottom')).not.toBeInTheDocument();
  });
});
