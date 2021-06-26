import React, {MouseEvent} from 'react';

import Button from 'react-bootstrap/Button';

import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../common/fetch';
import {InputParameters} from './params';
import {SectionFilter} from './sections/filter';
import {InputData} from './types';
import {generateInputData} from './utils';


type InputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}

export const AttackingSkillInput = ({onSearchRequested}: InputProps) => {
  const {t} = useI18n();

  const [collapsed, setCollapsed] = React.useState(true);
  const [inputData, setInputData] = React.useState<InputData>(generateInputData());

  const {
    fetchStatus: conditionEnums,
    fetchFunction: fetchConditionEnums,
  } = useFetchState<CategorizedConditionEnums>(
    {
      afflictions: [],
      elements: [],
    },
    ResourceLoader.getEnumCategorizedConditions,
    'Failed to fetch the condition enums.',
  );
  const {
    fetchStatus: elemEnums,
    fetchFunction: fetchElemEnums,
  } = useFetchState<ElementEnums>(
    {
      elemental: [],
    },
    ResourceLoader.getEnumElements,
    'Failed to fetch the element enums.',
  );

  fetchConditionEnums();
  fetchElemEnums();

  return (
    <>
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
        elementEnums={elemEnums.data}
      />
      <hr/>
      <div className="text-right">
        <Button variant="outline-primary" onClick={() => setCollapsed(!collapsed)} className="mr-2">
          {t((t) => t.game.skillAtk.collapse)}
        </Button>
        <Button variant="outline-info" onClick={onSearchRequested(inputData)}>
          {t((t) => t.misc.search)}
        </Button>
      </div>
      <hr/>
      <InputParameters
        collapsed={collapsed}
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
      />
    </>
  );
};
