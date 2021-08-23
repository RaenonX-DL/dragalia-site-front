import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostPath} from '../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../i18n/hook';
import {makePostUrl} from '../../../../../../utils/path/make';
import {Link} from '../../../../../elements/common/link';


type Props = {
  unitId: number,
}

export const RelatedLinks = ({unitId}: Props) => {
  const {t, lang} = useI18n();

  return (
    <Row>
      <Col className="text-center">
        <Link
          href={makePostUrl(PostPath.ANALYSIS, {pid: unitId, lang})}
          locale={lang}
          text={t((t) => t.game.unitInfo.links.analysis)}
        />
      </Col>
    </Row>
  );
};
