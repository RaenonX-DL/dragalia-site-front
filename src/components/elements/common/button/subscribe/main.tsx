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
  asIcon?: boolean,
  disabled?: boolean,
  onClick?: (newSubStatus: boolean) => void,
} & ({
  defaultSubscribed: boolean,
  state?: never,
} | {
  defaultSubscribed?: never,
  state?: [SubscribeButtonState, (newState: SubscribeButtonState) => void],
});

export const SubscribeButton = ({
  subscriptionKey,
  defaultSubscribed,
  asIcon = true,
  disabled,
  onClick,
  state,
}: SubscribeButtonProps) => {
  const {status, data} = useSession();
  const {t} = useI18n();

  const [buttonState, setButtonState] = state || React.useState<SubscribeButtonState>({
    subscribed: defaultSubscribed as boolean,
    updating: false,
  });
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: '',
  });
  const {subscribed} = buttonState;

  const fnUpdateSubscription = subscribed ? ApiRequestSender.removeSubscription : ApiRequestSender.addSubscription;

  const onClickInternal = () => {
    if (status !== 'authenticated') {
      setModalState({...modalState, show: true});
      return;
    }

    setButtonState({...buttonState, updating: true});

    fnUpdateSubscription(data?.user.id.toString() || '', subscriptionKey)
      .then((response) => {
        if (isFailedResponse(response)) {
          setModalState({...modalState, show: true});
          return;
        }

        const newSubscribed = !subscribed;
        setButtonState({subscribed: newSubscribed, updating: false});

        if (onClick) {
          onClick(newSubscribed);
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
          <SubscribeButtonIconOnly onClick={onClickInternal} state={buttonState} disabled={disabled}/> :
          <SubscribeButtonText onClick={onClickInternal} state={buttonState} disabled={disabled}/>
      }
    </>
  );
};
