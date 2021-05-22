import {SupportedLanguages} from '../../../../../api-def/api';

export type MultiLangText = {
  [lang in SupportedLanguages]: string
}
