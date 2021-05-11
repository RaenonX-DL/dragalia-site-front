import React, {Dispatch, SetStateAction} from 'react';

export type FetchStatusSimple = {
  fetched: boolean,
  fetching: boolean,
}

export type FetchStatus<D> = FetchStatusSimple & {
  data: D,
}

export const isNotFetched = <T extends FetchStatusSimple>(fetchStatus: T) => {
  return !fetchStatus.fetched && !fetchStatus.fetching;
};

export const useFetchStateProcessed = <D, R>(
  initialData: D,
  fnFetch: (callback: (data: R) => void) => Promise<R>,
  messageOnFetchFailed: string,
  fnProcessData: (response: R) => D,
): [FetchStatus<D>, Dispatch<SetStateAction<FetchStatus<D>>>, () => void] => {
  const [fetchState, setFetchState] = React.useState<FetchStatus<D>>({
    fetched: false,
    fetching: false,
    data: initialData,
  });

  const fetchFunction = () => {
    if (!isNotFetched(fetchState)) {
      return;
    }

    setFetchState({
      ...fetchState,
      fetching: true,
    });

    fnFetch((data) => {
      setFetchState({
        ...fetchState,
        fetched: true,
        fetching: false,
        data: fnProcessData(data),
      });
    })
      .catch((e) => {
        setFetchState({
          ...fetchState,
          fetched: true,
          fetching: false,
        });
        console.warn(messageOnFetchFailed, e);
      });
  };

  return [fetchState, setFetchState, fetchFunction];
};


export const useFetchState = <D>(
  initialData: D,
  fnFetch: (callback: (data: D) => void) => Promise<D>,
  messageOnFetchFailed: string,
): [FetchStatus<D>, Dispatch<SetStateAction<FetchStatus<D>>>, () => void] => {
  return useFetchStateProcessed(initialData, fnFetch, messageOnFetchFailed, (data) => data);
};
