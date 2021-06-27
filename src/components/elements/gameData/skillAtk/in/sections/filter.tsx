import React from 'react';

import Form from 'react-bootstrap/Form';

import {useI18n} from '../../../../../../i18n/hook';
import {EnumCheckboxGroup} from '../../../../common/check/enum/checkbox';
import {CheckboxInput} from '../../../../common/check/item/checkbox';
import {SectionSubTitle} from '../../../elements/subTitle';
import {SectionTitle} from '../../../elements/title';
import {
  SectionProps,
  SectionPropsCondEnums,
  SectionPropsElemEnums,
} from '../props';
import {overwriteInputData} from '../utils';


type SectionFilterProps =
  SectionProps &
  SectionPropsCondEnums &
  SectionPropsElemEnums;

export const SectionFilter = ({
  inputData,
  setInputData,
  elementEnums,
  conditionEnums,
}: SectionFilterProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.filter)}
        description={t((t) => t.game.skillAtk.desc.filter)}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.filterElement)}
        description={t((t) => t.game.skillAtk.desc.filterElement)}
      />
      <EnumCheckboxGroup
        options={elementEnums.elemental}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.filter.elemCodes}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {elemCodes: newValue}})}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.filterAffliction)}
        description={t((t) => t.game.skillAtk.desc.filterAffliction)}
      />
      <EnumCheckboxGroup
        options={conditionEnums.afflictions}
        inputData={inputData}
        setInputData={setInputData}
        getValue={(inputData) => inputData.filter.afflictionCondCode}
        getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {afflictionCondCode: newValue}})}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.filterOther)}
        description={t((t) => t.game.skillAtk.desc.filterOther)}
      />
      <Form.Group className="mb-3 text-center">
        <CheckboxInput
          text={t((t) => t.game.skillAtk.name.filterSharedOnly)}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.filter.sharedOnly}
          getUpdatedInputData={(newValue) => overwriteInputData(inputData, {filter: {sharedOnly: newValue}})}
        />
      </Form.Group>
    </>
  );
};
