import React from 'react';

import {UnitType} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {CookiesControl} from '../../../../utils/cookies';
import {ApiRequestSender, generateNewCharaSkill} from '../../../../utils/services/api';
import {AnalysisFormCharaNew, AnalysisFormDragonNew} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisNewChara = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  fnSetTitle(t((t) => t.meta.inUse.analysisNewChara.title));

  return (
    <AnalysisFormCharaNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
        type: UnitType.CHARACTER,
        unitId: 0,
        summary: '',
        summonResult: '',
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
      fnSendRequest={ApiRequestSender.analysisPublishChara}
    />
  );
};

export const AnalysisNewDragon = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  fnSetTitle(t((t) => t.meta.inUse.analysisNewDragon.title));

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        googleUid: CookiesControl.getGoogleUid() || '',
        lang: lang,
        type: UnitType.DRAGON,
        unitId: 0,
        summary: '',
        summonResult: '',
        passives: '',
        normalAttacks: '',
        ultimate: '',
        notes: '',
        suitableCharacters: '',
        videos: '',
        story: '',
        keywords: '',
      }}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
    />
  );
};
