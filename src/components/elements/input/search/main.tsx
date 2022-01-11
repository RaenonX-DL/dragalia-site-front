import React from 'react';

import {Property} from 'csstype';

import {useI18n} from '../../../../i18n/hook';
import {transformForSearch} from '../../../../utils/text';
import {FloatingInput} from '../../form/control/floating/input';
import {SearchResults} from './results';


type Props<E> = {
  options: Array<E>
  isOptionMatchSearch: (option: E, searchTextTransformed: string) => boolean,
  renderMatchedSelection: (option: E) => React.ReactNode,
  height?: Property.Height,
};

export const Search = <E, >({
  options,
  isOptionMatchSearch,
  renderMatchedSelection,
  height,
}: Props<E>) => {
  const {t} = useI18n();
  const [searchText, setSearchText] = React.useState('');

  let matchedOptions = options;

  const searchTextTransformed = transformForSearch(searchText);
  if (!!searchText) {
    matchedOptions = options.filter((option) => isOptionMatchSearch(option, searchTextTransformed));
  }

  return (
    <>
      <FloatingInput
        label={t((t) => t.autoComplete.inputPlaceholder)}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <SearchResults results={matchedOptions} renderEntry={renderMatchedSelection} height={height}/>
    </>
  );
};
