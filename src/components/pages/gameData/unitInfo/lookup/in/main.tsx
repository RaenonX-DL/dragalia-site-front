import React, {FormEvent} from 'react';

import {GeneralPath} from '../../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {UnitFilter} from '../../../../../elements/gameData/unit/filter/main';
import {PostManageBar} from '../../../../../elements/posts/manageBar';
import {orderName} from './sort/lookup';
import {InputData} from './types';
import {generateInputData} from './utils';


type LookupInputProps = {
  onSearchRequested: (inputData: InputData) => (event: FormEvent<HTMLFormElement>) => void,
}

export const UnitInfoLookupInput = ({onSearchRequested}: LookupInputProps) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  return (
    <>
      <UnitFilter
        sortOrderNames={orderName}
        onSearchRequested={onSearchRequested}
        generateInputData={generateInputData}
      />
      {
        context?.session?.user.isAdmin &&
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
    </>
  );
};
