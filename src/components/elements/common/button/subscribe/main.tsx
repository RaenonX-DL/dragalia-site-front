import React from 'react';

import {useSession} from 'next-auth/react';

import {isFailedResponse, SubscriptionKey} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {ModalFixedContent} from '../../modal/fix';
import {ModalStateFix} from '../../modal/types';
import {SubscribeButtonIconOnly} from './icon';
import {SubscribeButtonText} from './text';
import {SubscribeButtonState} from './type';


export type SubscribeButtonProps = {
  subscriptionKey: SubscriptionKey,
  defaultSubscribed: boolean,
  asIcon?: boolean,
  disabled?: boolean,
  onClick?: () => void,
};

export const SubscribeButton = ({
  subscriptionKey,
  defaultSubscribed,
  asIcon = true,
  disabled,
  onClick,
}: SubscribeButtonProps) => {
  const {status, data} = useSession();
  const {t} = useI18n();

  const [state, setState] = React.useState<SubscribeButtonState>({
    subscribed: defaultSubscribed,
    updating: false,
  });
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: '',
  });
  const {subscribed} = state;

  const fnUpdateSubscription = subscribed ? ApiRequestSender.removeSubscription : ApiRequestSender.addSubscription;

  const onClickInternal = () => {
    if (status !== 'authenticated') {
      setModalState({...modalState, show: true});
      return;
    }

    setState({...state, updating: true});

    fnUpdateSubscription(data?.user.id.toString() || '', subscriptionKey)
      .then((response) => {
        if (isFailedResponse(response)) {
          setModalState({...modalState, show: true});
          return;
        }

        setState({subscribed: !subscribed, updating: false});

        if (onClick) {
          onClick();
        }
      });
  };

  return (
    <>
      <ModalFixedContent state={modalState} setState={setModalState}>
        {t((t) => t.message.error.auth.loginRequired)}
      </ModalFixedContent>
      {
        asIcon ?
          <SubscribeButtonIconOnly onClick={onClickInternal} state={state} disabled={disabled}/> :
          <SubscribeButtonText onClick={onClickInternal} state={state} disabled={disabled}/>
      }
    </>
  );
};
