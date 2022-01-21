import React from 'react';

import {useSession} from 'next-auth/react';

import {CharaAnalysisBody, CharaAnalysisEditPayload} from '../../../../../../api-def/api';
import {ApiRequestSender} from '../../../../../../utils/services/api/requestSender';
import {PostEditCommon} from '../../../../../elements/posts/form/edit';
import {PostFormState} from '../../../../../elements/posts/form/types';
import {AnalysisFormChara} from './main';


type Props = {
  analysis: CharaAnalysisBody,
};

export const AnalysisFormCharaEdit = ({analysis}: Props) => {
  const {data} = useSession();
  const [formState, setFormState] = React.useState<PostFormState<CharaAnalysisEditPayload>>({
    payload: {
      // Explicit assignments to ensure no other properties like `viewCount` from `response` is included.
      // These properties from post get should **NOT** be included in the payload.
      uid: data?.user.id.toString() || '',
      lang: analysis.lang,
      type: analysis.type,
      unitId: analysis.unitId,
      summary: analysis.summary,
      summonResult: analysis.summonResult,
      passives: analysis.passives,
      normalAttacks: analysis.normalAttacks,
      forceStrikes: analysis.forceStrikes,
      skills: analysis.skills,
      tipsBuilds: analysis.tipsBuilds,
      videos: analysis.videos,
      editNote: '',
      sendUpdateEmail: true,
    },
    isIdAvailable: true,
    isPreloaded: true,
  });

  return (
    <AnalysisFormChara
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.analysisEditChara}
      renderOnPreloaded={(setPayload) => (
        <PostEditCommon
          formState={formState}
          setPayload={setPayload}
        />
      )}
    />
  );
};
