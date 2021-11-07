import {SupportedLanguages} from '../../api-def/api';


export type TextTransformOptions = {
  text: string,
  lang: SupportedLanguages,
};

export type TextTransformer = (payload: TextTransformOptions) => Promise<string>;
