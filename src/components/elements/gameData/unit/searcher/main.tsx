import React from 'react';


import {EnumEntry} from '../../../../../api-def/resources';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {scrollRefToTop} from '../../../../../utils/scroll';
import {useUnitData, useUnitInfo} from '../../../../../utils/services/resources/unitInfo/hooks';
import {ButtonBar} from '../../../common/buttonBar';
import {CheckOption} from '../../../common/check/types';
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
  renderIfAdmin?: React.ReactNode,
  renderOutput: (props: UnitSearchOutputProps<S, D>) => React.ReactNode,
  renderCount: number,
  onSearchRequested?: (inputData: D) => void,
}

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
  renderIfAdmin,
  renderOutput,
  onSearchRequested,
  renderCount,
}: Props<S, D, E, E2, V>) => {
  const {t} = useI18n();
  const {charaInfo, dragonInfo} = useUnitInfo();
  const {nameRef} = useUnitData();

  const context = React.useContext(AppReactContext);
  const elemRef = React.useRef<HTMLDivElement>(null);
  const [inputData, setInputData] = React.useState<D>();
  const [resultCount, setResultCount] = React.useState(renderCount); // < 0 = don't limit

  let processedUnitInfo = getFilteredUnitInfo(inputData, charaInfo, dragonInfo, nameRef);
  const toBeSliced = resultCount > 0 && processedUnitInfo.length > resultCount;
  if (toBeSliced) {
    processedUnitInfo = processedUnitInfo.slice(0, resultCount);
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
      />
      {context?.session?.user.isAdmin && renderIfAdmin}
      <hr/>
      <div ref={elemRef}>
        {inputData && renderOutput({inputData, processedUnitInfo})}
      </div>
      {
        toBeSliced &&
        <ButtonBar
          buttons={[
            {
              text: t((t) => t.misc.showMore),
              variant: 'outline-success',
              onClick: () => setResultCount(resultCount + renderCount),
            },
            {
              text: t((t) => t.misc.showAll),
              variant: 'outline-warning',
              onClick: () => setResultCount(-1),
            },
          ]}
        />
      }
    </>
  );
};
