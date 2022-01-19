import React from 'react';

import {useSession} from 'next-auth/react';
import Col from 'react-bootstrap/Col';

import {AnalysisMeta, PostMeta} from '../../../../../api-def/api';
import {floatingControlHeight} from '../../../../../const/style';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {RowRegular} from '../../../../elements/common/grid/row';
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
  const {data} = useSession();

  const {isValid, isChecking} = useFormMeta({
    formState,
    setAvailability,
    fnIdCheck: (payload) => (
      ApiRequestSender.analysisIdCheck(data?.user.id.toString() || '', payload.unitId, payload.lang)
    ),
    getEffectDependency: (payload) => [payload.unitId, payload.lang],
  });
  const {unitInfoMap} = useUnitInfo();

  const {payload, isPreloaded} = formState;

  const unitInfo = unitInfoMap.get(payload.unitId);

  return (
    <RowRegular>
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
        <RowRegular>
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
              <UnitIcon unitInfo={unitInfo} style={{height: floatingControlHeight}}/>
            </Col>
          }
        </RowRegular>
      </Col>
      <Col lg={3}>
        <FormMetaLangPicker
          formState={formState}
          setPayload={setPayload}
          setAvailability={setAvailability}
        />
      </Col>
    </RowRegular>
  );
};
