import React from 'react';

import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {UnitLink} from '../../../gameData/unitInfo/link';


// This should NOT be `|` because it conflicts with the markdown table syntax
export const UNITNAME_SEPARATOR = '/';

type Props = {
  children: string,
}

export const MarkdownUnitName = ({children}: Props) => {
  const context = React.useContext(AppReactContext);
  const {lang} = useI18n();

  if (!context) {
    return <></>;
  }

  const [unitId, nameUsed] = children.split(UNITNAME_SEPARATOR, 2);

  const unitInfo = context.simpleUnitInfo[String(unitId)];

  if (!unitInfo) {
    // If `children` does not contain the separator, then `unitId` will be the original text
    return <>{nameUsed || unitId}</>;
  }

  return (
    <UnitLink
      unit={{
        id: +unitId,
        name: unitInfo.name[lang],
        icon: {
          type: unitInfo.type,
          name: unitInfo.icon,
        },
      }}
    />
  );
};
