import React from 'react';

import {Badge} from 'react-bootstrap';

import {Markdown} from '../src/components/elements/markdown/main';
import {useI18n} from '../src/i18n/hook';


const SpecialThanks = () => {
  const {t} = useI18n();

  return (
    <>
      <h3>
        <a href="https://patreon.com/RaenonX" target="_blank" rel="noreferrer">
          Patreon
        </a>
      </h3>
      <ul>
        <li>
          Andy&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          Ellie&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          Piglet&nbsp;/&nbsp;ピグレット
          <Badge variant="info">{t((t) => t.donation.tierS1)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omGroup)}</Badge>
        </li>
        <li>
          皮皮熊艹&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS2)}</Badge>&nbsp;
          <Badge variant="orange">{t((t) => t.misc.omMember)}</Badge>
        </li>
        <li>
          陳泓維&nbsp;
          <Badge variant="info">{t((t) => t.donation.tierS1)}</Badge>
        </li>
      </ul>
      <hr/>
      <div>
        <h4>{t((t) => t.message.donation.url)}</h4>
        <Markdown>{t((t) => t.message.donation.info)}</Markdown>
        <ul>
          <li><a href="https://patreon.com/RaenonX" target="_blank" rel="noreferrer">Patreon</a></li>
          <li><a href="https://ko-fi.com/RaenonX" target="_blank" rel="noreferrer">Ko-Fi</a></li>
          <li><a href="https://rnnx.cc/Paypal" target="_blank" rel="noreferrer">Paypal</a></li>
        </ul>
      </div>
    </>
  );
};

export default SpecialThanks;
