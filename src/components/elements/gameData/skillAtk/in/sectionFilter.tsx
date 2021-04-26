import React from 'react';

import {Form} from 'react-bootstrap';

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
  return (
    <>
      <SectionTitle
        titleLabel={'game.skill_atk.name.filter'}
        descriptionLabel={'game.skill_atk.desc.filter'}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_element'}
        descriptionLabel={'game.skill_atk.desc.filter_element'}
      />
      <EnumChecksBox
        options={elementEnums.elemental}
        inputData={inputData}
        inputKey="filterElementCode"
        setInputData={setInputData}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_affliction'}
        descriptionLabel={'game.skill_atk.desc.filter_affliction'}
      />
      <EnumChecksBox
        options={conditionEnums.afflictions}
        inputData={inputData}
        inputKey="filterAfflictionCondCode"
        setInputData={setInputData}
      />
      <SectionSubTitle
        titleLabel={'game.skill_atk.name.filter_other'}
        descriptionLabel={'game.skill_atk.desc.filter_other'}
      />
      <Form.Group className="mb-3 text-center">
        <InlineCheck
          titleLabel={'game.skill_atk.name.filter_shared_only'}
          inputData={inputData}
          inputKey="filterSharedOnly"
          setInputData={setInputData}
        />
      </Form.Group>
    </>
  );
};
