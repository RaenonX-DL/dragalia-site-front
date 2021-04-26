import React from 'react';

import {PositionalInfo, QuestPostPayload} from '../../../../../api-def/api/post/quest/payload';
import {useTranslation} from '../../../../../i18n/utils';
import {generateNewPositionInfo} from '../../../../../utils/services/api/utils';
import {ArrayDataForm} from '../../shared/form/array';
import {PostFormDataProps, PostFormState} from '../../shared/form/types';
import {QuestPositionForm} from './positionalForm';

type FormPositionalProps<P extends QuestPostPayload> = Pick<PostFormDataProps<P>, 'formState'> & {
  setState: (newState: PostFormState<P>) => void,
}

export const FormPositional = <P extends QuestPostPayload>({
  formState,
  setState,
}: FormPositionalProps<P>) => {
  const {t} = useTranslation();

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
      <h5>{t('posts.quest.positional')}</h5>
      <ArrayDataForm
        payload={payload}
        minLength={2}
        getArray={(payload) => payload.positional}
        setArray={setSkills}
        updateElementValue={(element, key, value) => element[key] = value}
        generateNewElement={generateNewPositionInfo}
        renderEntries={(posInfo, onChange) => (
          <div className="mt-2">
            <QuestPositionForm
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
