import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../../../../../i18n/hook';
import {TimeAgo} from '../../../../../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../../../../../../elements/common/icons';
import {UnitIconClickable} from '../../../../../../../elements/gameData/unit/iconClickable';
import {EntryPropsHasAnalysis} from '../types';


export const IconOnlyEntryWithAnalysis = ({
  unitInfo,
  analysisMeta,
  simplified = false,
}: EntryPropsHasAnalysis) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row noGutters className="pt-1" style={{height: '2.5rem'}}>
        <Col className="mr-2">
          <UnitIconClickable
            unit={{
              id: unitInfo.id,
              name: unitInfo.name[lang],
              icon: {
                type: unitInfo.type,
                name: unitInfo.name[lang],
              },
            }}
            hasAnalysis
          />
        </Col>
      </Row>
      {
        !simplified &&
        <>
          <Row>
            <Col xs="auto" className="text-right text-muted">
              <small>
                {t(
                  (t) => t.posts.info.viewCountComplete,
                  {count: analysisMeta.viewCount.toString()},
                )}
              </small>
            </Col>
          </Row>
          <Row className="small" style={{height: '1.5rem'}}>
            <Col className="text-center">
              <IconEdit/>&nbsp;
              <TimeAgo epoch={analysisMeta.modifiedEpoch}/>
            </Col>
          </Row>
          <Row className="small" style={{height: '1.5rem'}}>
            <Col className="text-center d-none d-lg-block">
              <IconPublish/>&nbsp;
              <TimeAgo epoch={analysisMeta.publishedEpoch}/>
            </Col>
          </Row>
        </>
      }
    </>
  );
};
