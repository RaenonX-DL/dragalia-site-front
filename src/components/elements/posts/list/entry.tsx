import React from 'react';

import Col from 'react-bootstrap/Col';

import {PostInfo, PostType} from '../../../../api-def/api';
import {makePostUrl, toPostPath} from '../../../../api-def/paths';
import {useI18n} from '../../../../i18n/hook';
import {SubscribeButton} from '../../common/button/subscribe/main';
import {RowNoGutter} from '../../common/grid/row';
import {InternalLink} from '../../common/link/internal';
import styles from './entry.module.css';
import {PostEntryInfoBar} from './postInfo';
import {FunctionRenderPostBadge} from './types';


type Props<E extends PostInfo> = {
  entry: E,
  type: PostType,
  pid: number,
  title: string,
  renderPostBadge: FunctionRenderPostBadge<E>,
  icon?: React.ReactElement,
  disableSubscription?: boolean,
};

export const PostEntry = <E extends PostInfo>({
  entry,
  type: postType,
  pid,
  title,
  renderPostBadge,
  icon,
  disableSubscription,
}: Props<E>) => {
  const {lang} = useI18n();

  return (
    <div className={styles.entry}>
      <RowNoGutter>
        {icon ? <Col xs="auto">{icon}</Col> : <></>}
        <Col>
          <RowNoGutter>
            <Col>
              <h5>
                <InternalLink
                  href={makePostUrl(toPostPath[postType], {pid, lang})}
                  locale={lang}
                  content={title}
                />
              </h5>
            </Col>
            <Col xs="auto">
              <SubscribeButton
                defaultSubscribed={entry.userSubscribed}
                subscriptionKey={{type: 'post', postType, id: pid}}
                disabled={disableSubscription}
              />
            </Col>
          </RowNoGutter>
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
