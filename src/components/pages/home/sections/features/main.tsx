import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FailedResponse, HomepageLandingResponse, isFailedResponse} from '../../../../../api-def/api';
import {GeneralPath} from '../../../../../api-def/paths';
import {featureBtnColors} from '../../../../../const/colors';
import {useI18n} from '../../../../../i18n/hook';
import {SubscribeButton} from '../../../../elements/common/button/subscribe/main';
import {SubscribeButtonState} from '../../../../elements/common/button/subscribe/type';
import {RowRegular} from '../../../../elements/common/grid/row';
import mainStyles from '../../main.module.css';
import {FeatureButton} from './button';


type Props = {
  response: HomepageLandingResponse | FailedResponse | undefined,
};

export const SiteFeatures = ({response}: Props) => {
  const {t} = useI18n();

  const state = React.useState<SubscribeButtonState>({subscribed: false, updating: false});
  const [buttonState, setButtonState] = state;

  React.useEffect(() => {
    if (response && !isFailedResponse(response)) {
      setButtonState({...buttonState, subscribed: response.subscribed.announcement});
    }
  }, [response]);

  return (
    <>
      <h1 className={mainStyles['section-title']}>
        {t((t) => t.home.section.features)}
      </h1>
      <RowRegular className="mb-3">
        <FeatureButton
          path={GeneralPath.INFO_LOOKUP}
          title={t((t) => t.meta.inUse.gameData.info.title)}
          variant={featureBtnColors.analysis}
        />
        <FeatureButton
          path={GeneralPath.TIER_LOOKUP}
          title={t((t) => t.meta.inUse.tier.lookup.title)}
          variant={featureBtnColors.tier}
        />
      </RowRegular>
      <RowRegular className="mb-3">
        <FeatureButton
          path={GeneralPath.EX}
          title={t((t) => t.meta.inUse.gameData.ex.title)}
          variant={featureBtnColors.ex}
        />
        <FeatureButton
          path={GeneralPath.SPECIAL_THANKS}
          title={t((t) => t.meta.inUse.thanks.title)}
          variant={featureBtnColors.thanks}
        />
      </RowRegular>
      <Row className="mb-3">
        <Col className="d-flex align-items-center justify-content-center">
          <span>
            {
              buttonState.subscribed ?
                t((t) => t.home.message.onSiteAnnouncementEnabled) :
                t((t) => t.home.message.onSiteAnnouncementDisabled)
            }
          </span>&nbsp;
          <SubscribeButton
            subscriptionKey={{type: 'const', name: 'ANNOUNCEMENT'}}
            state={state}
            disabled={!response || isFailedResponse(response)}
          />
        </Col>
      </Row>
    </>
  );
};
