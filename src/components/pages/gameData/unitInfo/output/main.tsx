import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {UnitMetaParams} from '../../../../../api-def/api';
import {DepotPaths, InfoDataAdvanced} from '../../../../../api-def/resources';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../elements/common/fetch';
import {Image} from '../../../../elements/common/image';
import {Loading} from '../../../../elements/common/loading';
import {AbilityBlock} from './elements/ability/main';
import {RelatedLinks} from './elements/links';
import {UnitNameBlock} from './elements/name';
import {NormalAttackSection} from './elements/normalAttack/section';
import {SkillSection} from './elements/skill/section';


export const UnitInfo = () => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const {query} = useNextRouter();

  if (!context) {
    return <></>;
  }

  // `context.params` contains the unit ID via direct visit
  // `query.id` will contains the unit ID via in-site redirection
  const unitId = (context.params as UnitMetaParams).unitId || +(query.id as string);
  const {fetchStatus: info, fetchFunction: fetchInfo} = useFetchState<InfoDataAdvanced | undefined>(
    undefined,
    () => ResourceLoader.getAdvancedUnitInfo(unitId),
    `Failed to fetch the unit info of ${unitId}`,
  );

  fetchInfo();

  if (!info.data) {
    if (info.fetching) {
      return <Loading/>;
    }
    return <span className="h2">{t((t) => t.meta.error['404'].description)}</span>;
  }

  return (
    <>
      <UnitNameBlock info={info.data.basic}/>
      <div className="my-2"/>
      <RelatedLinks unitId={info.data.basic.id}/>
      <hr className="my-3"/>
      <Row className="mb-3">
        <Col lg={6}>
          <Image
            src={DepotPaths.getUnitImageURL(info.data.type, info.data.basic.iconName)}
            text={info.data.basic.name[lang]}
          />
        </Col>
        <Col lg={6}>
          <AbilityBlock unitId={info.data.basic.id} info={info.data.ability}/>
        </Col>
      </Row>
      <SkillSection unitId={info.data.basic.id} info={info.data.skill}/>
      <div className="mb-3"/>
      <NormalAttackSection unitId={info.data.basic.id}/>
    </>
  );
};
