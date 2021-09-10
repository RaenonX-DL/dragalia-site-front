import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FailedResponse, isFailedResponse, KeyPointInfo, KeyPointInfoResponse} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {AdsPageTop, AdsUnitKeyPointInfo} from '../../../../elements/common/ads/main';
import {useFetchStateProcessed} from '../../../../elements/common/fetch';
import {Loading} from '../../../../elements/common/loading';
import {PointTypeIcon} from '../../icons';
import {UnitEntry} from './unitEntry';


export const KeyPointInfoPage = () => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const {query} = useNextRouter();
  const {unitInfoMap} = useUnitInfo();

  const pointId = query.id as string;

  const {
    fetchStatus: keyPointInfo,
    fetchFunction: fetchKeyPointInfo,
  } = useFetchStateProcessed<KeyPointInfo | undefined, KeyPointInfoResponse | FailedResponse>(
    undefined,
    () => ApiRequestSender.getKeyPointInfo(context?.session?.user.id.toString() || '', lang, pointId),
    'Failed to fetch key point info.',
    (response) => isFailedResponse(response) ? undefined : response.info,
  );

  fetchKeyPointInfo();

  if (!keyPointInfo.fetched || !keyPointInfo.data) {
    return <Loading/>;
  }

  const {entry, linkedUnits} = keyPointInfo.data;

  return (
    <>
      <AdsPageTop/>
      <h4>
        {PointTypeIcon[entry.type]}&nbsp;
        {entry.description}
      </h4>
      <hr/>
      <AdsUnitKeyPointInfo/>
      <h5>{t((t) => t.game.unitTier.points.info.linkedUnits)}</h5>
      <Form.Row>
        {
          linkedUnits.length > 0 ?
            linkedUnits.sort().map((unitId) => {
              const unitInfo = unitInfoMap.get(unitId);

              if (!unitInfo) {
                return <React.Fragment key={unitId}/>;
              }

              return (
                <Col md={6} lg={4} xl={3} key={unitId}>
                  <UnitEntry unitInfo={unitInfo}/>
                </Col>
              );
            }) :
            <Col className="section text-danger">
              {t((t) => t.game.unitTier.points.info.error.noLinkedUnits)}
            </Col>
        }
      </Form.Row>
      <AdsUnitKeyPointInfo/>
    </>
  );
};
