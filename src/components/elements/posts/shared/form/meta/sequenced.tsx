import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {
  OptionalSequencedPostMeta,
  PostIdCheckResponse,
  PostMeta,
  SupportedLanguages,
} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {PostFormControlProps} from '../types';
import {useFormMeta} from './hook';
import {FormMetaLangPicker} from './lang';


export type FormMetaProps<P extends PostMeta, R extends PostIdCheckResponse> = PostFormControlProps<P> & {
  titlePlaceholder: string,
  fnIdCheck: (
    uid: string, seqId: number | null, langCode: SupportedLanguages,
  ) => Promise<R>,
}

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
    setPayload,
    setAvailability,
    fnIdCheck: (payload) => (
      fnIdCheck(context?.session?.user.id.toString() || '', Number(payload.seqId) || null, payload.lang)
    ),
    getEffectDependency: (payload) => [payload.seqId, payload.lang],
  });

  const {payload, isPreloaded} = formState;

  return (
    <Form.Row>
      <Col lg={2}>
        <Form.Control
          className="mb-2" type="number" placeholder={t((t) => t.posts.info.id)}
          isValid={isValid} isInvalid={!isValid}
          onChange={(e) => setPayload('seqId', +e.target.value)}
          value={payload.seqId || ''} disabled={isPreloaded || isChecking} min="1"
        />
      </Col>
      <Col lg={7}>
        <Form.Control
          className="mb-2" type="text" placeholder={titlePlaceholder}
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
    </Form.Row>
  );
};
