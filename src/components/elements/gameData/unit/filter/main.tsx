import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import {EnumEntry} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {useUnitProps} from '../../../../hooks/unitProps';
import {AdsPageTop, AdsUnitSearchBottom} from '../../../common/ads/main';
import {DropdownButton} from '../../../common/button/dropdown';
import {CheckOption} from '../../../common/check/types';
import {RowTight} from '../../../common/grid/row';
import {FloatingInput} from '../../../form/control/floating/input';
import {InputPanel} from '../../../input/panel/main';
import {InputEntries} from '../../../input/panel/types';
import styles from './main.module.css';
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
          <RowTight>
            <Col xs={12} md>
              <FloatingInput
                value={inputData.keyword}
                label={t((t) => t.misc.searchKeyword)}
                onChange={(e) => (
                  setInputData({...inputData, keyword: e.target.value})
                )}
              />
            </Col>
            <Col xs md="auto" className={styles.button}>
              <DropdownButton
                title={sortTitle}
                variant="outline-light"
                options={Object.entries(sortOrderNames)}
                isActive={([sortBy]) => sortBy === inputData.sortBy}
                onClick={([sortBy]) => setInputData({...inputData, sortBy})}
                getOptionText={([_, getNameFunc]) => t(getNameFunc as GetTranslationFunction)}
              />
            </Col>
            <Col xs="auto" className={styles.button}>
              <Button variant="outline-info" type="submit" disabled={disabled}>
                {disabled ? <Spinner animation="grow" size="sm"/> : t((t) => t.misc.search)}
              </Button>
            </Col>
          </RowTight>
        </Form>
      </div>
      <AdsUnitSearchBottom/>
    </>
  );
};
