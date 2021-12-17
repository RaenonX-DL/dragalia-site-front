import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../../../i18n/hook';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import {EntryCommonProps} from '../types';


type Props = EntryCommonProps;

export const IconOnlyEntryNoAnalysis = ({unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1">
        <Col>
          <UnitIconClickable
            unit={{
              id: unitInfo.id,
              name: unitInfo.name[lang],
              icon: {
                type: unitInfo.type,
                name: unitInfo.iconName,
              },
            }}
            hasAnalysis={false}
            style={{width: '100%'}}
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
