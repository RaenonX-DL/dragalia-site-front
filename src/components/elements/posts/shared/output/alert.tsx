import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {SupportedLanguageNames, PostGetResponse} from '../../../../../api-def/api';
import {PostPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {NextLink} from '../../../common/link';


type AlertProps<R extends PostGetResponse> = {
  response: R,
}

export const AlertIsAlternativeLanguage = <R extends PostGetResponse>({response}: AlertProps<R>) => {
  const {t, lang} = useI18n();

  return (
    <Alert variant="warning">
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
    <Alert variant="info">
      {t((t) => t.posts.message.otherLang)}
      <br/>
      {
        response.otherLangs.map((lang) => (
          <li key={lang}>
            <NextLink href={makePostPath(targetPath, {pid, lang})} passHref>
              <Alert.Link>
                {SupportedLanguageNames[lang]}
              </Alert.Link>
            </NextLink>
          </li>
        ))
      }
    </Alert>
  );
};
