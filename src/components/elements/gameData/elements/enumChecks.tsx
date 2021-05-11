import React from 'react';

import * as CSS from 'csstype';

import {useTranslation} from '../../../../i18n/utils';
import {DepotPaths, EnumEntry} from '../../../../utils/services/resources';
import {ChecksBase, ChecksPropsDisplay} from './checksBase';
import {InlineCheckBase} from './inlineCheckBase';


export type EnumChecksProps<K extends string, V, T extends { [key in K]: V }> =
  ChecksPropsDisplay<EnumEntry, K, V, T> & {
  imageHeight?: CSS.Property.Height<string | number>,
}


type EnumChecksPropsInternal<K extends string, V, T extends { [key in K]: V }> =
  EnumChecksProps<K, V, T> & {
  type: 'checkbox' | 'radio',
  onChange: (code: number, checked: boolean) => () => void,
  isChecked: (code: number) => boolean,
}


export const EnumChecks = <K extends string, V, T extends { [key in K]: V }>({
  options,
  inputKey,
  imageHeight,
  type,
  onChange,
  isChecked,
}: EnumChecksPropsInternal<K, V, T>) => {
  const {lang} = useTranslation();

  return (
    <ChecksBase
      options={options}
      renderCheckItem={(enumEntry) => {
        const {code} = enumEntry;

        return (
          <InlineCheckBase
            id={`${inputKey}${enumEntry.name}`} key={enumEntry.name}
            type={type}
            groupName={inputKey}
            titleLabel={enumEntry.trans[lang] || enumEntry.name}
            imageUrl={enumEntry.imagePath ? DepotPaths.getImageURL(enumEntry.imagePath) : undefined}
            imageHeight={imageHeight}
            onChange={(checked) => onChange(code, checked && isChecked(code))}
            checked={isChecked(enumEntry.code)}
          />
        );
      }}
    />
  );
};
