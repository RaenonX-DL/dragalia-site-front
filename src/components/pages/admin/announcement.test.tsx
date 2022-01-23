import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {typeInput} from '../../../../test/utils/event';
import {ApiResponseCode} from '../../../api-def/api';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {AdminSendAnnouncement} from './announcement';


describe('Site announcement', () => {
  let fnSendAnnouncement: jest.SpyInstance;

  beforeEach(() => {
    fnSendAnnouncement = jest.spyOn(ApiRequestSender, 'sendSiteAnnouncement').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
      result: {accepted: [], rejected: []},
    });
  });

  it('sends website announcement', async () => {
    const {rerender} = renderReact(() => <AdminSendAnnouncement/>, {user: {isAdmin: true}});

    const titleInput = screen.getByText(translationEN.admin.announcement.title)
      .previousElementSibling as HTMLElement;
    typeInput(titleInput, 'title', {rerender});

    const contentInput = screen.getByText(translationEN.admin.announcement.content)
      .previousElementSibling as HTMLElement;
    typeInput(contentInput, 'content', {rerender});

    const sendButton = screen.getByText(translationEN.admin.announcement.send);
    userEvent.click(sendButton);

    const sendButtonModal = screen.getAllByText(translationEN.admin.announcement.send)[1];
    userEvent.click(sendButtonModal);

    expect(fnSendAnnouncement.mock.calls[0][0].title).toBe('title');
    expect(fnSendAnnouncement.mock.calls[0][0].markdown).toBe('content');
  });

  it('does not send the website announcement after cancellation', async () => {
    const {rerender} = renderReact(() => <AdminSendAnnouncement/>, {user: {isAdmin: true}});

    const titleInput = screen.getByText(translationEN.admin.announcement.title)
      .previousElementSibling as HTMLElement;
    typeInput(titleInput, 'title', {rerender});

    const contentInput = screen.getByText(translationEN.admin.announcement.content)
      .previousElementSibling as HTMLElement;
    typeInput(contentInput, 'content', {rerender});

    const sendButton = screen.getByText(translationEN.admin.announcement.send);
    userEvent.click(sendButton);

    const cancelButton = screen.getByText(translationEN.misc.cancel);
    userEvent.click(cancelButton);

    expect(fnSendAnnouncement).not.toHaveBeenCalled();
  });

  it('does not allow sending empty announcement', async () => {
    renderReact(() => <AdminSendAnnouncement/>, {user: {isAdmin: true}});

    expect(screen.getByText(translationEN.admin.announcement.send)).toBeDisabled();
  });

  it('does not allow non-admin to view', async () => {
    renderReact(() => <AdminSendAnnouncement/>);

    expect(screen.getByText(translationEN.meta.error['401'].description)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.admin.announcement.send)).not.toBeInTheDocument();
  });
});
