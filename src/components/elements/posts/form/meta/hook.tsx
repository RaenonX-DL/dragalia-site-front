import React from 'react';

import {useSession} from 'next-auth/react';

import {PostIdCheckResponse, PostMeta} from '../../../../../api-def/api';
import {DelayedCheckState} from '../../../common/types';
import {isFormStateValid, PostFormControlProps} from '../types';


type FormMetaHookProps<P extends PostMeta, R extends PostIdCheckResponse> = Omit<
  PostFormControlProps<P>,
  'setPayload'
> & {
  fnIdCheck: (payload: P) => Promise<R>,
  getEffectDependency: (payload: P) => React.DependencyList,
};

type FormMetaHookReturns = {
  isValid: boolean,
  isChecking: boolean,
};

export const useFormMeta = <P extends PostMeta, R extends PostIdCheckResponse>({
  formState,
  setAvailability,
  fnIdCheck,
  getEffectDependency,
}: FormMetaHookProps<P, R>): FormMetaHookReturns => {
  const {payload} = formState;
  const {data} = useSession();

  const [checkState, setCheckState] = React.useState<DelayedCheckState>({
    isChecking: false,
    checkTimer: null,
  });

  const isAdmin = data?.user.isAdmin || false;
  const isValid = isAdmin ? isFormStateValid(formState) : false;

  const checkAvailability = (payload: P) => {
    if (!isAdmin) {
      setAvailability(false);
      return;
    }

    setCheckState({...checkState, isChecking: true});
    fnIdCheck(payload)
      .then((data) => setAvailability(data.available))
      .catch(() => setAvailability(false))
      .finally(() => setCheckState({...checkState, isChecking: false}));
  };

  // Check availability on dependency changed
  // - `timeout` for delaying the availability check
  // - No need to check availability on load because it's unlikely an user will submit within 1 sec after load.
  //   Even if submitted, it's likely to fail.
  React.useEffect(
    () => {
      if (!isAdmin) {
        setAvailability(false);
        return;
      }

      if (checkState.checkTimer) {
        clearTimeout(checkState.checkTimer);
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
