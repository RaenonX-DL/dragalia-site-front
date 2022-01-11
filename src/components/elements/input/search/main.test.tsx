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
      isOptionMatchSearch={(option, searchText) => option === searchText}
      renderMatchedSelection={(option) => <span>{option}</span>}
    />
  );

  it('shows no result if no matching options', async () => {
    const {rerender} = renderReact(() => <SearchWrapper/>);

    const keywordInput = screen.getByText(/Enter keyword/);
    typeInput(keywordInput.previousSibling as Element, 'Keyword', {rerender});

    expect(screen.getByText(translationEN.autoComplete.noMatchingOptions)).toBeInTheDocument();
  });

  it('shows all options on load', async () => {
    renderReact(() => <SearchWrapper/>);

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('shows all options after clearing input', async () => {
    const {rerender} = renderReact(() => <SearchWrapper/>);

    const keywordInput = screen.getByText(/Enter keyword/);
    typeInput(keywordInput.previousSibling as Element, 'Keyword', {rerender});
    userEvent.clear(keywordInput.previousSibling as Element);
    rerender();

    expect(screen.getByText('option 1')).toBeInTheDocument();
    expect(screen.getByText('option 2')).toBeInTheDocument();
  });

  it('searches in CHS', async () => {
    const {rerender} = renderReact(() => (
      <Search
        options={['漢字']}
        isOptionMatchSearch={(option, searchText) => option === searchText}
        renderMatchedSelection={(option) => <span>{option}</span>}
      />
    ));

    const keywordInput = screen.getByText(/Enter keyword/);
    typeInput(keywordInput.previousSibling as Element, '汉字', {rerender});
    userEvent.clear(keywordInput.previousSibling as Element);
    rerender();

    expect(screen.getByText('漢字')).toBeInTheDocument();
  });
});
