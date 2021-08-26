import React from 'react';

import {useI18n} from '../../../i18n/hook';
import {ButtonBar, ButtonBarProps, ButtonEntry} from '../common/buttonBar';


type NewButtonEntry = {
  pathname: string,
  text?: string,
}

export type PostManageBarProps = Pick<ButtonBarProps, 'bottomMarginClass'> & {
  newButtons: Array<NewButtonEntry>,
  otherButtons?: Array<ButtonEntry>,
  editPostUrl?: string
}

export const PostManageBar = ({newButtons, otherButtons, editPostUrl, bottomMarginClass}: PostManageBarProps) => {
  const {t} = useI18n();

  // First is placed rightmost
  const buttons: Array<ButtonEntry> = [];

  if (editPostUrl) {
    buttons.push({
      pathname: editPostUrl,
      variant: 'outline-info',
      text: t((t) => t.posts.manage.edit),
    });
  }

  buttons.push(...newButtons.map((entry) => ({
    ...entry,
    variant: 'outline-success',
    text: entry.text || t((t) => t.posts.manage.add),
  })));

  if (otherButtons?.length) {
    buttons.push(...otherButtons);
  }

  return (
    <ButtonBar
      buttons={buttons}
      bottomMarginClass={bottomMarginClass}
    />
  );
};
