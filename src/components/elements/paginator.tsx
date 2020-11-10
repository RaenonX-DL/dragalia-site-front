import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {Pagination} from 'react-bootstrap';


type PaginatorParams = {
  path: string,
  onPageClick: (page: number) => void,
  queryParamGenerator: (page: number) => string, // page starts from 1, excludes '?'
  initPage?: number,
  maxPage?: number,
  disable?: boolean
}

export const Paginator = (params: PaginatorParams) => {
  const {path, onPageClick, queryParamGenerator, initPage, maxPage, disable = false} = params;

  const [page, setPage] = useState(initPage || 1);

  const history = useHistory();

  const changePage = (e) => {
    // Early termination on some unknown event that causes `e.target` to `undefined`
    if (e.target.text === undefined) {
      return;
    }

    const pageText: string = e.target.text.toLowerCase();
    let newPage;

    if (pageText.includes('first')) {
      newPage = 1;
    } else if (pageText.includes('previous')) {
      newPage = Math.max(1, page - 1);
    } else if (pageText.includes('next')) {
      newPage = maxPage ? Math.min(maxPage, page + 1) : page + 1;
    } else if (maxPage && pageText.includes('last')) {
      newPage = maxPage;
    } else {
      newPage = parseInt(pageText);
    }

    // Prevent duplicative action if the page is basically unchanged
    if (newPage === page) {
      return;
    }

    history.push({
      pathname: path,
      search: queryParamGenerator(newPage),
    });
    onPageClick(newPage);
    setPage(newPage);
  };

  return (
    <Pagination onClick={changePage}>
      <Pagination.First disabled={disable}/>
      <Pagination.Prev disabled={disable}/>
      {
        [page - 2, page - 1, page, page + 1, page + 2]
          .filter((n) => n > 0 && (maxPage !== undefined ? n <= maxPage : true))
          .map((i) => <Pagination.Item key={i} active={page === i} disabled={disable}>{i}</Pagination.Item>)
      }
      <Pagination.Next disabled={disable}/>
      {maxPage && <Pagination.Last disabled={disable}/>}
    </Pagination>
  );
};
