import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, UnitInfoData} from '../../../../api-def/resources';
import {featureBtnColors} from '../../../../const/colors';
import {PostPath, UnitPath} from '../../../../const/path/definitions';
import {useI18n} from '../../../../i18n/hook';
import {makePostUrl, makeUnitUrl} from '../../../../utils/path/make';
import {FullSizeButton} from '../../../elements/common/button/fullSize';
import {RowRegular} from '../../../elements/common/grid/row';
import {Image} from '../../../elements/common/image';
import styles from './main.module.css';


type Props = {
  unitInfo: UnitInfoData,
};

export const StoryOtherInfo = ({unitInfo}: Props) => {
  const {t, lang} = useI18n();

  return (
    <>
      <Row className={styles['main-image']}>
        <Col>
          <Image
            src={DepotPaths.getUnitImageURL(unitInfo.type, unitInfo.iconName)}
            text={unitInfo.name[lang]}
            className={styles['main-image']}
          />
        </Col>
      </Row>
      <RowRegular className={styles['related-links']}>
        <Col>
          <FullSizeButton
            href={makePostUrl(PostPath.ANALYSIS, {pid: unitInfo.id, lang})}
            variant={featureBtnColors.analysis}
          >
            {t((t) => t.game.unitInfo.links.analysis)}
          </FullSizeButton>
        </Col>
        <Col>
          <FullSizeButton
            href={makeUnitUrl(UnitPath.UNIT_INFO, {id: unitInfo.id, lang})}
            variant={featureBtnColors.info}
          >
            {t((t) => t.game.unitInfo.links.info)}
          </FullSizeButton>
        </Col>
        <Col>
          <FullSizeButton
            href={makeUnitUrl(UnitPath.UNIT_TIER, {id: unitInfo.id, lang})}
            variant={featureBtnColors.tier}
          >
            {t((t) => t.game.unitInfo.links.tier)}
          </FullSizeButton>
        </Col>
      </RowRegular>
      <hr/>
    </>
  );
};
