import React from 'react';

import Badge from 'react-bootstrap/Badge';

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
          桜井みゆき&nbsp;
          <Badge variant="primary">{t((t) => t.donation.tierSSS)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omGroup)}</Badge>
        </li>
        <li>
          Andy&nbsp;
          <Badge variant="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          Ellie&nbsp;
          <Badge variant="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          Kevin&nbsp;
          <Badge variant="secondary">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          N.O.-09&nbsp;
          <Badge variant="secondary">{t((t) => t.donation.tierS2)}</Badge>
        </li>
        <li>
          Piglet&nbsp;/&nbsp;ピグレット
          <Badge variant="info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          Ting Chen&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS1)}</Badge>
        </li>
        <li>
          陳泓維&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
      </ul>
      <hr/>
      <div>
        <h4>{t((t) => t.message.donation.url)}</h4>
        <Markdown>{t((t) => t.message.donation.info)}</Markdown>
        <ul>
          <li><ExternalLink href="https://patreon.com/RaenonX" newWindow>Patreon</ExternalLink></li>
          <li><ExternalLink href="https://ko-fi.com/RaenonX" newWindow>Ko-Fi</ExternalLink></li>
          <li><ExternalLink href="http://rnnx.cc/Paypal" newWindow>Paypal</ExternalLink></li>
        </ul>
      </div>
    </>
  );
};

export default SpecialThanks;
