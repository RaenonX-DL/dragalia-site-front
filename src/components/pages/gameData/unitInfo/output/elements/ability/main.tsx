import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {AbilityInfo, ConditionEnumMap} from '../../../../../../../api-def/resources';
import {GeneralPath, PostPath} from '../../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../../i18n/hook';
import {makePostUrl} from '../../../../../../../utils/path/make';
import {ResourceLoader} from '../../../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../../../elements/common/fetch';
import {InfoPopoverMarkdown} from '../../../../../../elements/common/overlay/info';
import {ExAbilityEntry} from '../../../../ex/out/entry';
import styles from '../main.module.css';
import {SectionSubTitle, SectionTitle} from '../title';
import {OfficialAbilityEntry} from './entry';


type AbilityBlockProps = {
  unitId: number,
  info: AbilityInfo,
}

export const AbilityBlock = ({unitId, info}: AbilityBlockProps) => {
  const {t, lang} = useI18n();

  const {
    fetchStatus: conditionEnums,
    fetchFunction: fetchConditionEnums,
  } = useFetchState<ConditionEnumMap>(
    {},
    ResourceLoader.getEnumAllConditions,
    'Failed to fetch condition enums.',
  );

  fetchConditionEnums();

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
                {analysis: makePostUrl(PostPath.ANALYSIS, {pid: unitId, lang})},
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
                {t((t) => t.game.unitInfo.title.coAbility.official)}&nbsp;
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
              <SectionTitle>{t((t) => t.game.unitInfo.title.coAbility.parsed)}</SectionTitle>
              <Form.Row className="mx-1">
                <Col>
                  <ExAbilityEntry {...info.coAbility.parsed} conditionEnums={conditionEnums.data}/>
                </Col>
              </Form.Row>
            </>
          }
        </div>
      </div>
    </div>
  );
};
