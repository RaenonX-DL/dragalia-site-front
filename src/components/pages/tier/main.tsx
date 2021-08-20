import React from 'react';

import {ApiResponseCode, UnitTierNoteGetResponse} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {ButtonBar} from '../../elements/common/buttonBar';
import {useFetchState} from '../../elements/common/fetch';
import {UnitFilter} from '../../elements/gameData/unit/filter/main';
import {orderName} from './const';
import {useKeyPointData} from './hooks';
import {TierListOutput} from './out/main';
import {InputData} from './types';
import {generateInputData} from './utils';


export const TierList = () => {
  const {t, lang} = useI18n();
  const [inputData, setInputData] = React.useState<InputData>();

  const context = React.useContext(AppReactContext);

  const {keyPointData} = useKeyPointData();
  const {
    fetchStatus: tierData,
    fetchFunction: fetchTierNotes,
  } = useFetchState<UnitTierNoteGetResponse>(
    {
      code: ApiResponseCode.NOT_EXECUTED,
      success: false,
      data: {},
    },
    () => ApiRequestSender.getUnitTierNote(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch tier note data.',
  );

  fetchTierNotes();

  return (
    <>
      <UnitFilter
        onSearchRequested={(inputData) => () => setInputData(inputData)}
        sortOrderNames={orderName}
        generateInputData={generateInputData}
      />
      {
        context?.session?.user.isAdmin &&
        <ButtonBar
          buttons={[{
            variant: 'outline-light',
            text: t((t) => t.game.unitTier.points.edit),
            pathname: GeneralPath.TIER_POINTS_EDIT,
          }]}
          bottomMarginClass="mb-0"
        />
      }
      <hr/>
      <TierListOutput
        inputData={inputData}
        tierData={tierData.data.data}
        keyPointsData={keyPointData}
      />
    </>
  );
};
