import React from 'react';

import {useDispatch} from 'react-redux';

import {ApiResponseCode, PostEditResponse, PostMeta} from '../../../../api-def/api';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {alertDispatchers} from '../../../../state/alert/dispatchers';
import {ProtectedLayout} from '../../../pages/layout/protected';
import {CommonModal, ModalState} from '../../common/modal';
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
  fnProcessPayload,
  onSubmitSuccess,
  onUpdated,
}: PostFormBaseInternalProps<P, R>) => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const context = React.useContext(AppReactContext);

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
  }, [formState]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!context?.session) {
      setModalState({
        show: true,
        title: t((t) => t.userControl.noUid),
        message: t((t) => t.userControl.noUidDetails),
      });
      return;
    }

    if (fnProcessPayload) {
      formState.payload = await fnProcessPayload(formState.payload);
    }

    try {
      const data = await fnSendRequest(formState.payload);

      if (data.success) {
        window.onbeforeunload = null;

        if (onSubmitSuccess) {
          onSubmitSuccess();
        }

        dispatch(alertDispatchers.showAlert({
          message: t((t) => t.posts.message.published),
          variant: 'success',
        }));
        window.location.assign(fnGetRedirectPath(fnGetRedirectId(data)));
      } else {
        setModalState({
          show: true,
          title: t((t) => t.posts.manage.publishFailed),
          message: `${data.code}: ${ApiResponseCode[data.code]}`,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        title: t((t) => t.posts.manage.publishFailed),
        message: JSON.stringify(error),
      });
    }
  };

  return (
    <ProtectedLayout>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <form onSubmit={onSubmit}>
        {renderMain(setPayload, setAvailability)}
        <div className="mb-3"/>
        {renderOnPreloaded && renderOnPreloaded(setPayload)}
        <hr/>
        <FormControl formState={formState}/>
      </form>
    </ProtectedLayout>
  );
};
