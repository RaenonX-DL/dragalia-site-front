import React from 'react';

import {useSession} from 'next-auth/client';

import {ApiResponseCode, PostEditResponse, PostMeta} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {alertDispatchers} from '../../../../../state/alert/dispatchers';
import {AlertPayloadMaker} from '../../../../../state/alert/utils';
import {useDispatch} from '../../../../../state/store';
import {CommonModal, ModalState} from '../../../common/modal';
import {FormControl} from './control';
import {PostFormBaseProps} from './types';


type PostFormBaseInternalProps<P extends PostMeta, R extends PostEditResponse> = PostFormBaseProps<P, R> & {
  fnGetRedirectPath: (redirectId: number) => string,
  fnGetRedirectId: (response: R) => number,
}

export const PostFormBase = <P extends PostMeta, R extends PostEditResponse>({
  formState,
  setFormState,
  fnSendRequest,
  renderMain,
  renderOnPreloaded,
  fnGetRedirectPath,
  fnGetRedirectId,
}: PostFormBaseInternalProps<P, R>) => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const [session] = useSession();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  React.useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    return () => {
      window.onbeforeunload = null;
    };
  });

  const setPayload = <K extends keyof P>(key: K, newValue: P[K]) => setFormState({
    ...formState,
    payload: {...formState.payload, [key]: newValue},
  });

  const setAvailability = (availability: boolean) => setFormState({
    ...formState,
    isIdAvailable: availability,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      setModalState({
        show: true,
        title: t((t) => t.userControl.noUid),
        message: t((t) => t.userControl.noUidDetails),
      });
      return;
    }

    // TEST: Alert displayed after publish

    fnSendRequest(formState.payload)
      .then((data) => {
        if (data.success) {
          window.onbeforeunload = null;
          window.location.assign(fnGetRedirectPath(fnGetRedirectId(data)));
          dispatch(alertDispatchers.showAlert(AlertPayloadMaker.postPublished(t)));
        } else {
          setModalState({
            show: true,
            title: t((t) => t.posts.manage.publishFailed),
            message: `${data.code}: ${ApiResponseCode[data.code]}`,
          });
        }
      })
      .catch((error) => {
        setModalState({
          show: true,
          title: t((t) => t.posts.manage.publishFailed),
          message: JSON.stringify(error),
        });
      });
  };

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <form onSubmit={onSubmit}>
        {renderMain(setPayload, setAvailability)}
        <div className="mb-3"/>
        {renderOnPreloaded && renderOnPreloaded(setPayload)}
        <hr/>
        <FormControl formState={formState}/>
      </form>
    </>
  );
};
