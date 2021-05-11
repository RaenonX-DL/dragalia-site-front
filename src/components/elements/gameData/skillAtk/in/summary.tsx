import React from 'react';

import {useTranslation} from '../../../../../i18n/utils';
import {InputData} from './types';

type InputSummaryProps = {
  inputData: InputData
}


export const InputSummary = ({inputData}: InputSummaryProps) => {
  const {t} = useTranslation();

  const detailClass = 'text-info';

  return (
    <>
      <h5>{
        t(
          'game.skill_atk.summary.atk',
          {
            atkVal:
              (
                inputData.atkInGame * // In-game ATK
                (1 + inputData.atkConditionalPct / 100) * // Condition ATK boosts
                (1 + inputData.atkBuffPct / 100)
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.atk_data',
            {
              atkInGame: inputData.atkInGame,
              atkConditionalPct: inputData.atkConditionalPct.toFixed(0),
              atkBuffPct: inputData.atkBuffPct.toFixed(0),
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.buff')}</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.buff_data',
            {
              buffCount: inputData.buffCount,
              buffZoneSelf: inputData.buffZoneSelf,
              buffZoneAlly: inputData.buffZoneAlly,
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.ex')}</h5>
      <p className={detailClass}>
        {
          [
            [inputData.exBlade, 'game.skill_atk.summary.ex_blade'],
            [inputData.exWand, 'game.skill_atk.summary.ex_wand'],
          ]
            .filter((entry) => entry[0])
            .map((entry) => t(entry[1] as string))
            .join(' / ') ||
          t('game.skill_atk.summary.ex_none')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.crt',
          {
            crtVal: (
              1 +
              (inputData.criticalInspired ? 1 : inputData.criticalRatePct / 100) * // Critical Rate and Inspired
              (inputData.criticalDamagePct / 100 + 0.7) // Critical damage
            ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          [
            inputData.criticalInspired ?
              t('game.skill_atk.summary.crt_inspired') :
              t('game.skill_atk.summary.crt_rate', {crtRate: inputData.criticalRatePct.toFixed(1)}),
            t('game.skill_atk.summary.crt_damage', {crtDamage: inputData.criticalDamagePct}),
          ]
            .join(' / ')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.skill',
          {
            skillVal:
              (
                (1 + (inputData.skillPassivePct + (inputData.skillEnergized ? 50 : 0)) / 100) * // Passives & Energized
                (1 + (inputData.exWand ? 0.15 : 0)) * // Wand EX
                (1 + inputData.skillBuffPct / 100) // Skill Damage Buffs
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          [
            t('game.skill_atk.summary.skill_passive', {skillPassivePct: inputData.skillPassivePct}),
            t('game.skill_atk.summary.skill_buff', {skillBuffPct: inputData.skillBuffPct}),
            inputData.skillEnergized ? t('game.skill_atk.summary.skill_energized') : '',
          ]
            .filter((str) => str.length > 0)
            .join(' / ')
        }
      </p>
      <h5>{
        t(
          'game.skill_atk.summary.punisher',
          {
            punisherVal:
              (
                (1 + inputData.punishersBkPct / 100) *
                (1 + inputData.punishersOtherPct / 100)
              ).toFixed(2),
          },
        )
      }</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.punisher_data',
            {
              punishersBkPct: inputData.punishersBkPct,
              punishersOtherPct: inputData.punishersOtherPct,
            },
          )
        }
      </p>
      <h5>{t('game.skill_atk.summary.other')}</h5>
      <p className={detailClass}>
        {
          t(
            'game.skill_atk.summary.other_data',
            {
              otherElemBonusPct: inputData.otherElemBonusPct,
              otherCurrentHpPct: inputData.otherCurrentHpPct,
            },
          )
        }
        {
          inputData.filterSharedOnly && <><br/>{t('game.skill_atk.summary.shared_only')}</>
        }
      </p>
    </>
  );
};
