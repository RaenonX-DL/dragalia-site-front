import React from 'react';


import {EnumEntry, UnitInfoData} from '../../../../../api-def/resources';
import {AppReactContext} from '../../../../../context/app/main';
import {scrollRefToTop} from '../../../../../utils/scroll';
import {useUnitData, useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {CheckOption} from '../../../common/check/types';
import {SlicedEntryBar} from '../../../common/entryBar';
import {UnitFilter, UnitFilterProps} from '../filter/main';
import {UnitFilterInputData} from '../filter/types';
import {getFilteredUnitInfo} from '../filter/utils';
import {UnitSearchOutputProps} from './types';


type Props<
  S extends string,
  D extends UnitFilterInputData<S>,
  E,
  E2 extends EnumEntry,
  V
> = Pick<UnitFilterProps<S, D, E, E2, V>, 'sortOrderNames' | 'generateInputData' | 'getAdditionalInputs'> & {
  getSortedUnitInfo: (unitInfo: Array<UnitInfoData>, inputData: D) => Array<UnitInfoData>,
  renderIfAdmin?: React.ReactNode,
  renderOutput: (props: UnitSearchOutputProps<S, D>) => React.ReactNode,
  renderCount: number,
  onSearchRequested?: (inputData: D) => void,
  isUnitPrioritized: (unitInfo: UnitInfoData) => boolean,
  isLoading: boolean,
};

export const UnitSearcher = <
  S extends string,
  D extends UnitFilterInputData<S>,
  E extends CheckOption,
  E2 extends EnumEntry,
  V,
>({
  sortOrderNames,
  generateInputData,
  getAdditionalInputs,
  getSortedUnitInfo,
  renderIfAdmin,
  renderOutput,
  renderCount,
  onSearchRequested,
  isUnitPrioritized,
  isLoading,
}: Props<S, D, E, E2, V>) => {
  const {charaInfo, dragonInfo, isFetched} = useUnitInfo();
  const {nameRef} = useUnitData();

  const context = React.useContext(AppReactContext);
  const elemRef = React.useRef<HTMLDivElement>(null);
  const [inputData, setInputData] = React.useState<D>();
  const [resultCount, setResultCount] = React.useState(renderCount); // < 0 = don't limit

  let unitInfoProcessed = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, nameRef);

  let prioritizedUnitInfo = unitInfoProcessed.filter((info) => isUnitPrioritized(info));
  const otherUnitInfo = unitInfoProcessed.filter((info) => !isUnitPrioritized(info));
  if (inputData) {
    prioritizedUnitInfo = getSortedUnitInfo(prioritizedUnitInfo, inputData);
  }

  unitInfoProcessed = [...prioritizedUnitInfo, ...otherUnitInfo];

  const isSliced = resultCount > 0 && unitInfoProcessed.length > resultCount;
  if (isSliced) {
    unitInfoProcessed = unitInfoProcessed.slice(0, resultCount);
  }

  // Scroll after input data has changed
  React.useEffect(() => {
    scrollRefToTop(elemRef);
    // Reset result count to display
    setResultCount(renderCount);
  }, [inputData]);

  return (
    <>
      <UnitFilter
        onSearchRequested={(inputData) => () => {
          if (onSearchRequested) {
            onSearchRequested(inputData);
          }
          setInputData(inputData);
        }}
        sortOrderNames={sortOrderNames}
        generateInputData={generateInputData}
        getAdditionalInputs={getAdditionalInputs}
        disabled={!isFetched || isLoading}
      />
      {context?.session?.user.isAdmin && renderIfAdmin}
      <hr/>
      <div ref={elemRef}>
        {inputData && renderOutput({
          inputData,
          prioritizedUnitInfo: unitInfoProcessed.filter((info) => isUnitPrioritized(info)),
          otherUnitInfo: unitInfoProcessed.filter((info) => !isUnitPrioritized(info)),
        })}
      </div>
      {
        isSliced &&
        <SlicedEntryBar
          resultCount={resultCount}
          setResultCount={setResultCount}
          renderCount={renderCount}
          maxCount={prioritizedUnitInfo.length + otherUnitInfo.length}
        />
      }
    </>
  );
};
