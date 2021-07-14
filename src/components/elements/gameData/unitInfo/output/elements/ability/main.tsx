import React from 'react';

import {AbilityInfo} from '../../../../../../../api-def/resources';
import {GeneralPath, PostPath} from '../../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../../i18n/hook';
import {makePostPath} from '../../../../../../../utils/path/make';
import {InfoPopoverMarkdown} from '../../../../../common/overlay/info';
import styles from '../main.module.css';
import {SectionSubTitle, SectionTitle} from '../title';
import {OfficialAbilityEntry} from './entry';


type AbilityBlockProps = {
  unitId: number,
  info: AbilityInfo,
}

export const AbilityBlock = ({unitId, info}: AbilityBlockProps) => {
  const {t, lang} = useI18n();

  return (
    <div className={styles.ability}>
      <div className={styles.container}>
        <div className={styles.content}>
          <SectionTitle>
            {t((t) => t.game.unitInfo.title.passive)}&nbsp;
            <InfoPopoverMarkdown
              title=""
              description={t(
                (t) => t.game.unitInfo.info.passive,
                {analysis: makePostPath(PostPath.ANALYSIS, {pid: unitId, lang})},
              )}
            />
          </SectionTitle>
          {info.passive.map((passive, idx) => (
            <OfficialAbilityEntry key={idx} info={passive}/>
          ))}
          {
            info.coAbility &&
            <>
              <SectionTitle>
                {t((t) => t.game.unitInfo.title.coAbility.all)}&nbsp;
                <InfoPopoverMarkdown
                  title=""
                  description={t(
                    (t) => t.game.unitInfo.info.coAbility,
                    {exLookup: GeneralPath.EX},
                  )}
                />
              </SectionTitle>
              <SectionSubTitle>{t((t) => t.game.unitInfo.title.coAbility.global)}</SectionSubTitle>
              <OfficialAbilityEntry info={info.coAbility.global}/>
              <SectionSubTitle>{t((t) => t.game.unitInfo.title.coAbility.chained)}</SectionSubTitle>
              <OfficialAbilityEntry info={info.coAbility.chained}/>
            </>
          }
        </div>
      </div>
    </div>
  );
};
