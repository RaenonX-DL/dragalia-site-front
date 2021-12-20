import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, UnitInfoData} from '../../../../api-def/resources';
import {PostPath, UnitPath} from '../../../../const/path/definitions';
import {useI18n} from '../../../../i18n/hook';
import {makePostUrl, makeUnitUrl} from '../../../../utils/path/make';
import {Image} from '../../../elements/common/image';
import {InternalLink} from '../../../elements/common/link/internal';
import styles from './main.module.css';


type Props = {
  unitInfo: UnitInfoData,
};

export const StoryOtherInfo = ({unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row className={styles.mainImage}>
        <Col>
          <Image
            src={DepotPaths.getUnitImageURL(unitInfo.type, unitInfo.iconName)}
            text={unitInfo.name[lang]}
            className={styles.mainImage}
          />
        </Col>
      </Row>
      <Row className={styles.relatedLinks}>
        <Col>
          <InternalLink
            href={makePostUrl(PostPath.ANALYSIS, {pid: unitInfo.id, lang})}
            locale={lang}
            content={t((t) => t.game.unitInfo.links.analysis)}
          />
        </Col>
        <Col>
          <InternalLink
            href={makeUnitUrl(UnitPath.UNIT_INFO, {id: unitInfo.id, lang})}
            locale={lang}
            content={t((t) => t.game.unitInfo.links.info)}
          />
        </Col>
      </Row>
      <hr/>
    </>
  );
};
