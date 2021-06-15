import React from 'react';

import {PostIdCheckResponse, PostMeta} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {DelayedCheckState} from '../../../../common/delayedCheck';
import {isFormStateValid, PostFormControlProps} from '../types';


type FormMetaHookProps<P extends PostMeta, R extends PostIdCheckResponse> = PostFormControlProps<P> & {
  fnIdCheck: (payload: P) => Promise<R>,
  getEffectDependency: (payload: P) => React.DependencyList,
}

type FormMetaHookReturns = {
  isValid: boolean,
  isChecking: boolean,
}

export const useFormMeta = <P extends PostMeta, R extends PostIdCheckResponse>({
  formState,
  setAvailability,
  fnIdCheck,
  getEffectDependency,
}: FormMetaHookProps<P, R>): FormMetaHookReturns => {
  const {payload} = formState;
  const context = React.useContext(AppReactContext);

  const [checkState, setCheckState] = React.useState<DelayedCheckState>({
    isChecking: false,
    checkTimer: null,
  });

  const isValid = context?.session?.user.isAdmin ? isFormStateValid(formState) : false;

  const checkAvailability = (payload: P) => {
    setCheckState({...checkState, isChecking: true});
    fnIdCheck(payload)
      .then((data) => setAvailability(data.available))
      .catch(() => setAvailability(false))
      .finally(() => setCheckState({...checkState, isChecking: false}));
  };

  // Check availability on `payload.seqId` or `payload.lang` changed
  // - `timeout` for delaying the availability check
  React.useEffect(
    () => {
      if (!context?.session?.user.isAdmin) {
        setAvailability(false);
        return;
      }

      if (checkState.checkTimer) {
        clearTimeout(checkState.checkTimer);
        setCheckState({...checkState, checkTimer: null});
      }

      const checkTimer = setTimeout(() => {
        checkAvailability(payload);
      }, 1000);
      setCheckState({...checkState, checkTimer});
    },
    getEffectDependency(payload),
  );

  return {isValid, isChecking: checkState.isChecking};
};
