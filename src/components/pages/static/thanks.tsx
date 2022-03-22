import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../i18n/hook';
import {FullSizeButton} from '../../elements/common/button/fullSize';
import {RowRegular} from '../../elements/common/grid/row';
import {ExternalLink} from '../../elements/common/link/external';
import {Markdown} from '../../elements/markdown/main';


export const SpecialThanks = () => {
  const {t} = useI18n();

  return (
    <>
      <h3>
        <ExternalLink href="https://patreon.com/RaenonX" newWindow>Patreon</ExternalLink>
      </h3>
      <ul>
        <li>
          <Badge bg="dark-primary">{t((t) => t.donation.tierSSS)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          <Badge bg="warning">{t((t) => t.misc.contentContributor)}</Badge>&nbsp;
          桜井みゆき
        </li>
        <li>
          <Badge bg="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          <Badge bg="warning">{t((t) => t.misc.contentContributor)}</Badge>&nbsp;
          Andy
        </li>
        <li>
          <Badge bg="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Anny
        </li>
        <li>
          <Badge bg="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Ellie
        </li>
        <li>
          <Badge bg="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Kevin
        </li>
        <li>
          <Badge bg="dark-info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Piglet&nbsp;/&nbsp;ピグレット
        </li>
        <li>
          <Badge bg="dark-info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Ting Chen
        </li>
        <li>
          <Badge bg="dark-info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          陳泓維
        </li>
      </ul>
      <hr/>
      <div>
        <h4>{t((t) => t.message.donation.url)}</h4>
        <Markdown>{t((t) => t.message.donation.info)}</Markdown>
        <div className="mb-3"/>
        <RowRegular>
          <Col>
            <FullSizeButton href="https://patreon.com/RaenonX" variant="outline-light">
              Patreon
            </FullSizeButton>
          </Col>
          <Col>
            <FullSizeButton href="https://ko-fi.com/RaenonX" variant="outline-light">
              Ko-Fi
            </FullSizeButton>
          </Col>
          <Col>
            <FullSizeButton href="http://rnnx.cc/Paypal" variant="outline-light">
              Paypal
            </FullSizeButton>
          </Col>
        </RowRegular>
      </div>
    </>
  );
};
