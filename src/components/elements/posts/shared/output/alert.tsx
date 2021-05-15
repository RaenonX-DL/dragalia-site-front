import React from 'react';

import {Alert} from 'react-bootstrap';

import {SupportedLanguageNames, PostGetSuccessResponse} from '../../../../../api-def/api';
import {makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';

type AlertProps<R extends PostGetSuccessResponse> = {
  response: R,
}

export const AlertIsAlternativeLanguage = <R extends PostGetSuccessResponse>({response}: AlertProps<R>) => {
  const {t, lang} = useI18n();

  return (
    <Alert variant="warning" className="mt-3">
      {
        t(
          (t) => t.posts.message.altLang,
          {
            langUi: SupportedLanguageNames[lang],
            langPost: SupportedLanguageNames[response.lang],
          },
        )
      }
    </Alert>
  );
};

export const AlertOtherLanguageAvailable = <R extends PostGetSuccessResponse>({response}: AlertProps<R>) => {
  const {t} = useI18n();

  return (
    <Alert variant="info" className="mt-3">
      {t((t) => t.posts.message.otherLang)}
      <br/>
      {
        response.otherLangs.map((lang) => (
          <li key={lang}>
            <Alert.Link href={makePostPath(PostPath.ANALYSIS, {lang, pid: response.seqId})}>
              {SupportedLanguageNames[lang]}
            </Alert.Link>
          </li>
        ))
      }
    </Alert>
  );
};
