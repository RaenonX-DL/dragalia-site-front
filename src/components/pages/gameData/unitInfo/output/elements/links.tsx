import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostPath} from '../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../i18n/hook';
import {makePostUrl} from '../../../../../../utils/path/make';
import {InternalLink} from '../../../../../elements/common/link/internal';


type Props = {
  unitId: number,
}

export const RelatedLinks = ({unitId}: Props) => {
  const {t, lang} = useI18n();

  return (
    <Row>
      <Col className="text-center">
        <InternalLink
          href={makePostUrl(PostPath.ANALYSIS, {pid: unitId, lang})}
          locale={lang}
          content={t((t) => t.game.unitInfo.links.analysis)}
        />
      </Col>
    </Row>
  );
};
