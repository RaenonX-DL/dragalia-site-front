import React from 'react';

import {UnitInfoLookupLandingResponse} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {useFetchState} from '../../../../elements/common/fetch';
import {UnitSearcher} from '../../../../elements/gameData/unit/searcher/main';
import {PostManageBar} from '../../../../elements/posts/manageBar';
import {UnitInfoLookupLanding} from './in/landing';
import {orderName} from './in/sort/lookup';
import {generateInputData} from './in/utils';
import {MaxEntriesToDisplay} from './out/const';
import {UnitInfoLookupOutput} from './out/main';


export const UnitInfoLookup = () => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const {
    fetchStatus: lookupLanding,
    fetchFunction: fetchLookupLanding,
  } = useFetchState<UnitInfoLookupLandingResponse | null>(
    null,
    () => ApiRequestSender.unitInfoLookupLanding(context?.session?.user.id.toString() || '', lang),
    'Failed to fetch the weapon type enums.',
  );

  fetchLookupLanding();

  return (
    <>
      <UnitInfoLookupLanding analyses={lookupLanding.data?.analyses || []}/>
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
            bottomMarginClass="mb-2"
          />
        }
        renderOutput={(props) => <UnitInfoLookupOutput {...props}/>}
        onSearchRequested={(inputData) => GoogleAnalytics.analysisLookup(inputData)}
        renderCount={MaxEntriesToDisplay}
      />
    </>
  );
};
