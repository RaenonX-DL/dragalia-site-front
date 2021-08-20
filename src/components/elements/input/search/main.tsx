import React from 'react';

import {Property} from 'csstype';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../i18n/hook';
import {SearchResults} from './results';


type Props<E> = {
  options: Array<E>
  isOptionMatchSearch: (option: E, searchTextLowered: string) => boolean,
  renderMatchedSelection: (option: E) => React.ReactNode,
  height?: Property.Height,
}

export const Search = <E, >({
  options,
  isOptionMatchSearch,
  renderMatchedSelection,
  height,
}: Props<E>) => {
  const {t} = useI18n();
  const [searchText, setSearchText] = React.useState('');

  let matchedOptions = options;

  // `toLowerCase()` is faster than `match()`
  const searchTextLowered = searchText.toLowerCase();
  if (!!searchText) {
    matchedOptions = options.filter((option) => isOptionMatchSearch(option, searchTextLowered));
  }

  return (
    <>
      <Form.Control
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t((t) => t.autoComplete.inputPlaceholder)}
      />
      <SearchResults results={matchedOptions} renderEntry={renderMatchedSelection} height={height}/>
    </>
  );
};
