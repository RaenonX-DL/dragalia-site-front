import React from 'react';

import {Badge} from 'react-bootstrap';

import {useI18n} from '../../i18n/hook';
import {Markdown} from '../elements/markdown/main';
import {PageProps} from './props';

export const SpecialThanks = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  fnSetTitle(t((t) => t.meta.inUse.thanks.title));

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
        {<Markdown>{t((t) => t.message.donation.info)}</Markdown>}
        <ul>
          <li><a href="https://patreon.com/RaenonX" target="_blank" rel="noreferrer">Patreon</a></li>
          <li><a href="https://ko-fi.com/RaenonX" target="_blank" rel="noreferrer">Ko-Fi</a></li>
          <li><a href="https://rnnx.cc/Paypal" target="_blank" rel="noreferrer">Paypal</a></li>
        </ul>
      </div>
    </>
  );
};
