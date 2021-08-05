import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {EnumDataPack} from '../../props';
import {CalculatedSkillEntry} from '../../types';
import styles from '../section.module.css';
import {SpEfficiencyTable} from './efficiency';
import {SpInfoTable} from './info';


export type SectionSpInfoProps = Pick<EnumDataPack, 'statusEnums'> & {
  calculatedData: CalculatedSkillEntry,
}

export const SectionSpInfo = ({calculatedData, statusEnums}: SectionSpInfoProps) => {
  return (
    <div className={`${styles.section} text-center small`}>
      <Form.Row className="align-items-center">
        <Col lg={6}>
          <SpEfficiencyTable calculatedData={calculatedData} statusEnums={statusEnums}/>
        </Col>
        <Col lg={6}>
          <SpInfoTable calculatedData={calculatedData}/>
        </Col>
      </Form.Row>
    </div>
  );
};
