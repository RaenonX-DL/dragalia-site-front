import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {calcEnmityHpPct, calcEnmityMod} from '../../../../utils/game/enmity';
import {overrideObject} from '../../../../utils/override';
import {NumericInput, NumericInputProps} from '../../../elements/common/input/numeric';
import {EnmityData} from './types';
import {formatEnmityData} from './utils';


type Props = Pick<NumericInputProps<EnmityData>, 'inputData' | 'setInputData'>;


export const EnmityModsFields = ({...commonInputProps}: Props) => {
  const {t} = useI18n();
  const {inputData: input} = commonInputProps;

  return (
    <>
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.mod.enmity.original.title)}
        description={t((t) => t.game.calc.enmity.mod.enmity.original.description)}
        getValue={(input) => +input.mod.enmity.original || 0}
        getUpdatedInputData={(original) => {
          const effective = calcEnmityMod(input.hp.currentPct, original);

          return formatEnmityData(overrideObject(
            input,
            {mod: {
              enmity: {original, effective},
              skill: {effective: input.mod.skill.original * effective},
            }},
          ));
        }}
        minValue={0}
      />
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.mod.skill.original.title)}
        description={t((t) => t.game.calc.enmity.mod.skill.original.description)}
        getValue={(input) => +input.mod.skill.original || 0}
        getUpdatedInputData={(original) => formatEnmityData(overrideObject(
          input,
          {mod: {skill: {original, effective: original * input.mod.enmity.effective}}},
        ))}
        minValue={0}
      />
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.mod.enmity.effective.title)}
        description={t((t) => t.game.calc.enmity.mod.enmity.effective.description)}
        getValue={(input) => +input.mod.enmity.effective || 0}
        getUpdatedInputData={(effective) => {
          const currentPct = calcEnmityHpPct(effective, input.mod.enmity.original);

          return formatEnmityData(overrideObject(
            input,
            {
              mod: {
                enmity: {effective},
                skill: {effective: input.mod.skill.original * effective},
              },
              hp: {
                currentPct,
                val: {current: input.hp.val.max * currentPct / 100},
              },
            },
          ));
        }}
        minValue={0}
      />
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.mod.skill.effective.title)}
        description={t((t) => t.game.calc.enmity.mod.skill.effective.description)}
        getValue={(input) => +input.mod.skill.effective || 0}
        getUpdatedInputData={(effective) => formatEnmityData(overrideObject(
          input,
          {mod: {skill: {original: effective / input.mod.enmity.effective, effective}}},
        ))}
        minValue={0}
      />
    </>
  );
};
