import React from 'react';

import {NormalAttackBranchedChain} from '../../../../../../../api-def/resources';
import {ConditionCodes} from '../../../../../../../const/gameData';
import {useI18n} from '../../../../../../../i18n/hook';
import {roundArray, sum} from '../../../../../../../utils/calc';
import {ConditionBadges} from '../../../../../../elements/gameData/badges/conditions';
import {Markdown} from '../../../../../../elements/markdown/main';
import styles from '../main.module.css';
import {SectionSubTitle} from '../title';


type Props = {
  branchedChain: NormalAttackBranchedChain,
}

export const NormalAttackBranchedTab = ({branchedChain}: Props) => {
  const {t} = useI18n();

  return (
    <div className={styles.text}>
      <SectionSubTitle>
        <ConditionBadges
          conditionCodes={branchedChain.conditions.length ? branchedChain.conditions : [ConditionCodes.NONE]}
        />
      </SectionSubTitle>
      <div className="mb-1 overflow-auto">
        <table>
          <thead>
            <tr>
              <td>{t((t) => t.game.unitInfo.header.combo.index)}</td>
              <td>{t((t) => t.game.unitInfo.header.combo.mods)}</td>
              <td>{t((t) => t.game.unitInfo.header.combo.hitCount)}</td>
              <td>{t((t) => t.game.unitInfo.header.combo.sp)}</td>
              {branchedChain.hasUtp && <td>{t((t) => t.game.unitInfo.header.combo.utp)}</td>}
              <td>{t((t) => t.game.unitInfo.header.combo.odRate)}</td>
              {branchedChain.hasCrisis && <td>{t((t) => t.game.unitInfo.header.combo.crisisMods)}</td>}
              <td>{t((t) => t.game.unitInfo.header.combo.nextComboSec)}</td>
              <td>{t((t) => t.game.unitInfo.header.combo.spPerSec)}</td>
            </tr>
          </thead>
          <tbody>
            {branchedChain.combos.map((combo, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Markdown overrideStyle={false}>
                      {`==(${roundArray(combo.mods, 3).join(' + ')}) x 100%[2f]==`}
                    </Markdown>
                  </td>
                  <td>{combo.mods.length}</td>
                  <td>{combo.sp}</td>
                  {branchedChain.hasUtp && <td>{combo.utp}</td>}
                  <td>
                    <Markdown overrideStyle={false}>
                      {`==(${roundArray(combo.odRate, 3).join(' + ')}) / ${combo.odRate.length}[2f]==`}
                    </Markdown>
                  </td>
                  {
                    branchedChain.hasCrisis &&
                    <td>
                      <Markdown overrideStyle={false}>
                        {`==(${roundArray(combo.crisisMod, 3).join(' + ')}) / ${combo.crisisMod.length}[2f]==`}
                      </Markdown>
                    </td>
                  }
                  {
                    combo.cancelToNextSec &&
                    <>
                      <td>{combo.cancelToNextSec.toFixed(2)}</td>
                      <td>{(combo.sp / combo.cancelToNextSec).toFixed(2)}</td>
                    </>
                  }
                </tr>
              );
            })}
            <tr>
              <td>{t((t) => t.game.unitInfo.text.total)}</td>
              <td>
                {(sum(branchedChain.combos.map((combo) => sum(combo.mods))) * 100).toFixed(2)}&nbsp;%
              </td>
              <td>
                {sum(branchedChain.combos.map((combo) => combo.mods.length)).toFixed(0)}
              </td>
              <td>
                {sum(branchedChain.combos.map((combo) => combo.sp)).toFixed(0)}
              </td>
              {
                branchedChain.hasUtp &&
                <td>
                  {sum(branchedChain.combos.map((combo) => combo.utp)).toFixed(2)}
                </td>
              }
              <td>-</td>
              {
                branchedChain.hasCrisis &&
                <td>-</td>
              }
              <td>
                {sum(branchedChain.combos.map((combo) => combo.cancelToNextSec || 0)).toFixed(2)}
              </td>
              <td>
                {(
                  sum(branchedChain.combos.map((combo) => combo.sp)) /
                  sum(branchedChain.combos.map((combo) => combo.cancelToNextSec || 0))
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
