import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {useAtkSkillResources} from '../../../hooks/atkSkillResources';
import {AttackingSkillInput} from './in/main';
import {InputData} from './in/types';
import {getCalculatedEntries} from './in/utils/calculate';
import {generateInputData} from './in/utils/inputData';
import {AttackingSkillOutput} from './out/main';
import {CalculatedSkillEntry} from './out/types';
import {AttackingSkillPreset} from './preset/main';
import {AttackingSkillSorter} from './sorter/main';


type State = {
  inputData: InputData,
  calculatedEntries?: Array<CalculatedSkillEntry>,
};

export const AttackingSkillLookup = () => {
  // Having this reduces state updates when changing input.
  // Frequent update in this component is not ideal because rendering output is expensive.
  const [inputDataForward, setInputDataForward] = React.useState<State>({
    inputData: generateInputData(),
  });

  const entryCol = React.useRef<HTMLDivElement>(null);

  const {
    elementBonuses,
    conditionEnumMap,
    skillIdentifierInfo,
    attackingSkillEntries,
    skillEnums,
    statusEnums,
    isAllFetched,
  } = useAtkSkillResources();

  React.useEffect(() => {
    if (!inputDataForward.calculatedEntries) {
      return;
    }
    scrollRefToTop(entryCol);
  }, [inputDataForward.calculatedEntries]);

  return (
    <>
      <Row>
        <Col lg={4} className="section p-3 mb-3">
          <AttackingSkillInput
            isAllFetched={isAllFetched}
            onSearchRequested={(inputData: InputData) => {
              GoogleAnalytics.damageCalc('search', inputData);

              setInputDataForward({
                inputData,
                calculatedEntries: getCalculatedEntries(inputData, attackingSkillEntries, elementBonuses),
              });
            }}
          />
        </Col>
        <Col ref={entryCol} lg={8} className="px-0 px-lg-3">
          <Row className="text-right mb-1">
            <Col>
              <AttackingSkillPreset
                inputData={inputDataForward.inputData}
                isEnabled={!!inputDataForward.calculatedEntries?.length}
              />
            </Col>
            <Col xs="auto">
              <AttackingSkillSorter
                inputData={inputDataForward.inputData}
                onOrderPicked={(newInputData) => {
                  setInputDataForward({
                    inputData: newInputData,
                    calculatedEntries: getCalculatedEntries(newInputData, attackingSkillEntries, elementBonuses),
                  });
                }}
              />
            </Col>
          </Row>
          <AttackingSkillOutput
            displayConfig={inputDataForward.inputData.display}
            calculatedEntries={inputDataForward.calculatedEntries || []}
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
