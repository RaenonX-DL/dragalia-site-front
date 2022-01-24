export type SubscribeButtonState = {
  subscribed: boolean,
  updating: boolean,
};

export type SubscribeButtonCommonProps = {
  onClick: () => void,
  state: SubscribeButtonState,
  disabled?: boolean,
};
