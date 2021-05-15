import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {InlineCheck} from '../../elements/inlineCheck';
import {NumericInput} from '../../elements/numInput';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionCrt = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.crt)}
        description={t((t) => t.game.skillAtk.desc.crt)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.crtRate)}
        description={t((t) => t.game.skillAtk.desc.crtRate)}
        inputData={inputData}
        inputKey="criticalRatePct"
        setInputData={setInputData}
        maxValue={100}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.crtDamage)}
        description={t((t) => t.game.skillAtk.desc.crtDamage)}
        inputData={inputData}
        inputKey="criticalDamagePct"
        setInputData={setInputData}
        maxValue={400}
      />
      <div className="text-center">
        <InlineCheck
          title={t((t) => t.game.skillAtk.name.crtInspired)}
          inputData={inputData}
          inputKey="criticalInspired"
          setInputData={setInputData}
        />
      </div>
    </>
  );
};
