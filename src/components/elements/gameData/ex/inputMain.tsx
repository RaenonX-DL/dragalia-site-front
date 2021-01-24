import React, {ChangeEvent, MouseEvent} from 'react';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {ElementEnums, ExBuffParams} from '../../../../utils/services/resources/types';
import {InputData, SectionFilter} from './inputSection';


type InputExBuffParams = {
  fetched: boolean,
  exBuffParams: ExBuffParams,
}


type InputElementEnums = {
  fetched: boolean,
  elementEnums: ElementEnums,
}


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}


export const ExInput = ({onSearchRequested}: InputProps) => {
  const {t} = useTranslation();

  const [inputData, setInputData] = React.useState<InputData>({
    filterElementCode: [],
    filterExBuffParamCode: [],
    filterChainedExBuffParamCode: [],
  });

  // region Update functions
  const updateInputDataCheckEnumMulti = (code: number) => (e: ChangeEvent<HTMLInputElement>) => setInputData({
    ...inputData,
    [e.target.name]: (
      e.target.checked ?
        inputData[e.target.name].concat([code]) :
        inputData[e.target.name].filter((dataCode) => dataCode !== code)
    ),
  });
  // endregion

  // region Get input enums (EX/CEX buff params)
  const [inputExBuffParams, setInputExBuffParams] = React.useState<InputExBuffParams>({
    fetched: false,
    exBuffParams: {
      exBuffParam: [],
      chainedExBuffParam: [],
    },
  });

  if (!inputExBuffParams.fetched) {
    ResourceLoader.getEnumExBuffParameters((data) => {
      setInputExBuffParams({
        ...inputExBuffParams,
        fetched: true,
        exBuffParams: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the condition enum resource.', e);
      });
  }
  // endregion

  // region Get input enums (elements)
  const [inputElementEnums, setInputElementEnums] = React.useState<InputElementEnums>({
    fetched: false,
    elementEnums: {
      elemental: [],
    },
  });

  if (!inputElementEnums.fetched) {
    ResourceLoader.getEnumElements((data) => {
      setInputElementEnums({
        ...inputElementEnums,
        fetched: true,
        elementEnums: data,
      });
    })
      .catch((e) => {
        console.warn('Failed to fetch the element enum resource.', e);
      });
  }
  // endregion

  return (
    <div className="rounded bg-black-32 p-3">
      <SectionFilter
        elementEnums={inputElementEnums.elementEnums} exBuffParams={inputExBuffParams.exBuffParams}
        inputData={inputData} fnUpdateInputDataCheckMulti={updateInputDataCheckEnumMulti}/>
      <hr/>
      <div className="text-right">
        <Button variant="outline-info" onClick={onSearchRequested(inputData)}>
          {t('game.skill_atk.search')}
        </Button>
      </div>
    </div>
  );
};
