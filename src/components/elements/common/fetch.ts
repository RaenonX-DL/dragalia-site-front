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

type FetchStateReturns<D> = {
  fetchStatus: FetchStatus<D>,
  fetchFunction: () => void,
  setFetchStatus: Dispatch<SetStateAction<FetchStatus<D>>>,
}

export const useFetchStateProcessed = <D, R>(
  initialData: D,
  fnFetch: (callback?: (data: R) => void) => Promise<R>,
  messageOnFetchFailed: string,
  fnProcessData: (response: R) => D,
): FetchStateReturns<D> => {
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus<D>>({
    fetched: false,
    fetching: false,
    data: initialData,
  });

  const fetchFunction = () => {
    if (!isNotFetched(fetchStatus)) {
      return;
    }

    setFetchStatus({
      ...fetchStatus,
      fetching: true,
    });

    fnFetch()
      .then((data) => {
        setFetchStatus({
          ...fetchStatus,
          fetched: true,
          fetching: false,
          data: fnProcessData(data),
        });
      })
      .catch((e) => {
        setFetchStatus({
          ...fetchStatus,
          fetched: true,
          fetching: false,
        });
        console.warn(messageOnFetchFailed, e);
      });
  };

  return {fetchStatus, fetchFunction, setFetchStatus};
};


export const useFetchState = <D>(
  initialData: D,
  fnFetch: (callback?: (data: D) => void) => Promise<D>,
  messageOnFetchFailed: string,
): FetchStateReturns<D> => {
  return useFetchStateProcessed(initialData, fnFetch, messageOnFetchFailed, (data) => data);
};
