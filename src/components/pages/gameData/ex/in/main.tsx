import React, {MouseEvent} from 'react';

import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';

import {useI18n} from '../../../../../i18n/hook';
import {alertDispatchers} from '../../../../../state/alert/dispatchers';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {isNotFetched} from '../../../../elements/common/fetch';
import {SelectionData} from '../types';
import {Filter} from './filter';
import {InputData} from './types';
import {generateInputData} from './utils';


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const ExAbilityInput = ({onSearchRequested}: InputProps) => {
  const {t} = useI18n();
  const dispatch = useDispatch();

  const [inputData, setInputData] = React.useState<InputData>(generateInputData());

  const [selectionData, setSelectionData] = React.useState<SelectionData>({
    fetched: false,
    fetching: false,
    exBuffParams: {
      exBuffParam: [],
      chainedExBuffParam: [],
    },
    elementEnums: {
      elemental: [],
    },
  });

  if (isNotFetched(selectionData)) {
    const promiseGetEnum = ResourceLoader.getEnumElements()
      .catch((e) => {
        dispatch(alertDispatchers.showAlert({
          message: `Failed to fetch the element enum resource. (${e.message})`,
          variant: 'warning',
        }));
        return selectionData.elementEnums;
      });
    const promiseGetExBuffParams = ResourceLoader.getEnumExBuffParameters()
      .catch((e) => {
        dispatch(alertDispatchers.showAlert({
          message: `Failed to fetch the condition enum resource. (${e.message})`,
          variant: 'warning',
        }));
        return selectionData.exBuffParams;
      });

    setSelectionData({
      ...selectionData,
      fetched: false,
      fetching: true,
    });

    Promise.all([promiseGetEnum, promiseGetExBuffParams])
      .then(([elementEnums, exBuffParams]) => {
        setSelectionData({
          fetched: true,
          fetching: false,
          elementEnums: elementEnums,
          exBuffParams: exBuffParams,
        });
      });
  }

  return (
    <div className="section">
      <Filter
        elementEnums={selectionData.elementEnums}
        exBuffParams={selectionData.exBuffParams}
        inputData={inputData}
        setInputData={setInputData}
      />
      <hr/>
      <div className="text-right">
        <Button
          variant="outline-info"
          onClick={onSearchRequested(inputData)}
          disabled={selectionData.fetching}
        >
          {t((t) => t.misc.search)}
        </Button>
      </div>
    </div>
  );
};
