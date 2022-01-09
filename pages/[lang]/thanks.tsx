import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {FullSizeButton} from '../../src/components/elements/common/button/fullSize';
import {ExternalLink} from '../../src/components/elements/common/link/external';
import {Markdown} from '../../src/components/elements/markdown/main';
import {useI18n} from '../../src/i18n/hook';


const SpecialThanks = () => {
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
          桜井みゆき
        </li>
        <li>
          <Badge bg="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge bg="dark-orange">{t((t) => t.misc.omMember)}</Badge>&nbsp;
          Andy
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
        <Row className="g-3">
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
        </Row>
      </div>
    </>
  );
};

export default SpecialThanks;
