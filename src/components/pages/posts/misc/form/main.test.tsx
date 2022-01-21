import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  ApiResponseCode,
  MiscPostEditPayload,
  MiscPostEditResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {makePostUrl, PostPath} from '../../../../../api-def/paths';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../../elements/posts/form/types';
import {MiscPostForm, MiscPostWriteResponse} from './main';


describe('Misc form (New/Edit)', () => {
  let fnSendRequest: jest.Mock<Promise<MiscPostWriteResponse>, [MiscPostEditPayload]>;
  const response: MiscPostEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 1,
    emailResult: {accepted: [], rejected: []},
  };
  let formState: PostFormState<MiscPostEditPayload>;
  let setFormState: jest.Mock;

  beforeEach(() => {
    formState = {
      isIdAvailable: true,
      isPreloaded: true,
      payload: {
        seqId: response.seqId,
        uid: 'googleUid',
        lang: SupportedLanguages.CHT,
        title: 'ttl',
        sections: [{title: 'A', content: 'B'}],
        editNote: '',
        sendUpdateEmail: true,
      },
    };
    fnSendRequest = jest.fn().mockImplementation(async () => response);
    setFormState = jest.fn().mockImplementation((newState: PostFormState<MiscPostEditPayload>) => {
      formState = newState;
    });
    jest.spyOn(ApiRequestSender, 'miscIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  it('loads correctly', async () => {
    const {container} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const payload = formState.payload;

    expect(screen.getByDisplayValue(payload.seqId)).toBeInTheDocument();
    expect(container).toHaveTextContent(SupportedLanguageNames[payload.lang]);
    expect(screen.getByDisplayValue(payload.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(payload.sections[0].title)).toBeInTheDocument();
    expect(container).toHaveTextContent(payload.sections[0].content);
  });

  it('changes title', async () => {
    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const titleField = screen.getByDisplayValue(formState.payload.title);
    typeInput(titleField, 'Title', {clear: true, rerender});

    expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
  });

  it('changes section content', async () => {
    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const sectionContent = screen.getByText(formState.payload.sections[0].content, {selector: 'textarea'});
    typeInput(sectionContent, 'General', {clear: true, rerender});

    expect(screen.getByText('General', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('removes section info if > 1', async () => {
    const newFormState = {...formState};

    newFormState.payload.sections = [
      {title: 'A', content: 'A1'},
      {title: 'B', content: 'B1'},
    ];

    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const removeButton = screen.getAllByText('', {selector: 'i.bi-x-lg'})[0];
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.misc.section.content, {selector: 'label'}).length).toBe(1);
  });

  it('cannot remove positional info if < 1', async () => {
    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const removeButton = screen.getByText('', {selector: 'i.bi-x-lg'});
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.misc.section.content, {selector: 'label'}).length).toBe(1);
  });

  it('submits correct payload after edit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const generalInfoField = screen.getByText(formState.payload.sections[0].content, {selector: 'textarea'});
    typeInput(generalInfoField, 'General', {clear: true, rerender});

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(submitButton);
    rerender();

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalledTimes(1));
    expect(fnSendRequest).toHaveBeenCalledWith({
      ...formState.payload,
      sections: [{title: 'A', content: 'General'}],
    });
  });

  it('redirects to correct location on submit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(submitButton);
    rerender();

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalledTimes(1));

    const expectedPostPath = makePostUrl(
      PostPath.MISC,
      {pid: response.seqId, lang: SupportedLanguages.EN},
    );
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(expectedPostPath));
    expect(window.location.assign).not.toHaveBeenCalledTimes(2);
  });

  it('transforms quick references in the payload', async () => {
    const originalText = 'Misc #M3';
    const transformedText = `Misc [${translationEN.posts.misc.titleSelf} #3]` +
      `(${makePostUrl(PostPath.MISC, {pid: 3, lang: SupportedLanguages.EN})})`;

    formState.payload = {
      uid: formState.payload.uid,
      lang: formState.payload.lang,
      seqId: response.seqId,
      title: originalText,
      sections: [{title: originalText, content: originalText}],
      editNote: originalText,
      sendUpdateEmail: true,
    };

    renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const editButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(editButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest).toHaveBeenCalledWith({
      uid: formState.payload.uid,
      lang: formState.payload.lang,
      seqId: response.seqId,
      title: originalText,
      sections: [{title: originalText, content: transformedText}],
      editNote: originalText,
      sendUpdateEmail: true,
    });
  });

  it('blocks access from non-admin user', async () => {
    renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: false}},
    );

    expect(screen.queryByText(translationEN.posts.manage.edit)).not.toBeInTheDocument();
    expect(screen.getByText(translationEN.meta.error['401'].description)).toBeInTheDocument();
  });

  it('sends update email on publish', async () => {
    renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={{...formState, isPreloaded: false}}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const publishButton = await screen.findByText(translationEN.posts.manage.publish, {selector: 'button:enabled'});
    userEvent.click(publishButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });

  it('does not send update email on publish', async () => {
    renderReact(
      () => (
        <MiscPostForm
          fnSendRequest={fnSendRequest}
          formState={{...formState, isPreloaded: false}}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const editNote = screen.getByText(translationEN.posts.manage.sendUpdateEmail);
    userEvent.click(editNote.previousSibling as Element);

    const publishButton = await screen.findByText(translationEN.posts.manage.publish, {selector: 'button:enabled'});
    userEvent.click(publishButton);

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalled());
    expect(fnSendRequest.mock.calls[0][0].sendUpdateEmail).toBeTruthy();
  });
});
