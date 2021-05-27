import React from 'react';

import * as CSS from 'csstype';

import {DepotPaths, EnumEntry} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {ChecksBase, ChecksPropsDisplay} from './checksBase';
import {InlineCheckBase} from './inlineCheckBase';
import {CheckType} from './types';


export type EnumChecksProps<K extends string, V, T extends { [key in K]: V }> =
  ChecksPropsDisplay<EnumEntry, K, V, T> & {
  imageHeight?: CSS.Property.Height<string | number>,
}

type EnumChecksPropsInternal<K extends string, V, T extends { [key in K]: V }> =
  EnumChecksProps<K, V, T> & {
  type: CheckType,
  onChange: (code: number, checked: boolean) => void,
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
  const {lang} = useI18n();

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
            title={enumEntry.trans[lang] || enumEntry.name}
            imageUrl={enumEntry.imagePath ? DepotPaths.getImageURL(enumEntry.imagePath) : undefined}
            imageHeight={imageHeight}
            onChange={(checked) => onChange(code, checked)}
            checked={isChecked(enumEntry.code)}
          />
        );
      }}
    />
  );
};
