import React from 'react';

import {PostMeta} from '../../../../../api-def/api';
import {ArrayControl} from './arrayControl';

type CharaAnalysisFormProps<P extends PostMeta, E> = {
  payload: P,
  minLength: number,
  getArray: (payload: P) => Array<E>,
  setArray: (newArray: Array<E>) => void,
  getUpdatedElement: (element: E, key: keyof E, value: string) => E,
  generateNewElement: () => E,
  renderEntries: (
    element: E,
    onChangeHandler: (key: keyof E) => (newValue: string) => void,
  ) => React.ReactElement,
}


export const ArrayDataForm = <P extends PostMeta, E extends object>({
  payload,
  minLength,
  getArray,
  setArray,
  getUpdatedElement,
  generateNewElement,
  renderEntries,
}: CharaAnalysisFormProps<P, E>) => {
  const isRemoveAllowed = () => getArray(payload).length > minLength;

  const onChangeHandler = (
    changedIdx: number,
  ) => (
    key: keyof E,
  ) => (
    newValue: string,
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
    setArray(getArray(payload).concat([generateNewElement()]));
  };
  const onRemoved = () => {
    const lastIdx = getArray(payload).length - 1;

    setArray(getArray(payload).filter(
      (element, elemIdx) => elemIdx !== lastIdx,
    ));
  };

  return (
    <>
      {
        getArray(payload).map((elem, elemIdx) => (
          <div key={elemIdx} className="mt-2">
            {renderEntries(elem, onChangeHandler(elemIdx))}
          </div>
        ))
      }
      <ArrayControl
        onAdded={onAdded}
        onRemoved={onRemoved}
        isRemoveAllowed={isRemoveAllowed}
      />
    </>
  );
};
