import React from 'react';

import {useSession} from 'next-auth/react';

import {ApiResponseCode, UnitInfoLookupLandingResponse} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {SubscribeButtonState} from '../../../../elements/common/button/subscribe/type';
import {isNotFetched, useFetchState} from '../../../../elements/common/fetch';
import {UnitSearcher} from '../../../../elements/gameData/unit/searcher/main';
import {PostManageBar} from '../../../../elements/posts/manageBar';
import {UnitInfoLookupLanding} from './in/landing';
import {orderName, sortFunc} from './in/sort/lookup';
import {generateInputData} from './in/utils';
import {UnitInfoLookupOutputBar} from './out/bar';
import {MaxEntriesToDisplay} from './out/const';
import {UnitInfoLookupOutput} from './out/main';


export const UnitInfoLookup = () => {
  const {t, lang} = useI18n();
  const {data} = useSession();

  const uid = data?.user.id.toString() || '';

  const {
    fetchStatus: lookupLanding,
    fetchFunction: fetchLookupLanding,
  } = useFetchState<UnitInfoLookupLandingResponse | null>(
    null,
    () => ApiRequestSender.unitInfoLookupLanding(uid, lang),
    'Failed to fetch the weapon type enums.',
  );
  const {
    fetchStatus: analysisMeta,
    fetchFunction: fetchAnalysisMeta,
  } = useFetchState(
    {
      code: ApiResponseCode.NOT_EXECUTED,
      success: false,
      analyses: [],
    },
    () => ApiRequestSender.analysisLookup(uid, lang),
    'Failed to fetch analysis meta.',
  );
  const globalSubscriptionButtonState = React.useState<SubscribeButtonState>({
    subscribed: false,
    updating: false,
  });
  const [globalSubscriptionState, setGlobalSubscriptionState] = globalSubscriptionButtonState;

  React.useEffect(() => {
    if (!lookupLanding.data) {
      return;
    }

    setGlobalSubscriptionState({
      ...globalSubscriptionState,
      subscribed: lookupLanding.data.userSubscribed,
    });
  }, [lookupLanding.data]);

  fetchLookupLanding();
  fetchAnalysisMeta();

  return (
    <>
      <UnitInfoLookupLanding
        analyses={lookupLanding.data?.analyses || []}
        disableSubscription={globalSubscriptionState.subscribed}
      />
      <hr/>
      <UnitSearcher
        sortOrderNames={orderName}
        generateInputData={generateInputData}
        renderIfAdmin={
          <PostManageBar
            newButtons={[
              {
                pathname: GeneralPath.ANALYSIS_NEW_CHARA,
                text: t((t) => t.posts.manage.addChara),
              },
              {
                pathname: GeneralPath.ANALYSIS_NEW_DRAGON,
                text: t((t) => t.posts.manage.addDragon),
              },
            ]}
            otherButtons={[{
              pathname: GeneralPath.UPDATE_UNIT_NAME_REF,
              text: t((t) => t.game.nameRef.manage),
              variant: 'outline-light',
            }]}
            bottomMarginClass="mb-3"
          />
        }
        renderAdditional={
          <UnitInfoLookupOutputBar
            state={globalSubscriptionButtonState}
            disabled={isNotFetched(lookupLanding)}
          />
        }
        renderOutput={(props) => (
          <UnitInfoLookupOutput
            analyses={analysisMeta.data.analyses}
            disableSubscription={globalSubscriptionState.subscribed}
            {...props}
          />
        )}
        renderCount={MaxEntriesToDisplay}
        onSearchRequested={(inputData) => GoogleAnalytics.analysisLookup(inputData)}
        isUnitPrioritized={(info) => info.id in analysisMeta.data.analyses}
        getSortedUnitInfo={(unitInfo, inputData) => (
          unitInfo
            .map((info) => ({unitInfo: info, lookupInfo: analysisMeta.data.analyses[info.id]}))
            .sort(sortFunc[inputData.sortBy])
            .map((item) => item.unitInfo)
        )}
        isLoading={analysisMeta.fetching}
      />
    </>
  );
};
