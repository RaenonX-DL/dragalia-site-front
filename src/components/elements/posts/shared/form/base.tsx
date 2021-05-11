import React from 'react';

import {Redirect} from 'react-router-dom';

import {ApiResponseCode, PostMetaPayload} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';
import {alertDispatchers} from '../../../../../state/alert/dispatchers';
import {AlertPayloadMaker} from '../../../../../state/alert/express';
import {useDispatch} from '../../../../../state/store';
import {CookiesControl} from '../../../../../utils/cookies';
import {BeforeUnloadPrompt} from '../../../common/beforeUnloadPrompt';
import {CommonModal, ModalState} from '../../../common/modal';
import {FormControl} from './control';
import {PostFormBaseProps} from './types';


type PostFormBaseInternalProps<P extends PostMetaPayload> = PostFormBaseProps<P> & {
  fnGetRedirectPath: (redirectId: number) => string,
}


export const PostFormBase = <P extends PostMetaPayload>({
  formState,
  setFormState,
  fnSendRequest,
  renderMain,
  renderOnPreloaded,
  fnGetRedirectPath,
}: PostFormBaseInternalProps<P>) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const [redirectId, setRedirectId] = React.useState(-1);

  if (redirectId > 0) {
    return <Redirect to={{pathname: fnGetRedirectPath(redirectId)}}/>;
  }

  const setPayload = (key: keyof P, newValue: string) => setFormState({
    ...formState,
    payload: {...formState.payload, [key]: newValue},
  });

  const setAvailability = (availability: boolean) => setFormState({
    ...formState,
    isIdAvailable: availability,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!CookiesControl.getGoogleUid()) {
      setModalState({
        show: true,
        title: t('google_signin.no_uid'),
        message: t('google_signin.no_uid_details'),
      });
      return;
    }

    // TEST: Alert displayed after publish

    fnSendRequest(formState.payload)
      .then((data) => {
        if (data.success) {
          setRedirectId(data.seqId);
          dispatch(alertDispatchers.showAlert(AlertPayloadMaker.postPublished(t)));
        } else {
          setModalState({
            show: true,
            title: t('posts.manage.publish_failed'),
            message: `${data.code}: ${ApiResponseCode[data.code]}`,
          });
        }
      })
      .catch((error) => {
        setModalState({
          show: true,
          title: t('posts.manage.publish_failed'),
          message: JSON.stringify(error),
        });
      });
  };

  return (
    <>
      <BeforeUnloadPrompt/>
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
