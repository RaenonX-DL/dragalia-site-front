import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostInfo} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';
import {IconEdit, IconPublish} from '../../common/icons';
import {InternalLink} from '../../common/link/internal';
import styles from './entry.module.css';
import {FunctionRenderPostBadge} from './types';


type Props<E extends PostInfo> = {
  entry: E,
  link: string,
  title: string,
  renderPostBadge: FunctionRenderPostBadge<E>,
  icon?: React.ReactElement,
};

export const PostEntry = <E extends PostInfo>({
  entry,
  link,
  title,
  renderPostBadge,
  icon,
}: Props<E>) => {
  const {t, lang} = useI18n();

  return (
    <div className={styles.entry}>
      <Row noGutters>
        {icon ? <Col xs="auto">{icon}</Col> : <></>}
        <Col>
          <h5>
            <InternalLink
              href={link}
              locale={lang}
              content={title}
            />
          </h5>
          <Row noGutters>
            <Col xs="auto">
              {renderPostBadge({entry})}&nbsp;
            </Col>
            <Col>
              <small className={styles.timestamp}>
                <IconEdit/>&nbsp;<TimeAgo epoch={entry.modifiedEpoch}/>
              </small>
              <small className={styles.timestamp}>
                <IconPublish/>&nbsp;<TimeAgo epoch={entry.publishedEpoch}/>
              </small>
            </Col>
            <Col className="text-right">
              <small className="text-muted">
                {t((t) => t.posts.info.viewCountComplete, {count: entry.viewCount.toString()})}
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
