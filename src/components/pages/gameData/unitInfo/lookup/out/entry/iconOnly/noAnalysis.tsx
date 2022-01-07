import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../../../i18n/hook';
import {unitInfoToClickableProps} from '../../../../../../../../utils/services/resources/unitInfo/utils';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import {EntryCommonProps} from '../types';


type Props = EntryCommonProps;

export const IconOnlyEntryNoAnalysis = ({unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1 text-center">
        <Col>
          <UnitIconClickable
            unit={unitInfoToClickableProps(unitInfo, lang)}
            hasAnalysis={false}
            style={{height: '4.5rem'}}
          />
        </Col>
      </Row>
      <Row noGutters className="align-items-center" style={{height: '1.5rem'}}>
        <Col className="text-danger text-center">
          {t((t) => t.posts.analysis.error.unavailable)}
        </Col>
      </Row>
    </>
  );
};
