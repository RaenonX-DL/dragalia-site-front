import React from 'react';

import {CategorizedConditionEnums} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {TranslationStruct} from '../../../../../i18n/translations/definition';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {getConditionName} from '../../../../../utils/game/conditionName';
import {EnumEntryImageIcon} from '../../enumIcon';
import {InputData} from './types';


type InputSummaryProps = {
  inputData: InputData,
  conditionEnums: CategorizedConditionEnums,
}

export const InputSummary = ({inputData, conditionEnums}: InputSummaryProps) => {
  const {t} = useI18n();

  const detailClassNames = 'text-info';

  return (
    <>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.atk,
          {
            atkVal:
              (
                inputData.atkInGame * // In-game ATK
                (1 + inputData.atkConditionalPct / 100) * // Condition ATK boosts
                (1 + inputData.atkBuffPct / 100)
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.atkData,
          {
            atkInGame: inputData.atkInGame.toFixed(0),
            atkConditionalPct: inputData.atkConditionalPct.toFixed(0),
            atkBuffPct: inputData.atkBuffPct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.buff)}</h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.buffData,
          {
            buffCount: inputData.buffCount.toFixed(0),
            buffZoneSelf: inputData.buffZoneSelf.toFixed(0),
            buffZoneAlly: inputData.buffZoneAlly.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.ex)}</h5>
      <p className={detailClassNames}>
        {[
          [inputData.exBlade, (t: TranslationStruct) => t.game.skillAtk.summary.exBlade],
          [inputData.exWand, (t: TranslationStruct) => t.game.skillAtk.summary.exWand],
        ]
          .filter((entry) => entry[0])
          .map((entry) => t(entry[1] as GetTranslationFunction))
          .join(' / ') ||
        t((t) => t.game.skillAtk.summary.exNone)}
      </p>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.crt,
          {
            crtVal: (
              1 +
              (inputData.criticalInspired ? 1 : inputData.criticalRatePct / 100) * // Critical Rate and Inspired
              (inputData.criticalDamagePct / 100 + 0.7) // Critical damage
            ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {[
          inputData.criticalInspired ?
            t((t) => t.game.skillAtk.summary.crtInspired) :
            t(
              (t) => t.game.skillAtk.summary.crtRate,
              {crtRate: inputData.criticalRatePct.toFixed(1)},
            ),
          t(
            (t) => t.game.skillAtk.summary.crtDamage,
            {crtDamage: inputData.criticalDamagePct.toFixed(0)},
          )]
          .join(' / ')}
      </p>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.skill,
          {
            skillVal:
              (
                (1 + (inputData.skillPassivePct + (inputData.skillEnergized ? 50 : 0)) / 100) * // Passives & Energized
                (1 + (inputData.exWand ? 0.15 : 0)) * // Wand EX
                (1 + inputData.skillBuffPct / 100) // Skill Damage Buffs
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {[
          t((t) => t.game.skillAtk.summary.skillPassive, {skillPassivePct: inputData.skillPassivePct.toFixed(0)}),
          t((t) => t.game.skillAtk.summary.skillBuff, {skillBuffPct: inputData.skillBuffPct.toFixed(0)}),
          inputData.skillEnergized ? t((t) => t.game.skillAtk.summary.skillEnergized) : '',
        ]
          .filter((str) => str.length > 0)
          .join(' / ')}
      </p>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.punisher,
          {
            punisherVal:
              (
                (1 + inputData.punishersBkPct / 100) *
                (1 + inputData.punishersOtherPct / 100)
              ).toFixed(2),
          },
        )}</h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.punisherData,
          {
            punishersBkPct: inputData.punishersBkPct.toFixed(0),
            punishersOtherPct: inputData.punishersOtherPct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.other)}</h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.otherData,
          {
            otherElemBonusPct: inputData.otherElemBonusPct.toFixed(0),
            otherCurrentHpPct: inputData.otherCurrentHpPct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.target)}</h5>
      <p className={detailClassNames}>
        {t((t) => t.game.skillAtk.summary.targetData.element)}
        <EnumEntryImageIcon
          entry={conditionEnums.elements.find((entry) => entry.code === inputData.targetElemCondCode)}
        />
        <br/>
        {t((t) => t.game.skillAtk.summary.targetData.afflictions)}
        {
          conditionEnums.afflictions
            .filter((entry) => inputData.targetAfflictionCodes.includes(entry.code))
            .map((entry, idx) => <EnumEntryImageIcon entry={entry} key={idx}/>)
        }<br/>
        {t(
          (t) => t.game.skillAtk.summary.targetData.state,
          {state: getConditionName(inputData.targetStateCode, t)},
        )}<br/>
        {t(
          (t) => t.game.skillAtk.summary.targetData.def,
          {
            def: inputData.targetDefBase.toFixed(0),
            defDownPct: inputData.targetDefDownPct.toFixed(0),
            defBkRate: inputData.targetDefBkRate.toFixed(1),
          },
        )}
      </p>
    </>
  );
}
;
