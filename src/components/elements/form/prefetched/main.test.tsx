import React from 'react';

import {screen, waitFor} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {ApiResponseCode} from '../../../../api-def/api';
import {PrefetchedForm} from './main';


describe('Prefetch post form', () => {
  let fnFetch: jest.Mock;
  let fnRender: jest.Mock;

  beforeEach(() => {
    fnFetch = jest.fn().mockImplementation(async () => {
      // Simulate network lag
      await new Promise((r) => setTimeout(r, 50));

      return {
        code: ApiResponseCode.NOT_EXECUTED,
        success: false,
      };
    });
    fnRender = jest.fn();
  });

  it('fetches on load', async () => {
    renderReact(() => <PrefetchedForm fnFetch={fnFetch} renderOnSuccess={fnRender}/>);

    await waitFor(() => expect(fnFetch).toHaveBeenCalled());
  });

  it('shows loading when fetching', async () => {
    renderReact(() => <PrefetchedForm fnFetch={fnFetch} renderOnSuccess={fnRender}/>);

    expect(await screen.findByText('', {selector: 'div.spinner-grow'})).toBeInTheDocument();
  });

  it('shows 404 if post not found', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_POST_NOT_EXISTS,
      success: false,
    });

    renderReact(() => <PrefetchedForm fnFetch={fnFetch} renderOnSuccess={fnRender}/>);

    expect(await screen.findByText(/not exist/)).toBeInTheDocument();
  });

  it('shows api response code name on error', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    });

    renderReact(() => <PrefetchedForm fnFetch={fnFetch} renderOnSuccess={fnRender}/>);

    expect(await screen.findByText(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR])).toBeInTheDocument();
  });

  it('renders on success', async () => {
    fnFetch.mockResolvedValueOnce({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });

    renderReact(() => <PrefetchedForm fnFetch={fnFetch} renderOnSuccess={fnRender}/>);

    await waitFor(() => expect(fnRender).toHaveBeenCalled());
  });
});
