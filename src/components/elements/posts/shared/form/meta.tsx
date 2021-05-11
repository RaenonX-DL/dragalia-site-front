import React from 'react';

import {Col, Form, Row} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {CookiesControl} from '../../../../../utils/cookies';
import {
  PostMetaPayload,
  SupportedLanguages,
  SupportedLanguageNames,
  PostIdCheckResponse,
} from '../../../../../utils/services/api';
import {DelayedCheckState} from '../../../common/delayedCheck';
import {isFormStateValid, PostFormControlProps} from './types';

export type FormMetaProps<P extends PostMetaPayload, R extends PostIdCheckResponse> = PostFormControlProps<P> & {
  titlePlaceholder: string,
  fnIdCheck: (
    googleUid: string, seqId: number | null, langCode: SupportedLanguages,
  ) => Promise<R>,
}

export const FormMeta = <P extends PostMetaPayload, R extends PostIdCheckResponse>({
  formState,
  setPayload,
  setAvailability,
  titlePlaceholder,
  fnIdCheck,
}: FormMetaProps<P, R>) => {
  // TEST: Form meta validation
  //  - (Use the tests exist at the backend)

  const {t} = useTranslation();

  const {payload, isPreloaded} = formState;

  const [checkState, setCheckState] = React.useState<DelayedCheckState>({
    isChecking: false,
    checkTimer: null,
  });

  const isValid = isFormStateValid(formState);

  const checkAvailability = (seqId: number | undefined, langCode: SupportedLanguages) => {
    setCheckState({...checkState, isChecking: true});
    fnIdCheck(CookiesControl.getGoogleUid() || '', Number(seqId) || null, langCode)
      .then((data) => setAvailability(data.available))
      .catch(() => setAvailability(false))
      .finally(() => setCheckState({...checkState, isChecking: false}));
  };

  // Check availability on `payload.seqId` or `payload.lang` changed
  // - `timeout` for delaying the availability check
  React.useEffect(
    () => {
      if (checkState.checkTimer) {
        clearTimeout(checkState.checkTimer);
        setCheckState({...checkState, checkTimer: null});
      }

      const checkTimer = setTimeout(() => {
        checkAvailability(payload.seqId, payload.lang as SupportedLanguages);
      }, 1000);
      setCheckState({...checkState, checkTimer});
    },
    [payload.seqId, payload.lang],
  );

  return (
    <Row>
      <Col lg={2}>
        <Form.Control
          className="mb-2" type="number" placeholder={t('posts.info.id')}
          isValid={isValid} isInvalid={!isValid}
          onChange={(e) => setPayload('seqId', e.target.value)}
          value={payload.seqId || ''} disabled={isPreloaded || checkState.isChecking} min="1"
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
        <Form.Control
          as="select" defaultValue={payload.lang} disabled={isPreloaded}
          onChange={(e) => setPayload('lang', e.target.value)}
        >
          {
            Object.values(SupportedLanguages).map((lang) => {
              return (<option key={lang} value={lang}>{SupportedLanguageNames[lang]}</option>);
            })
          }
        </Form.Control>
      </Col>
    </Row>
  );
};
