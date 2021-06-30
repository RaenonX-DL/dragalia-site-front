import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import {CategorizedConditionEnums, ElementEnums} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../common/fetch';
import {CommonModal, ModalState} from '../../../common/modal';
import {useAtkSkillInput} from '../hooks/preset';
import {Filter} from './filter';
import {DisplayItemPicker} from './limit';
import {InputParameters} from './params';
import {InputData} from './types';
import {validateInputData} from './utils/inputData';


type InputProps = {
  onSearchRequested: (inputData: InputData) => void,
  isAllFetched: boolean,
}

export const AttackingSkillInput = ({isAllFetched, onSearchRequested}: InputProps) => {
  const {t, lang} = useI18n();

  const [collapsed, setCollapsed] = React.useState(true);
  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });
  const {inputData, setInputData, getPresetStatus} = useAtkSkillInput();
  const isSearchAllowed = isAllFetched && getPresetStatus.fetched;

  const {fetchStatus: conditionEnums, fetchFunction: fetchConditionEnums} = useFetchState<CategorizedConditionEnums>(
    {afflictions: [], elements: []},
    ResourceLoader.getEnumCategorizedConditions,
    'Failed to fetch the condition enums.',
  );
  const {fetchStatus: elemEnums, fetchFunction: fetchElemEnums} = useFetchState<ElementEnums>(
    {elemental: []},
    ResourceLoader.getEnumElements,
    'Failed to fetch the element enums.',
  );

  fetchConditionEnums();
  fetchElemEnums();

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <Filter
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
        elementEnums={elemEnums.data}
      />
      <hr/>
      <DisplayItemPicker inputData={inputData} setInputData={setInputData}/>
      <hr/>
      <div className="text-right">
        <Button variant="outline-primary" onClick={() => setCollapsed(!collapsed)} className="mr-2">
          {t((t) => t.game.skillAtk.collapse)}
        </Button>
        <Button variant="outline-info" disabled={!isSearchAllowed} onClick={() => {
          const isInputValid = validateInputData(
            inputData,
            lang,
            (message) => setModalState({...modalState, show: true, message}),
          );

          if (!isInputValid) {
            return;
          }

          onSearchRequested(inputData);
        }}>
          {!isSearchAllowed && <Spinner animation="grow" size="sm" as="span" className="mr-1"/>}
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
