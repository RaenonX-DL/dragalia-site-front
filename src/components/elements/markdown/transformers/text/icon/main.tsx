import React from 'react';

import {DepotPaths} from '../../../../../../api-def/resources';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {Image} from '../../../../common/image';
import {TextComponentProps} from '../types';
import {IDENTIFIER_SEPARATOR} from './const';
import styles from './main.module.css';
import {IconType} from './types';


export const Icon = ({children}: TextComponentProps) => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);

  const [type, identifier] = children.split(IDENTIFIER_SEPARATOR, 2);

  if (type === IconType.AFFLICTION && context?.resources.afflictions.status.length) {
    const statusEnum = context?.resources.afflictions.status.find((entry) => entry.name === identifier);

    if (!statusEnum) {
      // Identifier invalid / not found
      return <>{children}</>;
    }

    if (!statusEnum.imagePath) {
      // No image to show
      return <></>;
    }

    return (
      <Image
        text={statusEnum.trans[lang]}
        src={DepotPaths.getImageURL(statusEnum.imagePath)}
        className={styles.afflictionIcon}
      />
    );
  }

  return <>{children}</>;
};
