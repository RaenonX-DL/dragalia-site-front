import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {HomepageData} from '../../../../../api-def/api';
import {PostType} from '../../../../../api-def/api/post/types';
import {GeneralPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {unitInfoToClickableProps} from '../../../../../utils/services/resources/unitInfo/utils';
import {UnitIconClickable} from '../../../../elements/gameData/unit/iconClickable';
import mainStyles from './../../main.module.css';
import styles from './main.module.css';
import {PostList} from './postList';


type Props = {
  data: HomepageData
};

export const RecentUpdatedPosts = ({data}: Props) => {
  const {t, lang} = useI18n();

  const {unitInfoMap} = useUnitInfo();

  return (
    <>
      <h1 className={mainStyles.sectionTitle}>
        {t((t) => t.home.section.recentlyUpdated)}
      </h1>
      <Row className="mb-0 mb-lg-3">
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
                <UnitIconClickable unit={unitInfoToClickableProps(unitInfo, lang)} className={styles.unitIcon}/>
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mt-3 mt-lg-0">
          <PostList
            title={t((t) => t.enum.postType[PostType.QUEST])}
            titlePath={GeneralPath.QUEST_LIST}
            entries={data.posts[PostType.QUEST]}
          />
        </Col>
        <Col lg={6} className="mt-3 mt-lg-0">
          <PostList
            title={t((t) => t.enum.postType[PostType.MISC])}
            titlePath={GeneralPath.MISC_LIST}
            entries={data.posts[PostType.MISC]}
          />
        </Col>
      </Row>
    </>
  );
};
