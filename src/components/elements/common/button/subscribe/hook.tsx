import React from 'react';

import {SubscribeButtonState} from './type';


type UseSubscribeButtonStateOptions = {
  dependencies: React.DependencyList,
  getSubscribedOnEffect: () => boolean | undefined,
};

type UseSubscribeButtonStateReturn = {
  reactState: [SubscribeButtonState, (newState: SubscribeButtonState) => void],
  state: SubscribeButtonState,
  setState: (newState: SubscribeButtonState) => void,
};

export const useSubscribeButtonState = ({
  dependencies,
  getSubscribedOnEffect,
}: UseSubscribeButtonStateOptions): UseSubscribeButtonStateReturn => {
  const reactState = React.useState<SubscribeButtonState>({
    subscribed: false,
    updating: false,
  });
  const [state, setState] = reactState;

  React.useEffect(() => {
    setState({
      ...state,
      subscribed: getSubscribedOnEffect() || state.subscribed,
    });
  }, dependencies);

  return {reactState, state, setState};
};
