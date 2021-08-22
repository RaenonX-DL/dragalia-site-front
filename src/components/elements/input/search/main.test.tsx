import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {Search} from './main';


describe('Search input', () => {
  const SearchWrapper = () => (
    <Search
      options={['option 1', 'option 2']}
      isOptionMatchSearch={(option, searchTextLowered) => option === searchTextLowered}
      renderMatchedSelection={(option) => <span>{option}</span>}
    />
  );

  it('shows no result if no matching options', async () => {
    const {rerender} = renderReact(() => <SearchWrapper/>);

    const keywordInput = screen.getByPlaceholderText(/Enter keyword/);
    typeInput(keywordInput, 'Keyword', {rerender});

    expect(screen.getByText(translationEN.autoComplete.noMatchingOptions)).toBeInTheDocument();
  });

  it('shows all options on load', async () => {
    renderReact(() => <SearchWrapper/>);

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('shows all options after clearing input', async () => {
    const {rerender} = renderReact(() => <SearchWrapper/>);

    const keywordInput = screen.getByPlaceholderText(/Enter keyword/);
    typeInput(keywordInput, 'Keyword', {rerender});
    userEvent.clear(keywordInput);
    rerender();

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });
});
