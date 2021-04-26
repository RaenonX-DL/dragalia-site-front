import React from 'react';

import {useTranslation} from '../../../../i18n/utils';
import {
  ApiRequestSender,
  generateNewCharaSkill,
} from '../../../../utils/services/api';
import {
  AnalysisFormCharaNew,
  AnalysisFormDragonNew,
  getGoogleUid,
} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisNewChara = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useTranslation();

  fnSetTitle(t('pages.name.analysis_new_chara'));

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        googleUid: getGoogleUid() || '',
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
  const {t, lang} = useTranslation();

  fnSetTitle(t('pages.name.analysis_new_dragon'));

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        googleUid: getGoogleUid() || '',
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
