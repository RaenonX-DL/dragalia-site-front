import React from 'react';

import {CategorizedConditionEnums} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {TranslationStruct} from '../../../../../i18n/translations/definition';
import {GetTranslationFunction} from '../../../../../i18n/types';
import {getConditionName} from '../../../../../utils/game/conditionName';
import {EnumEntryImageIcon} from '../../../../elements/gameData/enumIcon';
import {InputData} from './types';


type InputSummaryProps = {
  inputData: InputData,
  conditionEnums: CategorizedConditionEnums,
};

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
                inputData.params.atk.inGame * // In-game ATK
                (1 + inputData.params.atk.conditionalPct / 100) * // Condition ATK boosts
                (1 + inputData.params.atk.buffPct / 100)
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.atkData,
          {
            atkInGame: inputData.params.atk.inGame.toFixed(0),
            atkConditionalPct: inputData.params.atk.conditionalPct.toFixed(0),
            atkBuffPct: inputData.params.atk.buffPct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.buff)}</h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.buffData,
          {
            buffCount: inputData.params.buff.count.toFixed(0),
            buffZoneSelf: inputData.params.buff.zone.self.toFixed(0),
            buffZoneAlly: inputData.params.buff.zone.ally.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.ex)}</h5>
      <p className={detailClassNames}>
        {[
          [inputData.params.ex.blade, (t: TranslationStruct) => t.game.skillAtk.summary.exBlade],
          [inputData.params.ex.wand, (t: TranslationStruct) => t.game.skillAtk.summary.exWand],
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
              (inputData.params.crt.inspired ? 1 : inputData.params.crt.ratePct / 100) * // Critical Rate and Inspired
              (inputData.params.crt.damagePct / 100 + 0.7) // Critical damage
            ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {[
          inputData.params.crt.inspired ?
            t((t) => t.game.skillAtk.summary.crtInspired) :
            t(
              (t) => t.game.skillAtk.summary.crtRate,
              {crtRate: inputData.params.crt.ratePct.toFixed(1)},
            ),
          t(
            (t) => t.game.skillAtk.summary.crtDamage,
            {crtDamage: inputData.params.crt.damagePct.toFixed(0)},
          )]
          .join(' / ')}
      </p>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.skill,
          {
            skillVal:
              (
                // Passives & Energized
                (1 + (inputData.params.skill.passivePct + (inputData.params.skill.energized ? 50 : 0)) / 100) *
                (1 + (inputData.params.ex.wand ? 0.15 : 0)) * // Wand EX
                (1 + inputData.params.skill.buffPct / 100) // Skill Damage Buffs
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {[
          t(
            (t) => t.game.skillAtk.summary.skillPassive,
            {skillPassivePct: inputData.params.skill.passivePct.toFixed(0)},
          ),
          t(
            (t) => t.game.skillAtk.summary.skillBuff,
            {skillBuffPct: inputData.params.skill.buffPct.toFixed(0)},
          ),
          inputData.params.skill.energized ? t((t) => t.game.skillAtk.summary.skillEnergized) : '',
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
                (1 + inputData.params.punishers.bkPct / 100) *
                (1 + inputData.params.punishers.othersPct / 100)
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.punisherData,
          {
            punishersBkPct: inputData.params.punishers.bkPct.toFixed(0),
            punishersOtherPct: inputData.params.punishers.othersPct.toFixed(0),
          },
        )}
      </p>
      <h5>
        {t(
          (t) => t.game.skillAtk.summary.dragon,
          {
            dragonVal:
              (
                1 + 0.2 +
                inputData.params.dragon.facilityPct / 100 +
                inputData.params.dragon.passivePct / 100
              ).toFixed(2),
          },
        )}
      </h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.dragonData,
          {
            facilityPct: inputData.params.dragon.facilityPct.toFixed(0),
            passivePct: inputData.params.dragon.passivePct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.other)}</h5>
      <p className={detailClassNames}>
        {t(
          (t) => t.game.skillAtk.summary.otherData,
          {
            otherElemBonusPct: inputData.params.others.elemBonusPct.toFixed(0),
            otherCurrentHpPct: inputData.params.others.currentHpPct.toFixed(0),
          },
        )}
      </p>
      <h5>{t((t) => t.game.skillAtk.summary.target)}</h5>
      <p className={detailClassNames}>
        {t((t) => t.game.skillAtk.summary.targetData.element)}
        <EnumEntryImageIcon
          entry={conditionEnums.elements.find((entry) => entry.code === inputData.target.elemCondCode)}
        />
        <br/>
        {t((t) => t.game.skillAtk.summary.targetData.afflictions)}
        {
          conditionEnums.afflictions
            .filter((entry) => inputData.target.afflictionCodes.includes(entry.code))
            .map((entry, idx) => <EnumEntryImageIcon entry={entry} key={idx}/>)
        }<br/>
        {t(
          (t) => t.game.skillAtk.summary.targetData.state,
          {state: getConditionName(inputData.target.state, t)},
        )}<br/>
        {t(
          (t) => t.game.skillAtk.summary.targetData.def,
          {
            def: inputData.target.def.base.toFixed(0),
            defDownPct: inputData.target.def.downPct.toFixed(0),
            defBkRate: inputData.target.def.bkRate.toFixed(1),
          },
        )}
      </p>
    </>
  );
};
