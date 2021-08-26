import React from 'react';

import {ApiResponseCode, Dimension, UnitTierNoteGetResponse} from '../../../api-def/api';
import {GeneralPath} from '../../../const/path/definitions';
import {AppReactContext} from '../../../context/app/main';
import {useI18n} from '../../../i18n/hook';
import {overrideObject} from '../../../utils/override';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {ButtonBar} from '../../elements/common/buttonBar';
import {useFetchState} from '../../elements/common/fetch';
import {UnitSearcher} from '../../elements/gameData/unit/searcher/main';
import {MaxEntriesToDisplay, orderName} from './const';
import {useKeyPointData} from './hooks';
import {TierListOutput} from './out/main';
import {Display, DisplayOption, InputData} from './types';
import {generateInputData} from './utils';


export const TierList = () => {
  const {t, lang} = useI18n();

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

  const options: Array<DisplayOption> = (Object.keys(Dimension).concat('all') as Array<Display>).map((display) => {
    const key = display as Display;

    return {key, text: t((t) => t.game.unitTier.display[key])};
  });

  fetchTierNotes();

  return (
    <>
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
            bottomMarginClass="mb-0"
          />
        }
        renderOutput={(props) => (
          <TierListOutput
            tierData={tierData}
            keyPointsData={keyPointData}
            {...props}
          />
        )}
        renderCount={MaxEntriesToDisplay}
      />
    </>
  );
};
