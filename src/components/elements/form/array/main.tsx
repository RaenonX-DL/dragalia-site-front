import React from 'react';

import {ArrayAddButtonRow} from './addButton';
import {ArrayFormBase} from './base';
import {ArrayFormCommonProps, ArrayFormOnChangeHandler} from './type';


type Props<P, E> = ArrayFormCommonProps<P, E> & {
  getUpdatedElement: <K extends keyof E>(element: E, key: K, value: E[K]) => E,
  generateNewElement: () => E,
  renderEntries: (
    element: E,
    onChangeHandler: ArrayFormOnChangeHandler<E>,
    idx: number,
  ) => React.ReactElement,
  addToTop?: boolean,
};

export const ArrayForm = <P, E extends object>(props: Props<P, E>) => {
  const {
    payload,
    getArray,
    setArray,
    getUpdatedElement,
    generateNewElement,
    renderEntries,
    addToTop = false,
  } = props;

  // Can't use element index for render because the components are cached after removal.
  // - For example, if `renderEntries()` renders a `<textarea>`,
  //   removing the first entry only removes the underlying 1st data.
  //   The original text for the 1st data is still rendered.
  // No related tests implemented because the caching behavior doesn't seem existed in JSDOM
  const initialCounter = [...Array(getArray(payload).length).keys()];
  if (addToTop) {
    initialCounter.reverse();
  }

  const counterState = React.useState(initialCounter);
  const [counter, setCounter] = counterState;

  const onChangeHandler = <K extends keyof E>(changedIdx: number) => (
    key: K,
  ) => (
    newValue: E[K],
  ) => {
    setArray(getArray(payload).map((elem, elemIdx) => {
      if (changedIdx !== elemIdx) {
        // Keep the data not to be changed intact
        return elem;
      }

      return getUpdatedElement(elem, key, newValue);
    }));
  };

  const onAdded = () => {
    // Conditional statements for new counter to handle the case where counter is an empty array (no data)\
    if (addToTop) {
      setArray([generateNewElement(), ...getArray(payload)]);
      setCounter([counter.length ? counter[0] + 1 : 0, ...counter]);
    } else {
      setArray([...getArray(payload), generateNewElement()]);
      setCounter([...counter, counter.length ? counter[counter.length - 1] + 1 : 0]);
    }
  };

  return (
    <>
      {addToTop && <ArrayAddButtonRow onAdded={onAdded} onTop/>}
      <ArrayFormBase
        {...props}
        payload={payload}
        getArray={getArray}
        setArray={setArray}
        renderEntries={(elem, elemIdx) => renderEntries(elem, onChangeHandler(elemIdx), elemIdx)}
        reversed={addToTop}
        counterState={counterState}
      />
      {!addToTop && <ArrayAddButtonRow onAdded={onAdded} onTop={false}/>}
    </>
  );
};
