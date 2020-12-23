import React from 'react';
import {useTranslation} from 'react-i18next';
import {ApiRequestSender} from '../../../../utils/services/api';
import {AnalysisPostFormChara, AnalysisPostFormDragon} from '../../../elements';

import {PageProps} from '../../base';


export const AnalysisNewChara = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const handleSubmit = (payload) => ApiRequestSender.analysisPostPublishChara(payload);

  fnSetTitle(t('pages.name.analysis_new_chara'));

  return (
    <AnalysisPostFormChara fnSendRequest={handleSubmit}/>
  );
};


export const AnalysisNewDragon = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const handleSubmit = (payload) => ApiRequestSender.analysisPostPublishDragon(payload);

  fnSetTitle(t('pages.name.analysis_new_dragon'));

  return (
    <AnalysisPostFormDragon fnSendRequest={handleSubmit}/>
  );
};
