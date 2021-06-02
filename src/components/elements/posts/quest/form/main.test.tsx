import React from 'react';

import {act, fireEvent, screen, waitFor} from '@testing-library/react';
import {Route} from 'react-router-dom';

import {renderReact} from '../../../../../../test/render/main';
import {
  ApiResponseCode,
  QuestPostEditPayload,
  QuestPostEditResponse,
  SupportedLanguageNames,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {CookiesControl} from '../../../../../utils/cookies';
import {makePostPath} from '../../../../../utils/path/make';
import {PostFormState} from '../../shared/form/types';
import {QuestPostForm, QuestPostWriteResponse} from './main';

describe('Main quest form', () => {
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
        googleUid: 'googleUid',
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
    jest.spyOn(CookiesControl, 'getGoogleUid').mockImplementation(() => formState.payload.googleUid);
  });

  it('loads the data correctly', async () => {
    const {container} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

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

  it('can change title', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const titleField = screen.getByDisplayValue(formState.payload.title);
    fireEvent.change(titleField, {target: {value: 'Title'}});
    rerender();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Title')).toBeInTheDocument();
    });
  });

  it('can change general info', async () => {
    renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    fireEvent.change(generalInfoField, {target: {value: 'General'}});

    await waitFor(() => {
      expect(screen.getByText('General', {selector: 'textarea'})).toBeInTheDocument();
    });
  });

  it('can change video section', async () => {
    renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    fireEvent.change(videoField, {target: {value: 'Video'}});

    await waitFor(() => {
      expect(screen.getByText('Video', {selector: 'textarea'})).toBeInTheDocument();
    });
  });

  it('can change positional info', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    fireEvent.change(posField, {target: {value: 'Position'}});
    rerender();
    await waitFor(() => {
      expect(screen.getByDisplayValue('Position')).toBeInTheDocument();
    });

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    fireEvent.change(tipsField, {target: {value: 'Tips'}});
    rerender();
    await waitFor(() => {
      expect(screen.getByText('Tips', {selector: 'textarea'})).toBeInTheDocument();
    });

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    fireEvent.change(buildField, {target: {value: 'Builds'}});
    rerender();
    await waitFor(() => {
      expect(screen.getByText('Builds', {selector: 'textarea'})).toBeInTheDocument();
    });

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    fireEvent.change(rotationsField, {target: {value: 'Rotations'}});
    rerender();
    await waitFor(() => {
      expect(screen.getByText('Rotations', {selector: 'textarea'})).toBeInTheDocument();
    });
  });

  it('can add positional info', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const addButton = screen.getByText(translationEN.misc.add);
    act(() => {
      fireEvent.click(addButton);
    });
    rerender();

    await waitFor(() => {
      expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(2);
    });
  });

  it('can remove positional info if > 1', async () => {
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

    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const removeButton = screen.getByText(translationEN.misc.remove);
    act(() => {
      fireEvent.click(removeButton);
    });
    rerender();

    await waitFor(() => {
      expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
    });
  });

  it('cannot remove positional info if < 1', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const removeButton = screen.getByText(translationEN.misc.remove);
    act(() => {
      fireEvent.click(removeButton);
    });
    rerender();

    await waitFor(() => {
      expect(screen.getAllByText(translationEN.posts.quest.builds, {selector: 'label'}).length).toBe(1);
    });
  });

  it('can change addendum', async () => {
    renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    fireEvent.change(addendumField, {target: {value: 'Addendum'}});

    await waitFor(() => {
      expect(screen.getByText('Addendum', {selector: 'textarea'})).toBeInTheDocument();
    });
  });

  it('submits correct payload after edit', async () => {
    const {rerender} = renderReact(() => (
      <QuestPostForm
        fnSendRequest={fnSendRequest}
        formState={formState}
        setFormState={setFormState}
      />
    ));

    const generalInfoField = screen.getByText(formState.payload.general, {selector: 'textarea'});
    act(() => {
      fireEvent.change(generalInfoField, {target: {value: 'General'}});
    });
    rerender();

    const videoField = screen.getByText(formState.payload.video, {selector: 'textarea'});
    act(() => {
      fireEvent.change(videoField, {target: {value: 'Video'}});
    });
    rerender();

    const posField = screen.getByDisplayValue(formState.payload.positional[0].position);
    act(() => {
      fireEvent.change(posField, {target: {value: 'Position'}});
    });
    rerender();

    const tipsField = screen.getByText(formState.payload.positional[0].tips, {selector: 'textarea'});
    act(() => {
      fireEvent.change(tipsField, {target: {value: 'Tips'}});
    });
    rerender();

    const buildField = screen.getByText(formState.payload.positional[0].builds, {selector: 'textarea'});
    act(() => {
      fireEvent.change(buildField, {target: {value: 'Builds'}});
    });
    rerender();

    const rotationsField = screen.getByText(formState.payload.positional[0].rotations, {selector: 'textarea'});
    act(() => {
      fireEvent.change(rotationsField, {target: {value: 'Rotations'}});
    });
    rerender();

    const addendumField = screen.getByText(formState.payload.addendum, {selector: 'textarea'});
    act(() => {
      fireEvent.change(addendumField, {target: {value: 'Addendum'}});
    });
    rerender();

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    act(() => {
      fireEvent.click(submitButton);
    });
    rerender();

    screen.debug();

    expect(fnSendRequest).toHaveBeenCalledTimes(1);
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
    const {history, rerender} = renderReact(() => (
      <Route>
        <QuestPostForm
          fnSendRequest={fnSendRequest}
          formState={formState}
          setFormState={setFormState}
        />
      </Route>
    ));

    const submitButton = screen.getByText(translationEN.posts.manage.edit);
    act(() => {
      fireEvent.click(submitButton);
    });
    rerender();

    expect(fnSendRequest).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(history.location.pathname)
        .toBe(makePostPath(PostPath.QUEST, {pid: response.seqId, lang: SupportedLanguages.EN}));
    });
  });
});
