import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {NumericInput} from '../../../common/input/numeric';
import {SectionTitle} from '../../elements/title';
import {SectionProps} from './props';

export const SectionPunisher = ({inputData, setInputData}: SectionProps) => {
  const {t} = useI18n();

  return (
    <>
      <SectionTitle
        title={t((t) => t.game.skillAtk.name.punisher)}
        description={t((t) => t.game.skillAtk.desc.punisher)}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.punisherBk)}
        description={t((t) => t.game.skillAtk.desc.punisherBk)}
        inputData={inputData}
        inputKey="punishersBkPct"
        setInputData={setInputData}
      />
      <NumericInput
        title={t((t) => t.game.skillAtk.name.punisherOthers)}
        description={t((t) => t.game.skillAtk.desc.punisherOthers)}
        inputData={inputData}
        inputKey="punishersOtherPct"
        setInputData={setInputData}
      />
    </>
  );
};
