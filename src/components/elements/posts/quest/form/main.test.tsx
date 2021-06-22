import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {typeInput} from '../../../../../../test/utils/event';
import {
  ApiResponseCode,
  QuestPostEditPayload,
  QuestPostEditResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {makePostPath} from '../../../../../utils/path/make';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm, QuestPostWriteResponse} from './main';


describe('Quest form (New/Edit)', () => {
  let fnSendRequest: jest.Mock<Promise<QuestPostWriteResponse>, [QuestPostEditPayload]>;
  const response: QuestPostEditResponse = {
    code: ApiResponseCode.SUCCESS,
    success: true,
    seqId: 1,
  };
  let formState: PostFormState<QuestPostEditPayload>;
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
        general: 'gen',
        video: 'vid',
        positional: [
          {
            position: 'pos',
            rotations: 'rot',
            builds: 'bld',
            tips: 'tps',
          },
        ],
        addendum: 'adm',
        editNote: 'edn',
      },
    };
    fnSendRequest = jest.fn().mockImplementation(async () => response);
    setFormState = jest.fn().mockImplementation((newState: PostFormState<QuestPostEditPayload>) => {
      formState = newState;
    });
    jest.spyOn(ApiRequestSender, 'questIdCheck').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      available: true,
    });
  });

  it('loads correctly', async () => {
    const {container} = renderReact(
      () => (
        <QuestPostForm
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
    expect(container).toHaveTextContent(payload.general);
    expect(container).toHaveTextContent(payload.video);
    expect(container).toHaveTextContent(payload.positional[0].position);
    expect(container).toHaveTextContent(payload.positional[0].rotations);
    expect(container).toHaveTextContent(payload.positional[0].builds);
    expect(container).toHaveTextContent(payload.positional[0].tips);
    expect(container).toHaveTextContent(payload.addendum);
  });

  it('changes title', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
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

  it('changes general info', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    typeInput(generalInfoField, 'General', {clear: true, rerender});

    expect(screen.getByText('General', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('changes video section', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    typeInput(videoField, 'Video', {clear: true, rerender});

    expect(screen.getByText('Video', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('changes positional info', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    typeInput(posField, 'Position', {clear: true, rerender});
    expect(screen.getByDisplayValue('Position')).toBeInTheDocument();

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    typeInput(tipsField, 'Tips', {clear: true, rerender});
    expect(screen.getByText('Tips', {selector: 'textarea'})).toBeInTheDocument();

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    typeInput(buildField, 'Builds', {clear: true, rerender});
    expect(screen.getByText('Builds', {selector: 'textarea'})).toBeInTheDocument();

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    typeInput(rotationsField, 'Rotations', {clear: true, rerender});
    expect(screen.getByText('Rotations', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('adds positional info', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const addButton = screen.getByText(translationEN.misc.add);
    userEvent.click(addButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(2);
  });

  it('removes positional info if > 1', async () => {
    const newFormState = {...formState};

    newFormState.payload.positional = [
      {
        position: 'pos',
        rotations: 'rot',
        builds: 'bld',
        tips: 'tps',
      },
      {
        position: 'pos2',
        rotations: 'rot2',
        builds: 'bld2',
        tips: 'tps2',
      },
    ];

    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const removeButton = screen.getByText(translationEN.misc.remove);
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
  });

  it('cannot remove positional info if < 1', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const removeButton = screen.getByText(translationEN.misc.remove);
    userEvent.click(removeButton);
    rerender();

    expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
  });

  it('changes addendum', async () => {
    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    typeInput(addendumField, 'Addendum', {clear: true, rerender});

    expect(screen.getByText('Addendum', {selector: 'textarea'})).toBeInTheDocument();
  });

  it('submits correct payload after edit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      ),
      {user: {isAdmin: true}},
    );

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    typeInput(generalInfoField, 'General', {clear: true, rerender});

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    typeInput(videoField, 'Video', {clear: true, rerender});

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    typeInput(posField, 'Position', {clear: true, rerender});

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    typeInput(tipsField, 'Tips', {clear: true, rerender});

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    typeInput(buildField, 'Builds', {clear: true, rerender});

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    typeInput(rotationsField, 'Rotations', {clear: true, rerender});

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    typeInput(addendumField, 'Addendum', {clear: true, rerender});

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    userEvent.click(submitButton);
    rerender();

    await waitFor(() => expect(fnSendRequest).toHaveBeenCalledTimes(1));
    expect(fnSendRequest).toHaveBeenCalledWith({
      ...formState.payload,
      general: 'General',
      video: 'Video',
      positional: [
        {
          position: 'Position',
          tips: 'Tips',
          builds: 'Builds',
          rotations: 'Rotations',
        },
      ],
      addendum: 'Addendum',
    });
  });

  it('redirects to correct location on submit', async () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = {assign: jest.fn()};

    const {rerender} = renderReact(
      () => (
        <QuestPostForm
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

    const expectedPostPath = makePostPath(
      PostPath.QUEST,
      {pid: response.seqId, lang: SupportedLanguages.EN},
    );
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(expectedPostPath));
    expect(window.location.assign).not.toHaveBeenCalledTimes(2);
  });

  it('transforms quick references in the payload', async () => {
    const originalText = 'Quest #Q3';
    const transformedText = `Quest [${translationEN.posts.quest.titleSelf} #3]` +
      `(${makePostPath(PostPath.QUEST, {pid: 3, lang: SupportedLanguages.EN})})`;

    formState.payload = {
      uid: formState.payload.uid,
      lang: formState.payload.lang,
      seqId: response.seqId,
      title: originalText,
      general: originalText,
      video: originalText,
      positional: [
        {
          position: originalText,
          rotations: originalText,
          builds: originalText,
          tips: originalText,
        },
      ],
      addendum: originalText,
      editNote: originalText,
    };

    renderReact(
      () => (
        <QuestPostForm
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
      general: transformedText,
      video: transformedText,
      positional: [
        {
          position: originalText,
          rotations: transformedText,
          builds: transformedText,
          tips: transformedText,
        },
      ],
      addendum: transformedText,
      editNote: originalText,
    });
  });

  it('blocks access from non-admin user', async () => {
    renderReact(
      () => (
        <QuestPostForm
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
});
