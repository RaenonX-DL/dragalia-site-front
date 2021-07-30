import React from 'react';

import {QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {generateNewPositionInfo} from '../../../../../utils/services/api/utils';
import {ArrayDataForm} from '../../shared/form/array';
import {PostFormDataProps} from '../../shared/form/types';
import {QuestPositionUnit} from './positionUnit';


export const FormPositional = <P extends QuestPostPublishPayload>({formState, setPayload}: PostFormDataProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  return (
    <>
      <h5>{t((t) => t.posts.quest.positional)}</h5>
      <ArrayDataForm
        payload={payload}
        minLength={1}
        getArray={(payload) => payload.positional}
        setArray={(positional) => setPayload('positional', positional)}
        getUpdatedElement={(element, key, value) => ({...element, [key]: value})}
        generateNewElement={generateNewPositionInfo}
        renderEntries={(posInfo, onChange) => (
          <QuestPositionUnit
            positionName={posInfo.position}
            builds={posInfo.builds}
            rotations={posInfo.rotations}
            tips={posInfo.tips}
            onPositionNameChanged={onChange('position')}
            onBuildsChanged={onChange('builds')}
            onRotationsChanged={onChange('rotations')}
            onTipsChanged={onChange('tips')}
          />
        )}
      />
    </>
  );
};
