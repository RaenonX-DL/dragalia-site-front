import React from 'react';

import {NormalAttackBranchedChain} from '../../../../../../api-def/resources';
import {ConditionCodes} from '../../../../../../const/gameData';
import {useI18n} from '../../../../../../i18n/hook';
import {sum} from '../../../../../../utils/calc';
import {Markdown} from '../../../../markdown/main';
import {ConditionBadges} from '../../../elements/conditionBadges';
import {SectionSubTitle} from '../title';


type Props = {
  branchedChain: NormalAttackBranchedChain,
}

export const NormalAttackBranchedTab = ({branchedChain}: Props) => {
  const {t} = useI18n();

  return (
    <>
      <SectionSubTitle>
        <ConditionBadges
          conditionCodes={branchedChain.conditions.length ? branchedChain.conditions : [ConditionCodes.NONE]}
        />
      </SectionSubTitle>
      <div className="mb-1">
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
            </tr>
          </thead>
          <tbody>
            {
              branchedChain.combos.map((combo, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <Markdown overrideStyle={false}>
                        {`==(${combo.mods.join(' + ')}) x 100%[2f]==`}
                      </Markdown>
                    </td>
                    <td>{combo.mods.length}</td>
                    <td>{combo.sp}</td>
                    {branchedChain.hasUtp && <td>{combo.utp}</td>}
                    <td>
                      <Markdown overrideStyle={false}>
                        {`==(${combo.odRate.join(' + ')}) / ${combo.odRate.length}[2f]==`}
                      </Markdown>
                    </td>
                    {
                      branchedChain.hasCrisis &&
                      <td>
                        <Markdown overrideStyle={false}>
                          {`==(${combo.crisisMod.join(' + ')}) / ${combo.crisisMod.length}[2f]==`}
                        </Markdown>
                      </td>
                    }
                    <td>{combo.cancelToNextSec && combo.cancelToNextSec.toFixed(2)}</td>
                  </tr>
                );
              })
            }
            {
              <tr>
                <td>{t((t) => t.game.unitInfo.text.total)}</td>
                <td>
                  <Markdown overrideStyle={false}>
                    {`==(${branchedChain.combos.map((combo) => sum(combo.mods)).join(' + ')}) x 100%[2f]==`}
                  </Markdown>
                </td>
                <td>
                  <Markdown overrideStyle={false}>
                    {`==${branchedChain.combos.map((combo) => combo.mods.length).join(' + ')}==`}
                  </Markdown>
                </td>
                <td>
                  <Markdown overrideStyle={false}>
                    {`==${branchedChain.combos.map((combo) => combo.sp).join(' + ')}==`}
                  </Markdown>
                </td>
                {
                  branchedChain.hasUtp &&
                  <td>
                    <Markdown overrideStyle={false}>
                      {`==${branchedChain.combos.map((combo) => combo.utp).join(' + ')}[2f]==`}
                    </Markdown>
                  </td>
                }
                <td>-</td>
                {
                  branchedChain.hasCrisis &&
                  <td>-</td>
                }
                <td>
                  <Markdown overrideStyle={false}>
                    {`==${branchedChain.combos.map((combo) => combo.cancelToNextSec).join(' + ')}[2f]==`}
                  </Markdown>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
};
