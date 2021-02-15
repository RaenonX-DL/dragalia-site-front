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
          蔡老師&nbsp;
          <Badge variant="info">{t('donation.tier_sss')}</Badge>&nbsp;
          <Badge variant="orange">{t('misc.om_group')}</Badge>
        </li>
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
      </ul>
      <hr/>
      <div>{<Markdown>{t('message.info.donation')}</Markdown>}</div>
    </>
  );
};
