import React from 'react';

import {useI18n} from '../../../../../../../i18n/hook';
import styles from '../section.module.css';
import {SectionSpInfoProps} from './main';


export const SpInfoTable = ({calculatedData}: Pick<SectionSpInfoProps, 'calculatedData'>) => {
  const {t} = useI18n();

  const sp = calculatedData.skillEntry.skill.spMax.toFixed(0);

  return (
    <div className="mt-2">
      <table>
        <tbody>
          <tr>
            <td className={styles.sp}>{t((t) => t.game.skillAtk.spInfo.sp)}</td>
            <td className={styles.ssp}>{t((t) => t.game.skillAtk.spInfo.ssp)}</td>
            <td className={styles['ss-cost']}>{t((t) => t.game.skillAtk.spInfo.ssCost)}</td>
          </tr>
          <tr>
            <td className={styles.sp}>{
              calculatedData.skillEntry.skill.spGradualPctMax ?
                t(
                  (t) => t.game.skillAtk.spInfo.spGradualFill,
                  {secs: calculatedData.efficiency.spFullFillSec.toFixed(1), sp},
                ) :
                sp
            }</td>
            <td className={styles.ssp}>{
              calculatedData.skillEntry.skill.sharable ?
                calculatedData.skillEntry.skill.ssSp.toFixed(0) :
                '-'
            }</td>
            <td className={styles['ss-cost']}>{
              calculatedData.skillEntry.skill.sharable ?
                calculatedData.skillEntry.skill.ssCost.toFixed(0) :
                '-'
            }</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
