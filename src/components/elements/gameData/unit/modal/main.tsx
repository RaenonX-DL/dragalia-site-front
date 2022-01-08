import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PostPath, StoryPath, UnitPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl, makeStoryUrl, makeUnitUrl} from '../../../../../utils/path/make';
import {UnitLinkButton} from './button';
import {UnitInfo, UnitLinkModalState} from './types';


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
      <Row className="mb-3">
        {
          hasAnalysis &&
          <Col>
            <UnitLinkButton
              link={makePostUrl(PostPath.ANALYSIS, {pid: unit.id, lang})}
              text={t((t) => t.game.unitInfo.links.analysis)}
              onLinkClicked={onLinkClicked}
              featureKey="analysis"
            />
          </Col>
        }
        <Col>
          <UnitLinkButton
            link={makeUnitUrl(UnitPath.UNIT_TIER, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.tier)}
            onLinkClicked={onLinkClicked}
            featureKey="tier"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <UnitLinkButton
            link={makeUnitUrl(UnitPath.UNIT_INFO, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.info)}
            onLinkClicked={onLinkClicked}
            featureKey="info"
          />
        </Col>
        <Col>
          <UnitLinkButton
            link={makeStoryUrl(StoryPath.UNIT, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.story)}
            onLinkClicked={onLinkClicked}
            featureKey="story"
          />
        </Col>
      </Row>
    </div>
  );
};
