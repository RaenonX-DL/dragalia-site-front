import React from 'react';

import {ApiResponseCode, BaseResponse} from '../../../../api-def/api';
import {useOnBeforeUnload} from '../../../hooks/onBeforeUnload';
import {ModalFlexContent} from '../../common/modal/flex';
import {ModalStateFlex} from '../../common/modal/types';
import {AjaxFormControl, AjaxFormControlProps, SubmitTextKey} from './control';


type Props<R extends BaseResponse> = {
  unloadDependencies: React.DependencyList,
  submitPromise: () => Promise<R>,
  formControl: Omit<AjaxFormControlProps, 'submitTextKey'>,
  onPreSubmit?: (setModal: React.Dispatch<React.SetStateAction<ModalStateFlex>>) => PromiseLike<boolean>,
  onSuccess?: (responseCode: ApiResponseCode) => void,
  onFailed?: (responseCode: ApiResponseCode) => void,
  getRedirectUrlOnSuccess?: (response: R) => string,
  submitAtTop?: boolean,
  children: React.ReactNode,
};

export const AjaxForm = <R extends BaseResponse>({
  unloadDependencies,
  submitPromise,
  formControl,
  onPreSubmit,
  onSuccess,
  onFailed,
  getRedirectUrlOnSuccess,
  submitAtTop = false,
  children,
}: Props<R>) => {
  const {clearUnload} = useOnBeforeUnload(unloadDependencies);
  const [modal, setModal] = React.useState<ModalStateFlex>({
    show: false,
    title: '',
    message: '',
  });
  const [submitTextKey, setSubmitTextKey] = React.useState<SubmitTextKey>('text');

  const setToLoading = () => {
    setSubmitTextKey('loading');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToLoading();

    if (onPreSubmit && !await onPreSubmit(setModal)) {
      setSubmitTextKey('text');
      return;
    }

    submitPromise()
      .then((response) => {
        if (!response.success) {
          if (onFailed) {
            onFailed(response.code);
          } else {
            setModal({...modal, show: true, message: ApiResponseCode[response.code]});
          }
          setSubmitTextKey('text');
          return;
        }

        clearUnload();
        if (onSuccess) {
          onSuccess(response.code);
        }
        // If to be redirected, keep it render as "loading", otherwise render as "text"
        if (getRedirectUrlOnSuccess) {
          window.location.assign(getRedirectUrlOnSuccess(response));
        } else {
          setSubmitTextKey('text');
        }
      })
      .catch((e) => {
        console.error(e);
        setSubmitTextKey('text');

        if (onFailed) {
          onFailed(ApiResponseCode.FAILED_INTERNAL_ERROR);
        } else {
          setModal({...modal, show: true, message: e.message});
        }
      });
  };

  return (
    <>
      <ModalFlexContent state={modal} setState={setModal}/>
      <form onSubmit={onSubmit}>
        {
          submitAtTop &&
          <>
            <AjaxFormControl {...formControl} submitTextKey={submitTextKey}/>
            <hr/>
          </>
        }
        {children}
        {
          !submitAtTop &&
          <>
            <hr/>
            <AjaxFormControl {...formControl} submitTextKey={submitTextKey}/>
          </>
        }
      </form>
    </>
  );
};
