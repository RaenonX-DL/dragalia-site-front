import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {CookiesControl} from '../../../../utils/cookies';
import {
  ApiRequestSender,
  generateNewCharaSkill,
} from '../../../../utils/services/api';
import {
  AnalysisFormCharaNew,
  AnalysisFormDragonNew,
} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisNewChara = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  fnSetTitle(t((t) => t.pages.name.analysisNewChara));

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
        title: '',
        summary: '',
        summon: '',
        passives: '',
        normalAttacks: '',
        forceStrikes: '',
        skills: [
          generateNewCharaSkill('S1'),
          generateNewCharaSkill('S2'),
        ],
        tipsBuilds: '',
        videos: '',
        story: '',
        keywords: '',
      }}
      fnSendRequest={ApiRequestSender.analysisPostPublishChara}
    />
  );
};

export const AnalysisNewDragon = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  fnSetTitle(t((t) => t.pages.name.analysisNewDragon));

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
        title: '',
        summary: '',
        summon: '',
        passives: '',
        normalAttacks: '',
        ultimate: '',
        notes: '',
        suitableCharacters: '',
        videos: '',
        story: '',
        keywords: '',
      }}
      fnSendRequest={ApiRequestSender.analysisPostPublishDragon}
    />
  );
};
