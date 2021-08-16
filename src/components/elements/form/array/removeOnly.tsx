import React from 'react';

import {ArrayFormBase, ArrayFormProps} from './base';


type Props<P, E> = Omit<ArrayFormProps<P, E>, 'counterState'>

export const ArrayFormRemoveOnly = <P, E>(props: Props<P, E>) => {
  const {getArray, payload, reversed} = props;

  // Can't use element index for render because the components are cached after removal.
  // - For example, if `renderEntries()` renders a `<textarea>`,
  //   removing the first entry only removes the underlying 1st data.
  //   The original text for the 1st data is still rendered.
  // No related tests implemented because the caching behavior doesn't seem existed in JSDOM
  const initialCounter = [...Array(getArray(payload).length).keys()];
  if (reversed) {
    initialCounter.reverse();
  }

  return (
    <ArrayFormBase
      {...props}
      counterState={React.useState(initialCounter)}
    />
  );
};
