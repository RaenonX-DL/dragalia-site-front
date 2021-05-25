import React from 'react';

import {Col, Form, Row} from 'react-bootstrap';

import {AnalysisMeta} from '../../../../../api-def/api/post/analysis/elements';
import {PostMeta} from '../../../../../api-def/api/post/base/elements/common';
import {DepotPaths} from '../../../../../api-def/resources/paths';
import {useI18n} from '../../../../../i18n/hook';
import {CookiesControl} from '../../../../../utils/cookies';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo';
import {useFormMeta} from '../../shared/form/meta/hook';
import {FormMetaLangPicker} from '../../shared/form/meta/lang';
import {PostFormControlProps} from '../../shared/form/types';


export type FormAnalysisMetaProps<P extends PostMeta> = PostFormControlProps<P>

export const FormAnalysisMeta = <P extends AnalysisMeta>({
  formState,
  setPayload,
  setAvailability,
}: FormAnalysisMetaProps<P>) => {
  const {t, lang} = useI18n();

  const {isValid, isChecking} = useFormMeta({
    formState,
    setPayload,
    setAvailability,
    fnIdCheck: (payload) => (
      ApiRequestSender.analysisPostIdCheck(CookiesControl.getGoogleUid() || '', payload.unitId, payload.lang)
    ),
    getEffectDependency: (payload) => [payload.unitId, payload.lang],
  });
  const {unitInfoMap} = useUnitInfo();

  const {payload, isPreloaded} = formState;

  const unitInfo = unitInfoMap.get(payload.unitId);
  console.log(payload.unitId, unitInfo);

  return (
    <Form.Row>
      <Col lg={3}>
        <Form.Control
          placeholder={t((t) => t.posts.info.id)}
          isValid={isValid} isInvalid={!isValid}
          onChange={(e) => {
            if (Number(e.target.value) || !e.target.value) {
              setPayload('unitId', +e.target.value);
            }
          }}
          value={payload.unitId} disabled={isPreloaded || isChecking}
        />
      </Col>
      <Col lg={6} className={unitInfo ? 'pr-0' : ''}>
        <Row noGutters>
          <Col>
            <Form.Control className="mb-2" type="text" value={unitInfo?.name[lang] || ''} disabled/>
          </Col>
          {
            unitInfo &&
            <Col xs="auto">
              <img
                src={DepotPaths.getCharaIconURL(unitInfo.iconName)}
                alt={unitInfo.id.toString()}
                className="ml-1"
                style={{height: '2.5rem'}}
              />
            </Col>
          }
        </Row>
      </Col>
      <Col lg={3}>
        <FormMetaLangPicker
          formState={formState}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      </Col>
    </Form.Row>
  );
};
