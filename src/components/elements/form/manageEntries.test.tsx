import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {typeInput} from '../../../../test/utils/event';
import {ApiResponseCode} from '../../../api-def/api';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {EntryManagement} from './manageEntries';


describe('Entries management', () => {
  let fnSubmitPromise: jest.Mock;

  beforeEach(() => {
    fnSubmitPromise = jest.fn().mockResolvedValue({code: ApiResponseCode.FAILED_INTERNAL_ERROR, success: false});
  });

  it('disables update if any of the entry is invalid', async () => {
    const {rerender} = renderReact(
      () => (
        <EntryManagement
          data={[{a: 7}]}
          getElementUniqueIdentifier={() => 'i'}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => false}
          generateNewElement={() => ({a: 8})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.a} onChange={(e) => onChanged('a')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const input = screen.getByDisplayValue('7');
    await typeInput(input, '8', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    expect(updateButton).toBeDisabled();
  });

  it('allows update if all entries are valid', async () => {
    const {rerender} = renderReact(
      () => (
        <EntryManagement
          data={[{a: 7}]}
          getElementUniqueIdentifier={() => 'i'}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({a: 8})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.a} onChange={(e) => onChanged('a')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const input = screen.getByDisplayValue('7');
    await typeInput(input, '8', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    await waitFor(() => expect(updateButton).toBeEnabled());
  });

  it('updates correctly', async () => {
    fnSubmitPromise.mockResolvedValueOnce({code: ApiResponseCode.SUCCESS, success: true});

    const {rerender} = renderReact(
      () => (
        <EntryManagement
          data={[{a: 7}]}
          getElementUniqueIdentifier={(element) => element.a}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({a: 8})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.a} onChange={(e) => onChanged('a')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const input = screen.getByDisplayValue('7');
    await typeInput(input, '8', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    // Correct data sent?
    await waitFor(() => expect(fnSubmitPromise).toHaveBeenCalled());
    expect(fnSubmitPromise.mock.calls[0][0]).toStrictEqual([{a: 78}]);

    // Updated marker shown?
    expect(screen.getByText('', {selector: 'i.bi-cloud-check'})).toBeInTheDocument();

    // Blocks re-update?
    expect(updateButton).toBeDisabled();
  });

  it('shows warning and does not block update on submission failed', async () => {
    const {rerender} = renderReact(
      () => (
        <EntryManagement
          data={[{a: 7}]}
          getElementUniqueIdentifier={() => 'i'}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({a: 8})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.a} onChange={(e) => onChanged('a')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    // Trigger update
    const input = screen.getByDisplayValue('7');
    await typeInput(input, '8', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    expect(await screen.findByText('', {selector: 'i.bi-exclamation-circle'})).toBeInTheDocument();
    expect(screen.getByText(new RegExp(ApiResponseCode[ApiResponseCode.FAILED_INTERNAL_ERROR]))).toBeInTheDocument();
  });

  it('disables update button on load', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[{a: 7}]}
          getElementUniqueIdentifier={() => 'i'}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({a: 8})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.a} onChange={(e) => onChanged('a')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const updateButton = await screen.findByText(translationEN.misc.update);
    expect(updateButton).toBeDisabled();
  });

  it('show limited entries only', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
          elemRenderCount={5}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const elem5 = await screen.findByDisplayValue(4);
    expect(elem5).toBeInTheDocument();

    expect(screen.queryByDisplayValue(5)).not.toBeInTheDocument();
  });

  it('shows more entries after expansion', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
          elemRenderCount={5}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const btnShowMore = await screen.findByText(translationEN.misc.showMore);
    userEvent.click(btnShowMore);

    expect(screen.queryByDisplayValue(5)).toBeInTheDocument();
  });

  it('shows all entries after expansion', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
          elemRenderCount={5}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const btnShowAll = await screen.findByText(translationEN.misc.showAll);
    userEvent.click(btnShowAll);

    expect(await screen.findByDisplayValue(49)).toBeInTheDocument();
  });

  it('submits correct data after modification without expansion', async () => {
    const {rerender} = renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
          elemRenderCount={5}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const elem5 = await screen.findByDisplayValue(4);
    typeInput(elem5, '469', {rerender});

    const updateButton = screen.getByText(translationEN.misc.update);
    userEvent.click(updateButton);

    // Correct data sent?
    await waitFor(() => expect(fnSubmitPromise).toHaveBeenCalled());
    const expectedData = [...Array(50).keys()].map((num) => ({num}));
    expectedData[4].num = 4469;
    expect(fnSubmitPromise.mock.calls[0][0]).toStrictEqual(expectedData);
  });

  it('hides button bar if `elemRenderCount` not given', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    expect(await screen.findByDisplayValue(0)).toBeInTheDocument();

    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.misc.showMore)).not.toBeInTheDocument();
  });

  it('hides button after showing all', async () => {
    renderReact(
      () => (
        <EntryManagement
          data={[...Array(50).keys()].map((num) => ({num}))}
          getElementUniqueIdentifier={(elem) => elem.num}
          getSubmitPromise={fnSubmitPromise}
          isEntryValid={() => true}
          generateNewElement={() => ({num: 100})}
          renderEntries={(element, onChanged) => (
            <input type="number" value={element.num} onChange={(e) => onChanged('num')(+e.target.value)}/>
          )}
          elemRenderCount={5}
        />
      ),
      {hasSession: true, user: {isAdmin: true}},
    );

    const btnShowAll = await screen.findByText(translationEN.misc.showAll);
    userEvent.click(btnShowAll);

    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.misc.showMore)).not.toBeInTheDocument();
  });
});
