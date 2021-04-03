import React from 'react';
import {Badge} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Markdown} from '../elements/markdown/main';
import {PageProps} from './base';

export const SpecialThanks = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.thanks'));

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
          <Badge variant="info">{t('donation.tier_s2')}</Badge>&nbsp;
          <Badge variant="orange">{t('misc.om_member')}</Badge>
        </li>
        <li>
          Ellie&nbsp;
          <Badge variant="info">{t('donation.tier_s2')}</Badge>&nbsp;
          <Badge variant="orange">{t('misc.om_member')}</Badge>
        </li>
        <li>
          Piglet&nbsp;/&nbsp;ピグレット
          <Badge variant="info">{t('donation.tier_s1')}</Badge>&nbsp;
          <Badge variant="orange">{t('misc.om_group')}</Badge>
        </li>
        <li>
          皮皮熊艹&nbsp;
          <Badge variant="info">{t('donation.tier_s2')}</Badge>&nbsp;
          <Badge variant="orange">{t('misc.om_member')}</Badge>
        </li>
        <li>
          陳泓維&nbsp;
          <Badge variant="info">{t('donation.tier_s1')}</Badge>
        </li>
      </ul>
      <hr/>
      <div>
        <h4>{t('message.donation.url')}</h4>
        {<Markdown>{t('message.donation.info')}</Markdown>}
        <ul>
          <li><a href="https://patreon.com/RaenonX" target="_blank" rel="noreferrer">Patreon</a></li>
          <li><a href="https://ko-fi.com/RaenonX" target="_blank" rel="noreferrer">Ko-Fi</a></li>
          <li><a href="https://rnnx.cc/Paypal" target="_blank" rel="noreferrer">Paypal</a></li>
        </ul>
      </div>
    </>
  );
};
