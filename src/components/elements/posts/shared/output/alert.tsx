import React from 'react';

import {Alert} from 'react-bootstrap';

import {SupportedLanguageNames, PostGetResponse} from '../../../../../api-def/api';
import {makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';

type AlertProps<R extends PostGetResponse> = {
  response: R,
}

export const AlertIsAlternativeLanguage = <R extends PostGetResponse>({response}: AlertProps<R>) => {
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

type AlertOtherLangProps<R extends PostGetResponse> = AlertProps<R> & {
  pid: number,
  targetPath: PostPath,
}

export const AlertOtherLanguageAvailable = <R extends PostGetResponse>({
  response,
  pid,
  targetPath,
}: AlertOtherLangProps<R>) => {
  const {t} = useI18n();

  return (
    <Alert variant="info" className="mt-3">
      {t((t) => t.posts.message.otherLang)}
      <br/>
      {
        response.otherLangs.map((lang) => (
          <li key={lang}>
            <Alert.Link href={makePostPath(targetPath, {lang, pid})}>
              {SupportedLanguageNames[lang]}
            </Alert.Link>
          </li>
        ))
      }
    </Alert>
  );
};
