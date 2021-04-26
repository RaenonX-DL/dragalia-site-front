import React from 'react';

import {CharaAnalysisEditPayload, CharacterAnalysis} from '../../../../../api-def/api';
import {getGoogleUid} from '../../../common/googleSignin/main';
import {PostEditCommon} from '../../shared/form/edit';
import {PostFormFetchProps, PostFormState} from '../../shared/form/types';
import {AnalysisFormBase} from './base';
import {CharaAnalysisForm} from './charaBody';


type AnalysisFormCharaEditProps<P extends CharaAnalysisEditPayload> =
  PostFormFetchProps<P> & {
  initialAnalysis: CharacterAnalysis,
}

export const AnalysisFormCharaEdit = ({
  initialAnalysis, fnSendRequest,
}: AnalysisFormCharaEditProps<CharaAnalysisEditPayload>) => {
  const [formState, setFormState] = React.useState<PostFormState<CharaAnalysisEditPayload>>({
    payload: {
      googleUid: getGoogleUid() || '',
      seqId: initialAnalysis.seqId,
      lang: initialAnalysis.lang,
      title: initialAnalysis.title,
      summary: initialAnalysis.summary,
      summon: initialAnalysis.summonResult,
      passives: initialAnalysis.passives,
      normalAttacks: initialAnalysis.normalAttacks,
      forceStrikes: initialAnalysis.forceStrikes,
      skills: initialAnalysis.skills,
      tipsBuilds: initialAnalysis.tipsBuilds,
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
        <CharaAnalysisForm
          formState={formState}
          setState={setFormState}
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
