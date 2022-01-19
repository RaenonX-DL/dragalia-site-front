import React from 'react';

import {FailedResponse, HomepageLandingResponse, isFailedResponse} from '../../../api-def/api';
import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {AdsToolBottom} from '../../elements/common/ads/main';
import {isNotFetched, useFetchState} from '../../elements/common/fetch';
import {Loading} from '../../elements/common/loading';
import {SiteFeatures} from './sections/features/main';
import {SiteStats} from './sections/stats/main';
import {RecentUpdatedPosts} from './sections/updatesPosts/main';


export const Home = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {
    fetchStatus: homepageData,
    fetchFunction: fetchHomepageData,
  } = useFetchState<HomepageLandingResponse | FailedResponse | undefined>(
    undefined,
    () => ApiRequestSender.getHomepageLanding(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch homepage landing data.',
  );

  fetchHomepageData();

  return (
    <>
      <SiteFeatures/>
      <AdsToolBottom/>
      <hr/>
      {
        !isNotFetched(homepageData) && homepageData.data && !isFailedResponse(homepageData.data) ?
          <>
            <SiteStats response={homepageData.data}/>
            <AdsToolBottom/>
            <hr/>
            <RecentUpdatedPosts response={homepageData.data}/>
          </>:
          <Loading/>
      }
    </>
  );
};
