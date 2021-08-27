import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {ApiResponseCode, BaseResponse} from '../../../../api-def/api';
import {AjaxForm} from './main';


describe('Ajax Form', () => {
  let fnSubmitPromise: jest.Mock<Promise<BaseResponse>>;
  let fnOnSubmitSuccess: jest.Mock;

  beforeEach(() => {
    fnSubmitPromise = jest.fn().mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    });
    fnOnSubmitSuccess = jest.fn();
  });

  it('redirects on submission success', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
        getRedirectUrlOnSuccess={() => 'url'}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith('url'));
  });

  it('does not redirect on success if not specified', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(window.location.assign).not.toHaveBeenCalled());
  });

  it('triggers `onSuccess`', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(fnOnSubmitSuccess).toHaveBeenCalled());
    expect(fnOnSubmitSuccess).toHaveBeenCalledWith(ApiResponseCode.SUCCESS);
  });

  it('uses submission promise', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(fnSubmitPromise).toHaveBeenCalled());
  });

  it('styles submit button correctly', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: true,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toHaveClass('btn-primary');
    expect(submitButton).toBeDisabled();
  });

  it('renders additional things besides the submit button', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: true,
          submitText: 'Submit',
          renderAtLeft: <>Left</>,
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    expect(screen.getByText('Left')).toBeInTheDocument();
  });

  it('renders correctly', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: true,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        Form
      </AjaxForm>
    ));

    expect(screen.getByText('Form')).toBeInTheDocument();
  });

  it('shows loading upon submission', async () => {
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    expect(await screen.findByText('', {selector: 'div.spinner-grow'})).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows error message upon submission failed', async () => {
    fnSubmitPromise = jest.fn().mockResolvedValue({
      code: ApiResponseCode.FAILED_INTERNAL_ERROR,
      success: false,
    });
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    expect(await screen.findByText('FAILED_INTERNAL_ERROR')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('triggers pre-submit', async () => {
    const fnPreSubmit = jest.fn();

    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
        onPreSubmit={fnPreSubmit}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(fnPreSubmit).toHaveBeenCalled());
  });

  it('does not execute the promise if pre-submit fails', async () => {
    const fnPreSubmit = jest.fn().mockReturnValue(false);

    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
        onPreSubmit={fnPreSubmit}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(fnPreSubmit).toHaveBeenCalled());
    expect(fnOnSubmitSuccess).not.toHaveBeenCalled();
  });

  it('triggers `onFailed` and does not show modal if specified', async () => {
    const fnOnFailed = jest.fn();

    fnSubmitPromise = jest.fn().mockResolvedValue({
      code: ApiResponseCode.FAILED_DATA_NOT_EXISTS,
      success: false,
    });
    renderReact(() => (
      <AjaxForm
        unloadDependencies={[]}
        submitPromise={fnSubmitPromise}
        formControl={{
          variant: 'primary',
          loading: false,
          submitText: 'Submit',
        }}
        onSuccess={fnOnSubmitSuccess}
        onFailed={fnOnFailed}
      >
        <></>
      </AjaxForm>
    ));

    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await waitFor(() => expect(fnOnFailed).toHaveBeenCalledWith(ApiResponseCode.FAILED_DATA_NOT_EXISTS));
    expect(screen.queryByText('FAILED_INTERNAL_ERROR')).not.toBeInTheDocument();
  });
});
