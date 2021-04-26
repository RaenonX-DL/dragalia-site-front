import React from 'react';

import {DragonAnalysisEditPayload} from '../../../../../api-def/api/post/analysis/payload';
import {DragonAnalysis} from '../../../../../api-def/api/post/analysis/response';
import {getGoogleUid} from '../../../common/googleSignin/main';
import {PostEditCommon} from '../../shared/form/edit';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {DragonAnalysisForm} from './dragonBody';


type AnalysisFormDragonEditProps<P extends DragonAnalysisEditPayload> =
  PostFormFetchProps<P> & {
  initialAnalysis: DragonAnalysis,
}

export const AnalysisFormDragonEdit = ({
  initialAnalysis, fnSendRequest,
}: AnalysisFormDragonEditProps<DragonAnalysisEditPayload>) => {
  const [formState, setFormState] = React.useState<PostFormState<DragonAnalysisEditPayload>>({
    payload: {
      googleUid: getGoogleUid() || '',
      seqId: initialAnalysis.seqId,
      lang: initialAnalysis.lang,
      title: initialAnalysis.title,
      summary: initialAnalysis.summary,
      summon: initialAnalysis.summonResult,
      passives: initialAnalysis.passives,
      normalAttacks: initialAnalysis.normalAttacks,
      ultimate: initialAnalysis.ultimate,
      notes: initialAnalysis.notes,
      suitableCharacters: initialAnalysis.suitableCharacters,
      videos: initialAnalysis.videos,
      story: initialAnalysis.story,
      keywords: initialAnalysis.keywords,
      editNote: '',
    },
    isIdAvailable: true,
    isPreloaded: true,
  });

  return (
    <AnalysisFormBase
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={fnSendRequest}
      renderMain={(setPayload) => (
        <DragonAnalysisForm
          formState={formState}
          setPayload={setPayload}
        />
      )}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};
