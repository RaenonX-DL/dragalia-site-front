import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {StoryBook} from '../../../../api-def/resources';
import {useI18n} from '../../../../i18n/hook';
import {ResourceLoader} from '../../../../utils/services/resources/loader';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {sortAscending} from '../../../../utils/sort';
import {AdsStory} from '../../../elements/common/ads/main';
import {isNotFetched, useFetchState} from '../../../elements/common/fetch';
import {Loading} from '../../../elements/common/loading';
import {useUnitId} from '../../../elements/gameData/hook';
import {CollapsibleSectionedContent} from '../../../elements/posts/output/section';
import {StoryChapter} from './chapter';
import {StoryOtherInfo} from './other';


export const UnitStory = () => {
  const {lang} = useI18n();
  const unitId = useUnitId();

  if (!unitId) {
    return <></>;
  }

  const {
    fetchStatus: storyBook,
    fetchFunction: fetchStoryBook,
  } = useFetchState<StoryBook | undefined>(
    undefined,
    () => ResourceLoader.getStoryBook(lang, unitId),
    `Failed to fetch the unit story of ${unitId}`,
  );
  const {unitInfoMap} = useUnitInfo();
  const unitInfo = unitInfoMap.get(unitId);

  fetchStoryBook();

  if (isNotFetched(storyBook) || !storyBook.data) {
    return <Loading/>;
  }

  return (
    <>
      {unitInfo && <StoryOtherInfo unitInfo={unitInfo}/>}
      <Row>
        <Col>
          <CollapsibleSectionedContent
            sections={storyBook.data.sort(sortAscending({getComparer: (chapter) => chapter.id}))}
            getTitle={(chapter) => chapter.title}
            renderSection={(chapter) => (
              <>
                <AdsStory/>
                <StoryChapter chapter={chapter}/>
              </>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
