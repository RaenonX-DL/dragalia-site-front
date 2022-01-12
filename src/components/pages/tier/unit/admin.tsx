import React from 'react';

import {GeneralPath, makeUnitUrl, UnitPath} from '../../../../api-def/paths';
import {useI18n} from '../../../../i18n/hook';
import {ButtonBar} from '../../../elements/common/buttonBar';


type Props = {
  unitId: number
};

export const TierNoteUnitAdmin = ({unitId}: Props) => {
  const {t, lang} = useI18n();

  return (
    <ButtonBar
      buttons={[
        {
          variant: 'outline-warning',
          text: t((t) => t.game.unitTier.tier.edit),
          pathname: makeUnitUrl(UnitPath.UNIT_TIER_EDIT, {id: unitId, lang}),
        },
        {
          variant: 'outline-success',
          text: t((t) => t.game.unitTier.points.edit),
          pathname: GeneralPath.TIER_POINTS_EDIT,
        },
      ]}
    />
  );
};
