import React from 'react';

import {useSession} from 'next-auth/react';

import {ApiResponseCode, Dimension, UnitTierNoteGetResponse} from '../../../api-def/api';
import {GeneralPath} from '../../../api-def/paths';
import {useI18n} from '../../../i18n/hook';
import {overrideObject} from '../../../utils/override';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {SubscriptionButtonBar} from '../../elements/common/button/subscribe/bar';
import {SubscribeButtonState} from '../../elements/common/button/subscribe/type';
import {ButtonBar} from '../../elements/common/buttonBar';
import {isNotFetched, useFetchState} from '../../elements/common/fetch';
import {Loading} from '../../elements/common/loading';
import {UnitSearcher} from '../../elements/gameData/unit/searcher/main';
import {MaxEntriesToDisplay, orderName, sortFunc} from './const';
import {useKeyPointData} from './hooks';
import {TierListOutput} from './out/main';
import {Display, DisplayOption, InputData} from './types';
import {generateInputData} from './utils';


export const TierList = () => {
  const {t, lang} = useI18n();
  const {data: session} = useSession();
  const {keyPointData} = useKeyPointData();
  const {
    fetchStatus: tierDataResponse,
    fetchFunction: fetchTierNotes,
  } = useFetchState<UnitTierNoteGetResponse>(
    {code: ApiResponseCode.NOT_EXECUTED, success: false, data: {}, userSubscribed: false},
    () => ApiRequestSender.getUnitTierNote(session?.user.id.toString() || '', lang),
    'Failed to fetch tier note data.',
  );
  const globalSubscriptionButtonState = React.useState<SubscribeButtonState>({
    subscribed: false,
    updating: false,
  });
  const [globalSubscriptionState, setGlobalSubscriptionState] = globalSubscriptionButtonState;

  const options: Array<DisplayOption> = (Object.keys(Dimension).concat('all') as Array<Display>).map((display) => {
    const key = display as Display;

    return {key, text: t((t) => t.game.unitTier.display[key])};
  });

  const {data: tierData} = tierDataResponse.data;

  React.useEffect(() => {
    if (!tierDataResponse.data) {
      return;
    }

    setGlobalSubscriptionState({
      ...globalSubscriptionState,
      subscribed: tierDataResponse.data.userSubscribed,
    });
  }, [tierDataResponse.data]);

  fetchTierNotes();

  return (
    <UnitSearcher
      sortOrderNames={orderName}
      generateInputData={generateInputData}
      getAdditionalInputs={(inputData) => [{
        type: 'inputRadioGroup',
        options,
        getValue: (inputData: InputData) => inputData.display,
        getValueOfOption: (option: DisplayOption) => option.key,
        getUpdatedInputData: (display: Display) => overrideObject(inputData, {display}),
        groupName: 'display',
      }]}
      renderIfAdmin={
        <ButtonBar
          buttons={[{
            variant: 'outline-light',
            text: t((t) => t.game.unitTier.points.edit),
            pathname: GeneralPath.TIER_POINTS_EDIT,
          }]}
          bottomMarginClass="mb-3"
        />
      }
      renderAdditional={
        <SubscriptionButtonBar
          state={globalSubscriptionButtonState}
          subscriptionKey={{type: 'const', name: 'ALL_TIER'}}
          disabled={isNotFetched(tierDataResponse)}
        />
      }
      renderOutput={(props) => (
        tierDataResponse.data ?
          <TierListOutput
            tierData={tierDataResponse.data}
            keyPointsData={keyPointData}
            {...props}
          /> :
          <Loading/>
      )}
      renderCount={MaxEntriesToDisplay}
      isUnitPrioritized={(info) => info.id in tierData}
      getSortedUnitInfo={(unitInfo, inputData) => (
        unitInfo
          .map((info) => ({unitInfo: info, tierNote: tierData[info.id]}))
          .sort(sortFunc[inputData.sortBy])
          .map((obj) => obj.unitInfo)
      )}
      isLoading={tierDataResponse.fetching}
    />
  );
};
