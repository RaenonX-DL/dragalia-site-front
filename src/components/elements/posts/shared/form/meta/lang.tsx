import React from 'react';

import Form from 'react-bootstrap/Form';

import {PostMeta, SupportedLanguageNames, SupportedLanguages} from '../../../../../../api-def/api';
import {PostFormControlProps} from '../types';


export const FormMetaLangPicker = <P extends PostMeta>({formState, setPayload}: PostFormControlProps<P>) => {
  const {payload, isPreloaded} = formState;

  return (
    <Form.Control
      as="select" defaultValue={payload.lang} disabled={isPreloaded} data-testid="langSelect"
      onChange={(e) => setPayload('lang', e.target.value as SupportedLanguages)}
    >
      {
        Object.values(SupportedLanguages).map((lang) => {
          return (
            <option key={lang} value={lang} data-testid="langSelectOptions">
              {SupportedLanguageNames[lang]}
            </option>
          );
        })
      }
    </Form.Control>
  );
};
