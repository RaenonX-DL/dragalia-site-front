import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {calcEnmityMod} from '../../../../utils/game/enmity';
import {overrideObject} from '../../../../utils/override';
import {NumericInput, NumericInputProps} from '../../../elements/common/input/numeric';
import {EnmityData} from './types';
import {formatEnmityData} from './utils';


type Props = Pick<NumericInputProps<EnmityData>, 'inputData' | 'setInputData'>;


export const EnmityHPFields = ({...commonInputProps}: Props) => {
  const {t} = useI18n();
  const {inputData: input} = commonInputProps;

  return (
    <>
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.hp.currentPct.title)}
        description={t((t) => t.game.calc.enmity.hp.currentPct.description)}
        getValue={(input) => input.hp.currentPct || 0}
        getUpdatedInputData={(currentPct) => {
          const enmityMod = calcEnmityMod(currentPct, input.mod.enmity.original);

          return formatEnmityData(overrideObject(
            input,
            {
              mod: {
                enmity: {effective: enmityMod},
                skill: {effective: input.mod.skill.original * enmityMod},
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
        title={t((t) => t.game.calc.enmity.hp.val.current.title)}
        description={t((t) => t.game.calc.enmity.hp.val.current.description)}
        getValue={(input) => input.hp.val?.current || 0}
        getUpdatedInputData={(current) => {
          const currentPct = current / input.hp.val.max * 100;
          const enmityMod = calcEnmityMod(currentPct, input.mod.enmity.original);

          return formatEnmityData(overrideObject(
            input,
            {
              mod: {
                enmity: {effective: enmityMod},
                skill: {effective: input.mod.skill.original * enmityMod},
              },
              hp: {currentPct, val: {current}},
            },
          ));
        }}
        minValue={0}
      />
      <NumericInput
        {...commonInputProps}
        title={t((t) => t.game.calc.enmity.hp.val.max.title)}
        description={t((t) => t.game.calc.enmity.hp.val.max.description)}
        getValue={(input) => input.hp.val?.max || 0}
        getUpdatedInputData={(max) => {
          const currentPct = input.hp.val.current / max * 100;
          const enmityMod = calcEnmityMod(currentPct, input.mod.enmity.original);

          return formatEnmityData(overrideObject(
            input,
            {
              mod: {
                enmity: {effective: enmityMod},
                skill: {effective: input.mod.skill.original * enmityMod},
              },
              hp: {currentPct, val: {max}},
            },
          ));
        }}
        minValue={0}
      />
    </>
  );
};
