import React from 'react';

import {PositionalInfo, QuestPostPublishPayload} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {generateNewPositionInfo} from '../../../../../utils/services/api/utils';
import {ArrayDataForm} from '../../shared/form/array';
import {PostFormDataProps, PostFormState} from '../../shared/form/types';
import {QuestPositionUnit} from './positionUnit';

type FormPositionalProps<P extends QuestPostPublishPayload> = Pick<PostFormDataProps<P>, 'formState'> & {
  setState: (newState: PostFormState<P>) => void,
}

export const FormPositional = <P extends QuestPostPublishPayload>({
  formState,
  setState,
}: FormPositionalProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  const setSkills = (positional: Array<PositionalInfo>) => {
    setState({
      ...formState,
      payload: {
        ...payload,
        positional,
      },
    });
  };

  return (
    <>
      <h5>{t((t) => t.posts.quest.positional)}</h5>
      <ArrayDataForm
        payload={payload}
        minLength={1}
        getArray={(payload) => payload.positional}
        setArray={setSkills}
        updateElementValue={(element, key, value) => element[key] = value}
        generateNewElement={generateNewPositionInfo}
        renderEntries={(posInfo, onChange) => (
          <div className="mt-2">
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
          </div>
        )}
      />
    </>
  );
};
