import React from 'react';

import {useSession} from 'next-auth/react';
import {useDispatch} from 'react-redux';

import {PostEditResponse, PostUpdateCommonPayload} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {alertDispatchers} from '../../../../state/alert/dispatchers';
import {ProtectedLayout} from '../../../pages/layout/protected';
import {ModalStateFlex} from '../../common/modal/types';
import {AjaxForm} from '../../form/ajax/main';
import {FormConfig} from './config';
import {isFormStateValid, PostFormBaseProps} from './types';


type PostFormBaseInternalProps<P extends PostUpdateCommonPayload, R extends PostEditResponse> =
  PostFormBaseProps<P, R> & {
    fnGetRedirectUrl: (redirectId: number) => string,
    fnGetRedirectId: (response: R) => number,
  };

export const PostFormBase = <P extends PostUpdateCommonPayload, R extends PostEditResponse>({
  formState,
  setFormState,
  fnSendRequest,
  renderMain,
  renderOnPreloaded,
  fnGetRedirectUrl,
  fnGetRedirectId,
  fnProcessPayload,
  onSubmitSuccess,
  onUpdated,
}: PostFormBaseInternalProps<P, R>) => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const {status} = useSession();

  const setPayload = <K extends keyof P>(key: K, newValue: P[K]) => {
    const payload: P = {...formState.payload, [key]: newValue};
    if (onUpdated) {
      onUpdated(payload);
    }
    setFormState({...formState, payload});
  };

  const setAvailability = (availability: boolean) => setFormState({
    ...formState,
    isIdAvailable: availability,
  });

  const onPreSubmit = async (setModal: React.Dispatch<React.SetStateAction<ModalStateFlex>>) => {
    if (status !== 'authenticated') {
      setModal({
        show: true,
        title: t((t) => t.userControl.noUid),
        message: t((t) => t.userControl.noUidDetails),
      });
      return false;
    }

    if (fnProcessPayload) {
      formState.payload = await fnProcessPayload(formState.payload);
    }

    return true;
  };

  const onSuccess = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }

    dispatch(alertDispatchers.showAlert({
      message: t((t) => t.posts.message.published),
      variant: 'success',
    }));
  };

  return (
    <ProtectedLayout>
      <AjaxForm
        unloadDependencies={[formState]}
        submitPromise={() => fnSendRequest(formState.payload)}
        formControl={{
          variant: 'outline-success',
          disabled: !isFormStateValid(formState),
          submitText: (
            formState.isPreloaded ?
              t((t) => t.posts.manage.edit) :
              t((t) => t.posts.manage.publish)
          ),
        }}
        onPreSubmit={onPreSubmit}
        onSuccess={onSuccess}
        getRedirectUrlOnSuccess={(response) => fnGetRedirectUrl(fnGetRedirectId(response))}
      >
        {renderMain(setPayload, setAvailability)}
        <div className="mb-2"/>
        <FormConfig
          sendEmail={formState.payload.sendUpdateEmail}
          onChangeSendEmail={(newValue) => setPayload('sendUpdateEmail', newValue)}
        />
        <div className="mb-2"/>
        {renderOnPreloaded && renderOnPreloaded(setPayload)}
      </AjaxForm>
    </ProtectedLayout>
  );
};
