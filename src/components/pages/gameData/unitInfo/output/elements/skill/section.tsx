import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {SkillInfo} from '../../../../../../../api-def/resources';
import {GeneralPath, PostPath} from '../../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../../i18n/hook';
import {makePostUrl} from '../../../../../../../utils/path/make';
import {Loading} from '../../../../../../elements/common/loading';
import {InfoPopoverMarkdown} from '../../../../../../elements/common/overlay/info';
import {useAtkSkillResources} from '../../../../../../hooks/atkSkillResources';
import {generateInputData} from '../../../../skillAtk/in/utils/inputData';
import {AttackingSkillOutput} from '../../../../skillAtk/out/main';
import {calculateEntries} from '../../../../skillAtk/out/utils/entries';
import styles from '../main.module.css';
import {SectionSubTitle, SectionTitle} from '../title';
import {SkillOfficialInfo} from './official';


type Props = {
  info: SkillInfo,
  unitId: number,
}

export const SkillSection = ({info, unitId}: Props) => {
  const {t, lang} = useI18n();
  const resources = useAtkSkillResources();

  if (!resources.isAllFetched) {
    return <Loading/>;
  }

  const displayConfig = {
    actualDamage: false,
    damageInfo: true,
    damageDist: true,
    affliction: true,
    spInfo: true,
    animationInfo: true,
  };
  const entries = calculateEntries(
    info.atkSkills,
    generateInputData({display: displayConfig}),
    resources.elementBonuses,
  );

  return (
    <div className={styles.skill}>
      <Row>
        <Col>
          <SectionTitle>{t((t) => t.game.unitInfo.title.skills.all)}</SectionTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <SectionSubTitle>
            {t((t) => t.game.unitInfo.title.skills.official)}&nbsp;
            <InfoPopoverMarkdown
              title=""
              description={t(
                (t) => t.game.unitInfo.info.skill.official,
                {analysis: makePostUrl(PostPath.ANALYSIS, {pid: unitId, lang})},
              )}
            />
          </SectionSubTitle>
        </Col>
      </Row>
      <Row>
        {info.official.map((info, idx) => (
          <Col lg key={idx}>
            <SkillOfficialInfo info={info}/>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <SectionSubTitle>
            {t((t) => t.game.unitInfo.title.skills.parsed.atk)}&nbsp;
            <InfoPopoverMarkdown
              title=""
              description={t(
                (t) => t.game.unitInfo.info.skill.parsed,
                {atkSearch: GeneralPath.SKILL_ATK},
              )}
            />
          </SectionSubTitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.entries}>
            <AttackingSkillOutput
              displayConfig={displayConfig}
              calculatedEntries={entries}
              {...resources}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
