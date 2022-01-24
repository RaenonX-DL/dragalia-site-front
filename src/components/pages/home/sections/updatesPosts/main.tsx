import React from 'react';

import Col from 'react-bootstrap/Col';

import {HomepageLandingResponse, PostType} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {unitInfoToClickableProps} from '../../../../../utils/services/resources/unitInfo/utils';
import {RowRegular} from '../../../../elements/common/grid/row';
import {UnitIconClickable} from '../../../../elements/gameData/unit/iconClickable';
import mainStyles from './../../main.module.css';
import styles from './main.module.css';
import {PostList} from './postList';


type Props = {
  response: HomepageLandingResponse
};

export const RecentUpdatedPosts = ({response}: Props) => {
  const {t, lang} = useI18n();

  const {unitInfoMap} = useUnitInfo();

  const {data, subscribed} = response;

  return (
    <>
      <h1 className={mainStyles['section-title']}>
        {t((t) => t.home.section.recentlyUpdated)}
      </h1>
      <RowRegular className="mb-3">
        <Col>
          <PostList
            title={t((t) => t.enum.postType[PostType.ANALYSIS])}
            titlePath={GeneralPath.ANALYSIS_LIST}
            entries={data.posts[PostType.ANALYSIS]}
            getIcon={(entry) => {
              const unitInfo = unitInfoMap.get(entry.pid);

              if (!unitInfo) {
                return <></>;
              }

              return (
                <UnitIconClickable unit={unitInfoToClickableProps(unitInfo, lang)} className={styles['unit-icon']}/>
              );
            }}
            defaultSubscribed={subscribed.post[PostType.ANALYSIS]}
            subscriptionKey={{type: 'const', name: 'ALL_ANALYSIS'}}
          />
        </Col>
      </RowRegular>
      <RowRegular>
        <Col lg={6}>
          <PostList
            title={t((t) => t.enum.postType[PostType.QUEST])}
            titlePath={GeneralPath.QUEST_LIST}
            entries={data.posts[PostType.QUEST]}
            defaultSubscribed={subscribed.post[PostType.QUEST]}
            subscriptionKey={{type: 'const', name: 'ALL_QUEST'}}
          />
        </Col>
        <Col lg={6}>
          <PostList
            title={t((t) => t.enum.postType[PostType.MISC])}
            titlePath={GeneralPath.MISC_LIST}
            entries={data.posts[PostType.MISC]}
            defaultSubscribed={subscribed.post[PostType.MISC]}
            subscriptionKey={{type: 'const', name: 'ALL_MISC'}}
          />
        </Col>
      </RowRegular>
    </>
  );
};
