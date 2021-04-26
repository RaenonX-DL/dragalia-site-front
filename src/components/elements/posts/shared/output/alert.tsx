import React from 'react';

import {Alert} from 'react-bootstrap';

import {SupportedLanguageNames, PostGetSuccessResponse} from '../../../../../api-def/api';
import Path from '../../../../../const/path/definitions';
import {useTranslation} from '../../../../../i18n/utils';

type AlertProps<R extends PostGetSuccessResponse> = {
  response: R,
}

export const AlertIsAlternativeLanguage = <R extends PostGetSuccessResponse>({response}: AlertProps<R>) => {
  const {t, lang} = useTranslation();

  return (
    <Alert variant="warning" className="mt-3">
      {
        t(
          'posts.message.alt_lang',
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
  const {t} = useTranslation();

  return (
    <Alert variant="info" className="mt-3">
      {t('posts.message.other_lang')}
      <br/>
      {
        response.otherLangs.map((langCode) => (
          <li key={langCode}>
            <Alert.Link href={Path.getAnalysis(response.seqId) + `?lang=${langCode}`}>
              {SupportedLanguageNames[langCode]}
            </Alert.Link>
          </li>
        ))
      }
    </Alert>
  );
};
