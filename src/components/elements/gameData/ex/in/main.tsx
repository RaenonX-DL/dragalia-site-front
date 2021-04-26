import React, {MouseEvent} from 'react';

import {Button} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {SelectionData} from '../types';
import {SectionFilter} from './filter';
import {InputData} from './types';


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const ExAbilityInput = ({onSearchRequested}: InputProps) => {
  const {t} = useTranslation();

  const [inputData, setInputData] = React.useState<InputData>({
    filterElementCode: [],
    filterExBuffParamCode: [],
    filterChainedExBuffParamCode: [],
  });

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

  if (!selectionData.fetched) {
    const promiseGetEnum = ResourceLoader.getEnumElements()
      .catch((e) => {
        // FIXME: Send global alert
        console.warn('Failed to fetch the element enum resource.', e);
        return selectionData.elementEnums;
      });
    const promiseGetExBuffParams = ResourceLoader.getEnumExBuffParameters()
      .catch((e) => {
        // FIXME: Send global alert
        console.warn('Failed to fetch the condition enum resource.', e);
        return selectionData.exBuffParams;
      });

    setSelectionData({
      ...selectionData,
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
    <div className="rounded bg-black-32 p-3">
      <SectionFilter
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
          {t('game.skill_atk.search')}
        </Button>
      </div>
    </div>
  );
};
