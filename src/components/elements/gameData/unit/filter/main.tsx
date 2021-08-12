import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {useUnitProps} from '../../../../hooks/unitProps';
import {EnumCheckboxGroup} from '../../../common/check/enum/checkbox';
import {UnitTypePicker} from './typePicker';
import {UnitFilterInputData} from './types';


type LookupInputProps<S extends string, D extends UnitFilterInputData<S>> = {
  onSearchRequested: (inputData: D) => (event: FormEvent<HTMLFormElement>) => void,
  sortOrderNames: { [sortBy in S]: GetTranslationFunction },
  generateInputData: () => D,
}

export const UnitFilter = <S extends string, D extends UnitFilterInputData<S>>({
  onSearchRequested,
  sortOrderNames,
  generateInputData,
}: LookupInputProps<S, D>) => {
  const {t} = useI18n();

  const [inputData, setInputData] = React.useState<D>(generateInputData());
  const {elemEnums, weaponEnums} = useUnitProps();

  const sortTitle = t(
    (t) => t.misc.sortBy,
    {order: t(sortOrderNames[inputData.sortBy])},
  );

  return (
    <div className="rounded bg-black-32 p-3 mb-2">
      <UnitTypePicker inputData={inputData} setInputData={setInputData}/>
      <EnumCheckboxGroup
        options={elemEnums.elemental}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.elements}
        getUpdatedInputData={(newValue) => ({...inputData, elements: newValue})}
      />
      <EnumCheckboxGroup
        options={weaponEnums.weapon}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.weaponTypes}
        getUpdatedInputData={(newValue) => ({...inputData, weaponTypes: newValue})}
      />
      <Form onSubmit={(e) => {
        e.preventDefault();
        onSearchRequested(inputData)(e);
      }}>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder={t((t) => t.misc.searchKeyword)}
              value={inputData.keyword}
              onChange={(e) => setInputData({
                ...inputData,
                keyword: e.target.value,
              })}
            />
          </Col>
          <Col xs="auto">
            <DropdownButton title={sortTitle} variant="outline-light">
              {Object.entries(sortOrderNames).map(([sortBy, getNameFunc], idx) => (
                <Dropdown.Item
                  key={idx} onClick={() => setInputData({...inputData, sortBy: sortBy as S})}
                >
                  {t(getNameFunc as GetTranslationFunction)}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs="auto" className="text-right">
            <Button
              variant="outline-info"
              type="submit"
            >
              {t((t) => t.misc.search)}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};
