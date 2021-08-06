import React from 'react';

import {
  DragonAnalysisBody,
  DragonAnalysisEditPayload,
} from '../../../../../../api-def/api';
import {AppReactContext} from '../../../../../../context/app/main';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostEditCommon} from '../../../../../elements/posts/form/edit';
import {PostFormState} from '../../../../../elements/posts/form/types';
import {AnalysisFormDragon} from './main';


type Props = {
  analysis: DragonAnalysisBody,
}

export const AnalysisFormDragonEdit = ({analysis}: Props) => {
  const context = React.useContext(AppReactContext);
  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisEditPayload>>({
    payload: {
      // Explicit to avoid unwanted properties
      uid: context?.session?.user.id.toString() || '',
      lang: analysis.lang,
      type: analysis.type,
      unitId: analysis.unitId,
      summary: analysis.summary,
      summonResult: analysis.summonResult,
      passives: analysis.passives,
      normalAttacks: analysis.normalAttacks,
      ultimate: analysis.ultimate,
      suitableCharacters: analysis.suitableCharacters,
      notes: analysis.notes,
      videos: analysis.videos,
      story: analysis.story,
      keywords: analysis.keywords,
      editNote: '',
    },
    isIdAvailable: true,
    isPreloaded: true,
  });

  return (
    <AnalysisFormDragon
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisEditDragon}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};
