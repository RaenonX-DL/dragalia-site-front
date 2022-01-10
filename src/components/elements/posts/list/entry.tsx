import React from 'react';

import Col from 'react-bootstrap/Col';

import {PostInfo} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {RowNoGutter} from '../../common/grid/row';
import {InternalLink} from '../../common/link/internal';
import styles from './entry.module.css';
import {PostEntryInfoBar} from './postInfo';
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
  const {lang} = useI18n();

  return (
    <div className={styles.entry}>
      <RowNoGutter>
        {icon ? <Col xs="auto">{icon}</Col> : <></>}
        <Col>
          <h5>
            <InternalLink
              href={link}
              locale={lang}
              content={title}
            />
          </h5>
          <RowNoGutter>
            <Col xs="auto">
              {renderPostBadge({entry})}&nbsp;
            </Col>
            <Col>
              <PostEntryInfoBar entry={entry}/>
            </Col>
          </RowNoGutter>
        </Col>
      </RowNoGutter>
    </div>
  );
};
