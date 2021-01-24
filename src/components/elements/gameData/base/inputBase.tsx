import React, {ChangeEventHandler} from 'react';
import {ButtonGroup, Col, Form, Image, Row, ToggleButton} from 'react-bootstrap';
import {ButtonVariant} from 'react-bootstrap/types';
import {useTranslation} from 'react-i18next';
import {DepotPaths, EnumEntry} from '../../../../utils/services/resources';

import {OverlayPopover, OverlayTooltip} from '../../express';

type TitledProps = {
  titleLabel: string,
}


type DetailedProps = TitledProps & {
  descriptionLabel: string
}


export const SectionTitle = ({titleLabel, descriptionLabel}: DetailedProps) => {
  const {t} = useTranslation();

  return (
    <OverlayPopover title={t(titleLabel)} content={t(descriptionLabel)}>
      <h4 className="mb-3">{t(titleLabel)}</h4>
    </OverlayPopover>
  );
};


export const SectionSubTitle = ({titleLabel, descriptionLabel}: DetailedProps) => {
  const {t} = useTranslation();

  return (
    <OverlayPopover title={t(titleLabel)} content={t(descriptionLabel)}>
      <h5 className="mb-3">{t(titleLabel)}</h5>
    </OverlayPopover>
  );
};


type NumericalInputProps = DetailedProps & {
  name: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  defaultValue?: number,
  required?: boolean,
  maxValue?: number
}


export const NumericalInput = (props: NumericalInputProps) => {
  const {titleLabel, descriptionLabel, name, onChange, defaultValue, maxValue, required = true} = props;

  const {t} = useTranslation();

  return (
    <Row className="mb-3">
      <OverlayPopover title={t(titleLabel)} content={t(descriptionLabel)}>
        <Form.Label column className="text-center">{t(titleLabel)}</Form.Label>
      </OverlayPopover>
      <Col>
        <Form.Control
          type="number" value={defaultValue} name={name} max={maxValue}
          onChange={onChange} required={required}/>
      </Col>
    </Row>
  );
};


type InlineChecksProps = TitledProps & {
  onChange: ChangeEventHandler<HTMLInputElement>,
  type?: 'checkbox' | 'radio',
  variant?: ButtonVariant,
  groupName?: string,
  imageUrl?: string,
  id?: string,
  checked?: boolean,
  imageHeight?: string,
}


export const InlineChecks = (props: InlineChecksProps) => {
  const {
    titleLabel,
    type = 'checkbox',
    variant = 'outline-secondary',
    groupName = '',
    imageUrl,
    id,
    checked,
    onChange,
    imageHeight,
  } = props;

  const {t} = useTranslation();

  let label;
  if (imageUrl) {
    label = (
      <OverlayTooltip text={t(titleLabel)}>
        <Image src={imageUrl} style={{height: imageHeight || '1.5rem'}}/>
      </OverlayTooltip>
    );
  } else {
    label = <span className="text-light">{t(titleLabel)}</span>;
  }

  console.log(label);

  return (
    <ButtonGroup toggle className="m-1">
      <ToggleButton
        type={type}
        variant={variant}
        checked={checked}
        onChange={onChange}
        name={groupName}
        id={id || titleLabel}
        value="1"
      >
        {label}
      </ToggleButton>
    </ButtonGroup>
  );
};


type RadioCheckLabel = {
  label: string,
  code: number
}


type RadioChecksProps = {
  labels: Array<RadioCheckLabel>,
  groupName: string,
  onChangeWrap: (code: number) => ChangeEventHandler<HTMLInputElement>,
  checkedCode?: number,
}


export const RadioChecks = ({labels, groupName, onChangeWrap, checkedCode}: RadioChecksProps) => {
  return (
    <div className="text-center mb-3">
      {
        labels.map(({label, code}: RadioCheckLabel) => (
          <InlineChecks
            titleLabel={label} groupName={groupName} type="radio" key={label}
            onChange={onChangeWrap(code)} checked={code === checkedCode}/>
        ))
      }
    </div>
  );
};


type EnumChecksProps = {
  enumEntries: Array<EnumEntry>,
  type: 'checkbox' | 'radio',
  onChange: (code: number) => ChangeEventHandler<HTMLInputElement>,
  groupName?: string,
  isChecked?: (code: number) => boolean,
  imageHeight?: string,
}


export const EnumResourceChecks = (props: EnumChecksProps) => {
  const {enumEntries, type, onChange, groupName = '', isChecked, imageHeight} = props;

  const {i18n} = useTranslation();

  return (
    <Form.Group className="mb-3 text-center">
      {
        enumEntries.map((enumEntry: EnumEntry) => {
          return (
            <InlineChecks
              id={`${groupName}${enumEntry.name}`} key={enumEntry.name} type={type} groupName={groupName}
              titleLabel={enumEntry.trans[i18n.language] || enumEntry.name}
              imageUrl={enumEntry.imagePath ? DepotPaths.getImageURL(enumEntry.imagePath) : undefined}
              imageHeight={imageHeight}
              onChange={onChange(enumEntry.code)} checked={isChecked && isChecked(enumEntry.code)}/>
          );
        })
      }
    </Form.Group>
  );
};
