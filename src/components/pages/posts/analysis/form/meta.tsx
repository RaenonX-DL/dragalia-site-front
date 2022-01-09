import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {AnalysisMeta, PostMeta} from '../../../../../api-def/api';
import {floatingControlHeight} from '../../../../../const/style';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {FloatingInput} from '../../../../elements/form/control/floating/input';
import {UnitIcon} from '../../../../elements/gameData/unit/icon';
import {useFormMeta} from '../../../../elements/posts/form/meta/hook';
import {FormMetaLangPicker} from '../../../../elements/posts/form/meta/lang';
import {PostFormControlProps} from '../../../../elements/posts/form/types';


export type FormAnalysisMetaProps<P extends PostMeta> = PostFormControlProps<P>;

export const FormAnalysisMeta = <P extends AnalysisMeta>({
  formState,
  setPayload,
  setAvailability,
}: FormAnalysisMetaProps<P>) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {isValid, isChecking} = useFormMeta({
    formState,
    setAvailability,
    fnIdCheck: (payload) => (
      ApiRequestSender.analysisIdCheck(context?.session?.user.id.toString() || '', payload.unitId, payload.lang)
    ),
    getEffectDependency: (payload) => [payload.unitId, payload.lang],
  });
  const {unitInfoMap} = useUnitInfo();

  const {payload, isPreloaded} = formState;

  const unitInfo = unitInfoMap.get(payload.unitId);

  return (
    <Row className="g-3">
      <Col lg={3}>
        <FloatingInput
          label={t((t) => t.posts.info.id)}
          isValid={isValid} isInvalid={!isValid}
          onChange={(e) => {
            if (Number(e.target.value) || !e.target.value) {
              setPayload('unitId', +e.target.value);
            }
          }}
          value={payload.unitId}
          disabled={isPreloaded || isChecking}
        />
      </Col>
      <Col lg={6}>
        <Row className="g-3">
          <Col>
            <FloatingInput
              label={t((t) => t.game.unitInfo.text.unitName)}
              type="text"
              value={unitInfo?.name[lang] || ''}
              disabled
            />
          </Col>
          {
            unitInfo &&
            <Col xs="auto">
              <UnitIcon unitInfo={unitInfo} className="ml-1" style={{height: floatingControlHeight}}/>
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
    </Row>
  );
};
