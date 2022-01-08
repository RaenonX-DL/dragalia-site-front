import React from 'react';

import {ApiResponseCode, ApiResponseCodeUtil, BaseResponse, FailedResponse} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';
import {getElementCounter} from '../../../utils/counter';
import {overrideObject} from '../../../utils/override';
import {SlicedEntryBar} from '../common/entryBar';
import {AjaxForm} from './ajax/main';
import {ArrayForm} from './array/main';
import {ArrayFormOnChangeHandler} from './array/type';
import {UpdateStatus} from './updateStatus';


type State<E> = {
  data: Array<E>,
  updateStatus: null | ApiResponseCode,
  updating: boolean,
  isInit: boolean,
};

type Props<E, I, R extends BaseResponse> = {
  data: Array<E>,
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
  elemRenderCount?: number,
};

export const EntryManagement = <E extends object, I, R extends BaseResponse>({
  data,
  getElementUniqueIdentifier,
  getSubmitPromise,
  isEntryValid,
  generateNewElement,
  renderEntries,
  elemRenderCount,
}: Props<E, I, R>) => {
  const {t} = useI18n();

  const [state, setState] = React.useState<State<E>>({
    data,
    updateStatus: null,
    updating: false,
    isInit: true,
  });
  const [elemCount, setElemCount] = React.useState(elemRenderCount || -1); // -1 for unlimited

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
        disabled: !isValid || isJustUpdated || state.updating || state.isInit,
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
        elemCount={elemCount}
        addToTop
      />
      <div className="mb-2"/>
      {
        elemRenderCount &&
        <SlicedEntryBar
          resultCount={elemCount}
          setResultCount={setElemCount}
          renderCount={elemRenderCount}
          maxCount={state.data.length}
        />
      }
    </AjaxForm>
  );
};
