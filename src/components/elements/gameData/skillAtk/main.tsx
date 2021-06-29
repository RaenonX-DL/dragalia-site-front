import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ElementBonusData} from '../../../../api-def/resources';
import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {useFetchEnums, UseFetchEnumsReturn} from './hooks';
import {AttackingSkillInput} from './in/main';
import {InputData} from './in/types';
import {generateInputData, overwriteInputData} from './in/utils/inputData';
import {AttackingSkillOutput} from './out/main';
import {AttackingSkillSorter} from './out/sorter/main';
import {CalculatedSkillEntry} from './out/types';
import {calculateEntries, filterSkillEntries} from './out/utils';


const getCalculatedEntries = (
  inputData: InputData,
  atkSkillEntries: UseFetchEnumsReturn['attackingSkillEntries'],
  elementBonusData: ElementBonusData,
): Array<CalculatedSkillEntry> => (
  calculateEntries(
    filterSkillEntries(inputData, atkSkillEntries),
    inputData,
    elementBonusData,
  )
);

export const AttackingSkillLookup = () => {
  const [inputData, setInputData] = React.useState<InputData>(generateInputData());
  const [atkSkillOutput, setAtkSkillOutput] = React.useState<Array<CalculatedSkillEntry> | undefined>();

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
    if (!atkSkillOutput) {
      return;
    }
    scrollRefToTop(entryCol);
  }, [atkSkillOutput]);

  return (
    <Row>
      <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
        <AttackingSkillInput
          inputData={inputData}
          setInputData={setInputData}
          isAllFetched={isAllFetched}
          onSearchRequested={(inputData: InputData) => {
            GoogleAnalytics.damageCalc('search', inputData);

            setAtkSkillOutput(getCalculatedEntries(inputData, attackingSkillEntries, elementBonuses));
          }}
        />
      </Col>
      <Col ref={entryCol} lg={8} className="px-0 px-lg-3">
        <Row className="text-right mb-2">
          <Col>
            <AttackingSkillSorter
              inputData={inputData}
              onOrderPicked={(sortBy) => setInputData(overwriteInputData(inputData, {sortBy}))}
            />
          </Col>
        </Row>
        <AttackingSkillOutput
          displayConfig={inputData.display}
          calculatedEntries={atkSkillOutput || []}
          conditionEnumMap={conditionEnumMap}
          skillIdentifierInfo={skillIdentifierInfo}
          atkSkillEntries={attackingSkillEntries}
          skillEnums={skillEnums}
          statusEnums={statusEnums}
        />
      </Col>
    </Row>
  );
};
