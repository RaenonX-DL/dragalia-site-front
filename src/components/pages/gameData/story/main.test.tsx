import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {DepotPaths, StoryBook} from '../../../../api-def/resources';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {UnitStory} from './main';


describe('Unit story page', () => {
  let fnGetStoryBook: jest.SpyInstance<Promise<StoryBook>>;

  beforeEach(() => {
    fnGetStoryBook = jest.spyOn(ResourceLoader, 'getStoryBook');
  });

  it('shows <hr> for thematic break', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{type: 'break'}],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('', {selector: 'hr'}));
  });

  it('shows story content with speaker icon if available', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'speaker',
          speakerIcon: 'icon.png',
          content: 'content',
          isSys: false,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    const icon = await screen.findByText('', {selector: 'img'});
    expect(icon).toHaveAttribute('src', DepotPaths.getStorySpeakerIconURL('icon.png'));
  });

  it('shows story content without speaker icon if not available', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'speaker',
          speakerIcon: null,
          content: 'content',
          isSys: false,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('speaker')).toBeInTheDocument();
    expect(screen.queryByText('', {selector: 'img'})).not.toBeInTheDocument();
  });

  it('shows speaker name explicitly', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'speaker',
          speakerIcon: null,
          content: 'content',
          isSys: false,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('speaker')).toBeInTheDocument();
  });

  it('shows story content', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'SYS',
          speakerIcon: null,
          content: 'content',
          isSys: true,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('content')).toBeInTheDocument();
  });

  it('shows system message without speaker name', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'SYS',
          speakerIcon: null,
          content: 'content',
          isSys: true,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('content')).toBeInTheDocument();
    expect(screen.queryByText('SYS')).not.toBeInTheDocument();
  });

  it('shows ads for normal users', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'SYS',
          speakerIcon: null,
          content: 'content',
          isSys: true,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}},
    );

    expect(await screen.findByText('content')).toBeInTheDocument();
    expect(screen.getByTestId('ads-story')).toBeInTheDocument();
  });

  it('hides ads for ads-free users', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 1,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'SYS',
          speakerIcon: null,
          content: 'content',
          isSys: true,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10650503}, user: {adsFreeExpiry: new Date()}},
    );

    expect(await screen.findByText('content')).toBeInTheDocument();
    expect(screen.queryByTestId('ads-story')).not.toBeInTheDocument();
  });

  it('shows related links', async () => {
    fnGetStoryBook.mockResolvedValueOnce([
      {
        id: 107504041,
        title: 'story',
        conversations: [{
          type: 'conversation',
          speakerName: 'SYS',
          speakerIcon: null,
          content: 'content',
          isSys: true,
          audioPaths: [],
        }],
      },
    ]);

    renderReact(
      () => <UnitStory/>,
      {contextParams: {unitId: 10750404}},
    );

    expect(await screen.findByText('Analysis')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });
});
