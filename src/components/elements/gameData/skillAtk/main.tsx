import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {CommonModal, ModalState} from '../../common/modal';
import {useFetchEnums} from './hooks/enums';
import {AttackingSkillInput} from './in/main';
import {InputData} from './in/types';
import {getCalculatedEntries} from './in/utils/calculate';
import {generateInputData} from './in/utils/inputData';
import {AttackingSkillOutput} from './out/main';
import {CalculatedSkillEntry} from './out/types';
import {AttackingSkillPreset} from './preset/main';
import {AttackingSkillSorter} from './sorter/main';


export const AttackingSkillLookup = () => {
  // Having this reduces state updates when changing input.
  // Frequent update in this component is not ideal because rendering output is expensive.
  const [inputDataForward, setInputDataForward] = React.useState(generateInputData());
  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });
  const [calculatedEntries, setCalculatedEntries] = React.useState<Array<CalculatedSkillEntry> | undefined>();

  const entryCol = React.useRef<HTMLDivElement>(null);

  const {
    elementBonuses,
    conditionEnumMap,
    skillIdentifierInfo,
    attackingSkillEntries,
    skillEnums,
    statusEnums,
    isAllFetched,
  } = useFetchEnums();

  React.useEffect(() => {
    if (!calculatedEntries) {
      return;
    }
    scrollRefToTop(entryCol);
  }, [calculatedEntries]);

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <Row>
        <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
          <AttackingSkillInput
            isAllFetched={isAllFetched}
            onSearchRequested={(inputData: InputData) => {
              GoogleAnalytics.damageCalc('search', inputData);

              setCalculatedEntries(getCalculatedEntries(inputData, attackingSkillEntries, elementBonuses));
              setInputDataForward(inputData);
            }}
          />
        </Col>
        <Col ref={entryCol} lg={8} className="px-0 px-lg-3">
          <Form.Row className="text-right mb-1">
            <Col>
              <AttackingSkillPreset isEnabled={!!calculatedEntries?.length}/>
            </Col>
            <Col xs="auto">
              <AttackingSkillSorter
                onOrderPicked={(newInputData) => {
                  setCalculatedEntries(getCalculatedEntries(newInputData, attackingSkillEntries, elementBonuses));
                }}
              />
            </Col>
          </Form.Row>
          <AttackingSkillOutput
            displayConfig={inputDataForward.display}
            calculatedEntries={calculatedEntries || []}
            conditionEnumMap={conditionEnumMap}
            skillIdentifierInfo={skillIdentifierInfo}
            skillEnums={skillEnums}
            statusEnums={statusEnums}
          />
        </Col>
      </Row>
    </>
  );
};
