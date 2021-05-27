import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {NumericInput} from '../../../common/input/numeric';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionBuff = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.buffBoost)}
        description={t((t) => t.game.skillAtk.desc.buffBoost)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffCount)}
        description={t((t) => t.game.skillAtk.desc.buffCount)}
        inputData={inputData}
        inputKey="buffCount"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffZoneSelf)}
        description={t((t) => t.game.skillAtk.desc.buffZoneSelf)}
        inputData={inputData}
        inputKey="buffZoneSelf"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.buffZoneAlly)}
        description={t((t) => t.game.skillAtk.desc.buffZoneAlly)}
        inputData={inputData}
        inputKey="buffZoneAlly"
        setInputData={setInputData}
      />
    </>
  );
};
