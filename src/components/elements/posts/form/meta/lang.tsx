import React from 'react';

import {PostMeta, SupportedLanguageNames, SupportedLanguages} from '../../../../../api-def/api';
import {FloatingSelect} from '../../../form/control/floating/select';
import {PostFormControlProps} from '../types';


export const FormMetaLangPicker = <P extends PostMeta>({formState, setPayload}: PostFormControlProps<P>) => {
  const {payload, isPreloaded} = formState;

  return (
    <FloatingSelect
      as="select"
      label="Language"
      defaultValue={payload.lang}
      disabled={isPreloaded}
      data-testid="langSelect"
      onChange={(e) => setPayload('lang', e.target.value as SupportedLanguages)}
    >
      {Object.values(SupportedLanguages).map((lang) => {
        return (
          <option key={lang} value={lang} data-testid="langSelectOptions">
            {SupportedLanguageNames[lang]}
          </option>
        );
      }) }
    </FloatingSelect>
  );
};
