import React from 'react';

import {ApiResponseCode, ApiResponseCodeUtil, BaseResponse, FailedResponse} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';
import {getElementCounter} from '../../../utils/counter';
import {overrideObject} from '../../../utils/override';
import {AjaxForm} from './ajax/main';
import {ArrayForm, ArrayFormOnChangeHandler} from './array/main';
import {UpdateStatus} from './updateStatus';


type State<E> = {
  data: Array<E>,
  updateStatus: null | ApiResponseCode,
  updating: boolean,
  isInit: boolean,
}

type Props<E, I, R extends BaseResponse> = {
  data: Array<E>,
  uid: string,
  getElementUniqueIdentifier: (element: E) => I,
  getSubmitPromise: (updatedArray: Array<E>) => Promise<R | FailedResponse>,
  isEntryValid: (element: E) => boolean,
  generateNewElement: () => E,
  renderEntries: (
    element: E,
    onChangeHandler: ArrayFormOnChangeHandler<E>,
    idx: number,
    counter: Map<I, number>,
  ) => React.ReactElement,
}

export const EntryManagement = <E extends object, I, R extends BaseResponse>({
  data,
  getElementUniqueIdentifier,
  getSubmitPromise,
  isEntryValid,
  generateNewElement,
  renderEntries,
}: Props<E, I, R>) => {
  const {t} = useI18n();

  const [state, setState] = React.useState<State<E>>({
    data,
    updateStatus: null,
    updating: false,
    isInit: true,
  });

  const elementCounter = getElementCounter(state.data.map((entry) => getElementUniqueIdentifier(entry)));

  const isValid = (
    state.data.every((entry) => isEntryValid(entry)) &&
    [...elementCounter.values()].every((count) => count === 1)
  );
  const isJustUpdated = !!state.updateStatus && ApiResponseCodeUtil.isSuccess(state.updateStatus);

  const onUpdateCompleted = (responseCode: ApiResponseCode) => {
    setState(overrideObject(state, {updateStatus: responseCode, updating: false}));
  };

  return (
    <AjaxForm
      unloadDependencies={[state.data]}
      submitPromise={() => getSubmitPromise(state.data)}
      formControl={{
        variant: 'outline-light',
        loading: !isValid || isJustUpdated || state.updating || state.isInit,
        submitText: t((t) => t.misc.update),
        renderAtLeft: <UpdateStatus status={state.updateStatus}/>,
      }}
      onPreSubmit={async () => {
        setState(overrideObject(state, {updating: true}));
        return true;
      }}
      onSuccess={onUpdateCompleted}
      onFailed={onUpdateCompleted}
      submitAtTop
    >
      <ArrayForm
        payload={state}
        minLength={0}
        getArray={(state) => state.data}
        setArray={(data) => setState(overrideObject(state, {data, updateStatus: null, isInit: false}))}
        getUpdatedElement={(element, key, newValue) => ({
          ...element,
          [key]: newValue,
        })}
        generateNewElement={generateNewElement}
        renderEntries={(...props) => renderEntries(...props, elementCounter)}
        addToTop
      />
    </AjaxForm>
  );
};
