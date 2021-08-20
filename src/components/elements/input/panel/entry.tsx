import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {EnumEntry} from '../../../../api-def/resources';
import {EnumCheckboxGroup} from '../../common/check/enum/checkbox';
import {EnumRadioGroup} from '../../common/check/enum/radio';
import {CheckboxGroup} from '../../common/check/group/checkbox';
import {RadioGroup} from '../../common/check/group/radio';
import {CheckboxInput} from '../../common/check/item/checkbox';
import {CheckOption} from '../../common/check/types';
import {NumericInput} from '../../common/input/numeric';
import {SectionSubTitle} from '../../gameData/subTitle';
import {SectionTitle} from '../../gameData/title';
import {InputEntryProps} from './types';


export const InputPanelEntry = <E extends CheckOption, E2 extends EnumEntry, T>({
  inputEntry,
  inputData,
  setInputData,
}: InputEntryProps<E, E2, T>) => {
  if (inputEntry.type === 'title') {
    return <SectionTitle title={inputEntry.title} description={inputEntry.description}/>;
  }
  if (inputEntry.type === 'subTitle') {
    return <SectionSubTitle title={inputEntry.title} description={inputEntry.description}/>;
  }
  if (inputEntry.type === 'separator') {
    return <hr/>;
  }
  if (inputEntry.type === 'inputNumber') {
    return (
      <NumericInput
        {...inputEntry}
        title={inputEntry.title}
        description={inputEntry.description}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'inputCheckGroup') {
    return (
      <div className="mb-2 text-center">
        {inputEntry.checkboxes.map((checkboxProps, index) => (
          <CheckboxInput
            key={index}
            {...checkboxProps}
            inputData={inputData}
            setInputData={setInputData}
          />
        ))}
      </div>
    );
  }
  if (inputEntry.type === 'inputRadioGroup') {
    return (
      <RadioGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'enumCheckGroup') {
    return (
      <EnumCheckboxGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'enumRadioGroup') {
    return (
      <EnumRadioGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'arrayCheckGroup') {
    return (
      <CheckboxGroup
        {...inputEntry}
        inputData={inputData}
        setInputData={setInputData}
      />
    );
  }
  if (inputEntry.type === 'select') {
    const {defaultEntry, title, getValue, getText, getUpdatedInputData} = inputEntry;

    return (
      <Row className="mb-2">
        <Form.Label column className="text-center">
          {title}
        </Form.Label>
        <Col>
          <Form.Control
            as="select" defaultValue={getValue(defaultEntry)}
            onChange={(e) => setInputData(getUpdatedInputData(e.target.value))}
          >
            {inputEntry.values.map((entry, idx) => {
              const value = getValue(entry);

              return (
                <option key={idx} value={value}>
                  {getText ? getText(entry) : value}
                </option>
              );
            })}
          </Form.Control>
        </Col>
      </Row>
    );
  }

  throw new Error(`Unhandled input entry: ${inputEntry}`);
};
