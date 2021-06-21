import {transformQuickReference} from './transformers/quickReference';
import {TextTransformer} from './type';


const transformers: Array<TextTransformer> = [
  transformQuickReference,
];

export const processText: TextTransformer = async (payload) => {
  for (const transformer of transformers) {
    payload.text = await transformer(payload);
  }
  return payload.text;
};
