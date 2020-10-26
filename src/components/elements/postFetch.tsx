import React, {Dispatch, SetStateAction} from 'react';
import {Alert} from 'react-bootstrap';

import {ApiRequestSender, ApiResponseCodes, QuestPostGetResponse} from '../../constants/api';
import {getGoogleUid} from './googleSignin';
import {useTranslation} from 'react-i18next';


export type QuestPostFetchStatus = {
  fetched: boolean,
  fetchFailed: boolean,
  failContent: string,
  post: QuestPostGetResponse | null,
}


type FetchPostProps = {
  status: QuestPostFetchStatus,
  fnSetStatus: Dispatch<SetStateAction<QuestPostFetchStatus>>,
  pid: number,
  increaseCount?: boolean
}


export const FetchPost = ({status, fnSetStatus, pid, increaseCount = true}: FetchPostProps) => {
  const {t, i18n} = useTranslation();

  const fetchPost = () => {
    ApiRequestSender.questPostGet(
      getGoogleUid() || '', pid, i18n.language, increaseCount)
      .then((data) => {
        // setting state triggers re-render, re-render triggers API call,
        // so having a if statement to guard from the re-render and API re-call

        if (!status.fetched) {
          if (data.success) {
            fnSetStatus(
              (prevState) => {
                const newState = {...prevState};

                newState.fetched = true;
                newState.post = data;
                newState.fetchFailed = false;
                return newState;
              });
          } else {
            fnSetStatus(
              (prevState) => {
                const newState = {...prevState};

                newState.fetched = true;
                newState.fetchFailed = true;
                newState.failContent =
                  data.code === ApiResponseCodes.FAILED_POST_NOT_EXISTS ?
                    t('posts.manage.post_not_exists') :
                    data.code.toString();
                return newState;
              });
          }
        }
      })
      .catch((error) => {
        // if statement to guard from re-render loop
        if (!status.fetchFailed) {
          fnSetStatus(
            (prevState) => {
              const newState = {...prevState};

              newState.fetchFailed = true;
              newState.failContent = error.toString();
              return newState;
            });
        }
      });
  };

  const alertFetchFailed = (
    <Alert variant="danger">{t('posts.manage.fetch_post_failed', {error: status.failContent})}</Alert>
  );

  // Trigger the fetch request if not yet fetched
  if (!status.fetched) {
    fetchPost();
  }

  if (status.fetchFailed) {
    return alertFetchFailed;
  } else {
    return <></>;
  }
};
