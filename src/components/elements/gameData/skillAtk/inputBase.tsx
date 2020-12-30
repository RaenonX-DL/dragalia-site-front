import React, {ChangeEventHandler} from 'react';
import {Col, Form, Image, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DepotPaths, EnumEntry} from '../../../../utils/services/resources';

import {OverlayPopover} from '../../express';

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
  type?: 'checkbox' | 'radio' | 'switch',
  groupName?: string,
  imageUrl?: string,
  id?: string,
  checked?: boolean
}


export const InlineChecks = (props: InlineChecksProps) => {
  const {titleLabel, type = 'checkbox', groupName = '', imageUrl, id, checked, onChange} = props;

  const {t} = useTranslation();

  let label;
  if (imageUrl) {
    label = <Image src={imageUrl} style={{height: '1.5rem'}}/>;
  } else {
    label = t(titleLabel);
  }

  return (
    <Form.Check
      inline label={label} type={type} name={groupName} id={id || titleLabel}
      checked={checked} onChange={onChange}/>
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
  type: 'checkbox' | 'radio' | 'switch',
  onChange: (code: number) => ChangeEventHandler<HTMLInputElement>,
  groupName?: string,
  isChecked?: (code: number) => boolean
}


export const EnumResourceChecks = (props: EnumChecksProps) => {
  const {enumEntries, type, onChange, groupName = '', isChecked} = props;

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
              onChange={onChange(enumEntry.code)} checked={isChecked && isChecked(enumEntry.code)}/>
          );
        })
      }
    </Form.Group>
  );
};
