import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {scrollRefToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {useFetchEnums} from './hooks';
import {AttackingSkillInput} from './in/main';
import {InputData} from './in/types';
import {getCalculatedEntries} from './in/utils/calculate';
import {generateInputData, overwriteInputData} from './in/utils/inputData';
import {AttackingSkillOutput} from './out/main';
import {AttackingSkillSorter} from './out/sorter/main';
import {CalculatedSkillEntry} from './out/types';


export const AttackingSkillLookup = () => {
  const [inputData, setInputData] = React.useState<InputData>(generateInputData());
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
    <Row>
      <Col lg={4} className="rounded bg-black-32 p-3 mb-3">
        <AttackingSkillInput
          inputData={inputData}
          setInputData={setInputData}
          isSearchAllowed={isAllFetched}
          onSearchRequested={(inputData: InputData) => {
            GoogleAnalytics.damageCalc('search', inputData);

            setCalculatedEntries(getCalculatedEntries(inputData, attackingSkillEntries, elementBonuses));
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
          calculatedEntries={calculatedEntries || []}
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
