import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {AdsToolBottom, AdsToolTop} from '../../../elements/common/ads/main';
import {NumericInputProps} from '../../../elements/common/input/numeric';
import {EnmityHPFields} from './hp';
import {EnmityModsFields} from './mods';
import {EnmityData} from './types';
import {generateEnmityData} from './utils';


export const EnmityCalculator = () => {
  const {t} = useI18n();
  const [input, setInput] = React.useState<EnmityData>(generateEnmityData());

  const commonInputProps: Pick<NumericInputProps<EnmityData>, 'inputData' | 'setInputData'> = {
    inputData: input,
    setInputData: setInput,
  };

  return (
    <>
      <AdsToolTop/>
      <h3>{t((t) => t.game.calc.enmity.title.mod)}</h3>
      <EnmityModsFields {...commonInputProps}/>
      <hr/>
      <h3>{t((t) => t.game.calc.enmity.title.hp)}</h3>
      <EnmityHPFields {...commonInputProps}/>
      <AdsToolBottom/>
    </>
  );
};
