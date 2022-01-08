import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import {EnumEntry} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {useUnitProps} from '../../../../hooks/unitProps';
import {AdsPageTop, AdsUnitSearchBottom} from '../../../common/ads/main';
import {CheckOption} from '../../../common/check/types';
import {InputPanel} from '../../../input/panel/main';
import {InputEntries} from '../../../input/panel/types';
import {UnitTypePicker} from './typePicker';
import {UnitFilterInputData} from './types';


export type UnitFilterProps<S extends string, D extends UnitFilterInputData<S>, E, E2 extends EnumEntry, V> = {
  onSearchRequested: (inputData: D) => (event: FormEvent<HTMLFormElement>) => void,
  sortOrderNames: {[sortBy in S]: GetTranslationFunction},
  generateInputData: () => D,
  getAdditionalInputs?: (inputData: D) => InputEntries<E, E2, D, V>,
  disabled?: boolean,
};

export const UnitFilter = <S extends string,
  D extends UnitFilterInputData<S>,
  E extends CheckOption,
  E2 extends EnumEntry,
  V
>({
  onSearchRequested,
  sortOrderNames,
  generateInputData,
  getAdditionalInputs,
  disabled,
}: UnitFilterProps<S, D, E, E2, V>) => {
  const {t} = useI18n();

  const [inputData, setInputData] = React.useState<D>(generateInputData());
  const {elemEnums, weaponEnums} = useUnitProps();

  const sortTitle = t(
    (t) => t.misc.sortBy,
    {order: t(sortOrderNames[inputData.sortBy])},
  );

  const additionalInputs = getAdditionalInputs ? getAdditionalInputs(inputData) : [];

  return (
    <>
      <AdsPageTop/>
      <div className="section p-3 mb-2">
        <UnitTypePicker inputData={inputData} setInputData={setInputData}/>
        <InputPanel
          inputData={inputData}
          setInputData={setInputData}
          inputEntries={[
            {
              type: 'enumCheckGroup',
              options: elemEnums.elemental,
              getValue: (inputData) => inputData.elements,
              getUpdatedInputData: (elements) => ({...inputData, elements}),
            },
            {
              type: 'enumCheckGroup',
              options: weaponEnums.weapon,
              getValue: (inputData) => inputData.weaponTypes,
              getUpdatedInputData: (weaponTypes) => ({...inputData, weaponTypes}),
            },
            {
              type: 'individualCheckGroup',
              checkboxes: [{
                getValue: (data) => data.iconOnly,
                getUpdatedInputData: (iconOnly) => ({...inputData, iconOnly}),
                text: t((t) => t.game.unitInfo.text.iconOnly),
              }],
            },
          ]}
        />
        {
          additionalInputs.length > 0 &&
          <InputPanel inputData={inputData} setInputData={setInputData} inputEntries={additionalInputs}/>
        }
        <Form onSubmit={(e) => {
          e.preventDefault();
          onSearchRequested(inputData)(e);
        }}>
          <Row>
            <Col xs={12} md className="mb-2 mb-md-0">
              <Form.Control
                placeholder={t((t) => t.misc.searchKeyword)}
                value={inputData.keyword}
                onChange={(e) => setInputData({
                  ...inputData,
                  keyword: e.target.value,
                })}
              />
            </Col>
            <Col xs md="auto" className="text-right">
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
              <Button variant="outline-info" type="submit" disabled={disabled}>
                {disabled ? <Spinner animation="grow" size="sm"/> : t((t) => t.misc.search)}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <AdsUnitSearchBottom/>
    </>
  );
};
