import React from 'react';

import Col from 'react-bootstrap/Col';

import {PostPath, StoryPath, UnitPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makePostUrl, makeStoryUrl, makeUnitUrl} from '../../../../../utils/path/make';
import {RowTight} from '../../../common/grid/row';
import {UnitLinkButton} from './button';
import {UnitInfo} from './types';


export type UnitLinkModalProps = {
  unit: UnitInfo,
  hasAnalysis?: boolean,
};

export const UnitLinkModal = ({unit, hasAnalysis}: UnitLinkModalProps) => {
  const {t, lang} = useI18n();

  return (
    <div className="text-center">
      <RowTight className="mb-3">
        {
          hasAnalysis &&
          <Col>
            <UnitLinkButton
              link={makePostUrl(PostPath.ANALYSIS, {pid: unit.id, lang})}
              text={t((t) => t.game.unitInfo.links.analysis)}
              featureKey="analysis"
            />
          </Col>
        }
        <Col>
          <UnitLinkButton
            link={makeUnitUrl(UnitPath.UNIT_TIER, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.tier)}
            featureKey="tier"
          />
        </Col>
      </RowTight>
      <RowTight>
        <Col>
          <UnitLinkButton
            link={makeUnitUrl(UnitPath.UNIT_INFO, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.info)}
            featureKey="info"
          />
        </Col>
        <Col>
          <UnitLinkButton
            link={makeStoryUrl(StoryPath.UNIT, {id: unit.id, lang})}
            text={t((t) => t.game.unitInfo.links.story)}
            featureKey="story"
          />
        </Col>
      </RowTight>
    </div>
  );
};
