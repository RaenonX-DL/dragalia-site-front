import React from 'react';

import {Form} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {EnumChecksBox} from '../../elements/enumChecksBox';
import {InlineCheck} from '../../elements/inlineCheck';
import {SectionSubTitle} from '../../elements/subTitle';
import {SectionTitle} from '../../elements/title';
import {
  SectionProps,
  SectionPropsCondEnums,
  SectionPropsElemEnums,
} from './props';

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
      <EnumChecksBox
        options={elementEnums.elemental}
        inputData={inputData}
        inputKey="filterElementCode"
        setInputData={setInputData}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.filterAffliction)}
        description={t((t) => t.game.skillAtk.desc.filterAffliction)}
      />
      <EnumChecksBox
        options={conditionEnums.afflictions}
        inputData={inputData}
        inputKey="filterAfflictionCondCode"
        setInputData={setInputData}
      />
      <SectionSubTitle
        title={t((t) => t.game.skillAtk.name.filterOther)}
        description={t((t) => t.game.skillAtk.desc.filterOther)}
      />
      <Form.Group className="mb-3 text-center">
        <InlineCheck
          title={t((t) => t.game.skillAtk.name.filterSharedOnly)}
          inputData={inputData}
          inputKey="filterSharedOnly"
          setInputData={setInputData}
        />
      </Form.Group>
    </>
  );
};
