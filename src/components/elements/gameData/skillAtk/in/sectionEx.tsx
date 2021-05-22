import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {InlineCheck} from '../../../common/check/inlineCheck';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionEx = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.ex)}
        description={t((t) => t.game.skillAtk.desc.ex)}
      />
      <div className="text-center">
        <InlineCheck
          title={t((t) => t.game.skillAtk.name.exBlade)}
          inputData={inputData}
          inputKey="exBlade"
          setInputData={setInputData}
        />
        <InlineCheck
          title={t((t) => t.game.skillAtk.name.exWand)}
          inputData={inputData}
          inputKey="exWand"
          setInputData={setInputData}
        />
      </div>
    </>
  );
};
