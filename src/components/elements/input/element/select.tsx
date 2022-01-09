import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {InputProps} from '../../common/types';
import {FloatingSelect} from '../../form/control/floating/select';
import {InputEntrySelect} from '../panel/types';


type Props<E, T> = InputEntrySelect<E, T> & InputProps<T>;

export const InputSelectEntry = <E, T>({
  title,
  getValue,
  getUpdatedInputData,
  getText,
  setInputData,
  defaultEntry,
  values,
}: Props<E, T>) => {
  return (
    <Row className="mb-2">
      <Col>
        <FloatingSelect
          label={title}
          defaultValue={getValue(defaultEntry)}
          onChange={(e) => setInputData(getUpdatedInputData(e.target.value))}
        >
          {values.map((entry, idx) => {
            const value = getValue(entry);

            return (
              <option key={idx} value={value}>
                {getText ? getText(entry) : value}
              </option>
            );
          })}
        </FloatingSelect>
      </Col>
    </Row>
  );
};
