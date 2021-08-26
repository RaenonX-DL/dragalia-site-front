import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {UnitType} from '../../../../../api-def/api';
import {translation as translationEN} from '../../../../../i18n/translations/en/translation';
import {UnitSearcher} from './main';


describe('Unit searcher', () => {
  let fnRenderOutput: jest.Mock;
  let fnGenerateInputData: jest.Mock;

  beforeEach(() => {
    fnRenderOutput = jest.fn();
    fnGenerateInputData = jest.fn().mockReturnValue({
      keyword: '',
      type: UnitType.CHARACTER,
      elements: [],
      weaponTypes: [],
      sortBy: 'unitId',
    });
  });

  it('truncates unit info to show', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={3}
      />
    ));

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    await waitFor(() => expect(fnRenderOutput.mock.calls[0][0].processedUnitInfo).toHaveLength(3));
  });

  it('hides buttons if the result count does not reach the limit', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={-1}
      />
    ));

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    await waitFor(() => expect(fnRenderOutput).toHaveBeenCalled());
    expect(screen.queryByText(translationEN.misc.showMore)).not.toBeInTheDocument();
    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
  });

  it('shows more results', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={3}
      />
    ));

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    const showMoreButton = await screen.findByText(translationEN.misc.showMore);
    userEvent.click(showMoreButton);

    await waitFor(() => expect(fnRenderOutput).toHaveBeenCalled());
    expect(fnRenderOutput.mock.calls[2][0].processedUnitInfo).toHaveLength(6);
  });

  it('shows all results', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={3}
      />
    ));

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    const showAllButton = await screen.findByText(translationEN.misc.showAll);
    userEvent.click(showAllButton);

    await waitFor(() => expect(fnRenderOutput).toHaveBeenCalled());
    expect(fnRenderOutput.mock.calls[2][0].processedUnitInfo.length).toBeGreaterThan(3);
  });

  it('hides buttons when there are no more results to display', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={3}
      />
    ));

    const searchButton = await screen.findByText(translationEN.misc.search, {selector: 'button:enabled'});
    userEvent.click(searchButton);

    const showAllButton = await screen.findByText(translationEN.misc.showAll);
    userEvent.click(showAllButton);

    await waitFor(() => expect(fnRenderOutput).toHaveBeenCalledTimes(3));
    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
  });

  it('resets result count after re-search', async () => {
    renderReact(() => (
      <UnitSearcher
        sortOrderNames={{unitId: () => 'Unit ID'}}
        generateInputData={fnGenerateInputData}
        renderOutput={fnRenderOutput}
        renderCount={3}
      />
    ));

    // Select wind element
    const windElemIcon = await screen.findByAltText('Wind');
    userEvent.click(windElemIcon);

    // Perform search
    const searchButton = screen.getByText(translationEN.misc.search);
    userEvent.click(searchButton);

    // Show all results (should raise result count)
    const showAllButton = await screen.findByText(translationEN.misc.showAll);
    userEvent.click(showAllButton);

    // Select light element and deselect wind element
    const lightElemIcon = screen.getByAltText('Light');
    userEvent.click(windElemIcon);
    userEvent.click(lightElemIcon);

    // Perform search
    userEvent.click(searchButton);

    // Should only have 50 results
    expect(fnRenderOutput.mock.calls[0][0].processedUnitInfo).toHaveLength(3);
    expect(screen.queryByText(translationEN.misc.showAll)).toBeInTheDocument();
  });
});
