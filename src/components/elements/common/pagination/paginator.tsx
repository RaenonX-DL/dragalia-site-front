import React from 'react';

import {Pagination} from 'react-bootstrap';
import {useHistory} from 'react-router';

import {scrollToTop} from '../../../../utils/misc';
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

export const Paginator = ({
  state,
  path,
  onPageClick,
  getNewQueryParam,
  disable = false,
}: PaginatorProps) => {
  const history = useHistory();

  const changePage = (e: React.MouseEvent<HTMLElement>) => {
    // Get target page
    const targetPageStr = e.currentTarget.getAttribute('key');
    if (!targetPageStr) {
      return;
    }

    const newPage = getValidNewPage(Number(targetPageStr), state.currentPage, state.maxPage);

    // Prevent duplicated action if the page is unchanged
    if (newPage === state.currentPage) {
      return;
    }

    // Update history
    history.push({
      pathname: path,
      search: getNewQueryParam(newPage),
    });

    // Call page lick event
    onPageClick(newPage);

    // Scroll to top after changing the page
    scrollToTop();
  };

  return (
    <Pagination>
      <Pagination.First
        key={SpecialKey.FIRST}
        disabled={disable}
        onClick={changePage}
      />
      <Pagination.Prev
        key={SpecialKey.PREV}
        disabled={disable}
        onClick={changePage}
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
              onClick={changePage}
            >
              {i}
            </Pagination.Item>
          ))
      }
      <Pagination.Next
        key={SpecialKey.NEXT}
        disabled={disable}
        onClick={changePage}
      />
      <Pagination.Last
        key={SpecialKey.LAST}
        disabled={disable || state.maxPage <= 0}
        onClick={changePage}
      />
    </Pagination>
  );
};
