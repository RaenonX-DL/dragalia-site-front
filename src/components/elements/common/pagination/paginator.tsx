import React from 'react';

import {useRouter} from 'next/router';
import {Pagination} from 'react-bootstrap';

import {PaginationState, SpecialKey} from './types';
import {getValidNewPage} from './utils';


type PaginatorProps = {
  state: PaginationState,
  path: string,
  // `page` is 1-index.
  onPageClick: (page: number) => void,
  // `page` is 1-index. This should exclude `?` in the URL.
  getNewQueryParam: (page: number) => string,
  disable?: boolean
}

// FIXME: check if paginator is behaving correctly
export const Paginator = ({
  state,
  path,
  onPageClick,
  getNewQueryParam,
  disable = false,
}: PaginatorProps) => {
  // TEST: Paginator
  //  - Disable on no item
  //  - Special keys available and behaving correctly
  //  - Page number shown is correct

  const router = useRouter();

  const changePage = (newPage: number) => () => {
    newPage = getValidNewPage(newPage, state.currentPage, state.maxPage);

    // Prevent duplicated action if the page is unchanged
    if (newPage === state.currentPage) {
      return;
    }

    // Call page click event
    onPageClick(newPage);

    // Update history
    router
      .push(
        {
          pathname: path,
          search: getNewQueryParam(newPage),
        },
        undefined,
        {
          shallow: true,
        },
      )
      .then(() => void 0);
  };

  return (
    <Pagination>
      <Pagination.First
        disabled={disable}
        onClick={changePage(SpecialKey.FIRST)}
      />
      <Pagination.Prev
        disabled={disable}
        onClick={changePage(SpecialKey.PREV)}
      />
      {
        [
          state.currentPage - 2,
          state.currentPage - 1,
          state.currentPage,
          state.currentPage + 1,
          state.currentPage + 2,
        ]
          .filter((n) => n > 0 && (state.maxPage > 0 ? n <= state.maxPage : true))
          .map((i) => (
            <Pagination.Item
              key={i}
              active={state.currentPage === i}
              disabled={disable}
              onClick={changePage(i)}
            >
              {i}
            </Pagination.Item>
          ))
      }
      <Pagination.Next
        disabled={disable}
        onClick={changePage(SpecialKey.NEXT)}
      />
      <Pagination.Last
        disabled={disable || state.maxPage <= 0}
        onClick={changePage(SpecialKey.LAST)}
      />
    </Pagination>
  );
};
