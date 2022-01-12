import React from 'react';

import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../i18n/hook';
import {AdsToolBottom, AdsToolTop} from '../../../elements/common/ads/main';
import {RowRegular} from '../../../elements/common/grid/row';
import {NumericInputProps} from '../../../elements/common/input/numeric';
import {EnmityCharts} from './charts';
import {EnmityHPFields} from './hp';
import {EnmityModsFields} from './mods';
import {EnmityData} from './types';
import {generateEnmityData} from './utils';


export const EnmityCalculator = () => {
  const {t} = useI18n();
  const [inputData, setInputData] = React.useState<EnmityData>(generateEnmityData());

  const commonInputProps: Pick<NumericInputProps<EnmityData>, 'inputData' | 'setInputData'> = {
    inputData,
    setInputData,
  };

  return (
    <>
      <AdsToolTop/>
      <RowRegular>
        <Col md>
          <h3>{t((t) => t.game.calc.enmity.title.mod)}</h3>
          <EnmityModsFields {...commonInputProps}/>
        </Col>
        <Col md>
          <h3>{t((t) => t.game.calc.enmity.title.hp)}</h3>
          <EnmityHPFields {...commonInputProps}/>
        </Col>
      </RowRegular>
      <RowRegular className="mb-3" style={{height: '27rem'}}>
        <Col>
          <EnmityCharts inputData={inputData}/>
        </Col>
      </RowRegular>
      <AdsToolBottom/>
    </>
  );
};
