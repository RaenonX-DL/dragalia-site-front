import React from 'react';

import Button from 'react-bootstrap/Button';

import {PostPath, StoryPath, UnitPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl, makeStoryUrl, makeUnitUrl} from '../../../../../utils/path/make';
import {InternalLink} from '../../../common/link/internal';
import {UnitLinkModalState, UnitInfo} from './types';


export type UnitLinkModalProps = {
  unit: UnitInfo,
  hasAnalysis?: boolean,
  modalState: UnitLinkModalState,
  setModalState: (newState: UnitLinkModalState) => void,
};

export const UnitLinkModal = ({unit, hasAnalysis, modalState, setModalState}: UnitLinkModalProps) => {
  const {t, lang} = useI18n();

  const onLinkClicked = () => {
    setModalState({...modalState, show: true, key: 'loading'});
  };

  return (
    <div className="text-center">
      {
        hasAnalysis &&
    <Button variant="link">
      <InternalLink
        href={makePostUrl(PostPath.ANALYSIS, {pid: unit.id, lang})}
        locale={lang}
        onClick={onLinkClicked}
        content={t((t) => t.game.unitInfo.links.analysis)}
      />
    </Button>
      }
      <Button variant="link">
        <InternalLink
          href={makeUnitUrl(UnitPath.UNIT_TIER, {id: unit.id, lang})}
          locale={lang}
          onClick={onLinkClicked}
          content={t((t) => t.game.unitInfo.links.tier)}
        />
      </Button>
      <Button variant="link">
        <InternalLink
          href={makeUnitUrl(UnitPath.UNIT_INFO, {id: unit.id, lang})}
          locale={lang}
          onClick={onLinkClicked}
          content={t((t) => t.game.unitInfo.links.info)}
        />
      </Button>
      <Button variant="link">
        <InternalLink
          href={makeStoryUrl(StoryPath.UNIT, {id: unit.id, lang})}
          locale={lang}
          onClick={onLinkClicked}
          content={t((t) => t.game.unitInfo.links.story)}
        />
      </Button>
    </div>
  );
};
