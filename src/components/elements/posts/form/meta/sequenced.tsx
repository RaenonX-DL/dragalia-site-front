import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  OptionalSequencedPostMeta,
  PostIdCheckResponse,
  PostMeta,
  SupportedLanguages,
} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {FloatingInput} from '../../../form/control/floating/input';
import {PostFormControlProps} from '../types';
import {useFormMeta} from './hook';
import {FormMetaLangPicker} from './lang';


export type FormMetaProps<P extends PostMeta, R extends PostIdCheckResponse> = PostFormControlProps<P> & {
  titlePlaceholder: string,
  fnIdCheck: (
    uid: string, seqId: number | null, langCode: SupportedLanguages,
  ) => Promise<R>,
};

export const FormSequencedMeta = <P extends OptionalSequencedPostMeta, R extends PostIdCheckResponse>({
  formState,
  setPayload,
  setAvailability,
  titlePlaceholder,
  fnIdCheck,
}: FormMetaProps<P, R>) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  const {isValid, isChecking} = useFormMeta({
    formState,
    setAvailability,
    fnIdCheck: (payload) => (
      fnIdCheck(context?.session?.user.id.toString() || '', Number(payload.seqId) || null, payload.lang)
    ),
    getEffectDependency: (payload) => [payload.seqId, payload.lang],
  });

  const {payload, isPreloaded} = formState;

  return (
    <Row className="g-3">
      <Col lg={2}>
        <FloatingInput
          type="number"
          label={t((t) => t.posts.info.id)}
          isValid={isValid} isInvalid={!isValid}
          onChange={(e) => setPayload('seqId', +e.target.value)}
          value={payload.seqId || ''} disabled={isPreloaded || isChecking} min="1"
        />
      </Col>
      <Col lg={7}>
        <FloatingInput
          type="text"
          label={titlePlaceholder}
          onChange={(e) => setPayload('title', e.target.value)}
          value={payload.title} required
        />
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
