import React, {Dispatch, SetStateAction} from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ArrayFormEntryControl} from './entryControl';
import {ArrayFormCommonProps} from './type';


export type ArrayFormBaseProps<P, E> = ArrayFormCommonProps<P, E> & {
  renderEntries: (element: E, idx: number) => React.ReactElement,
  counterState: [Array<number>, Dispatch<SetStateAction<Array<number>>>],
  reversed?: boolean,
};

export const ArrayFormBase = <P, E>(props: ArrayFormBaseProps<P, E>) => {
  let {
    payload,
    getArray,
    renderEntries,
    counterState,
    reversed = false,
    elemCount,
  } = props;

  const array = getArray(payload);

  // Can't use element index for render because the components are cached after removal.
  // - For example, if `renderEntries()` renders a `<textarea>`,
  //   removing the first entry only removes the underlying 1st data.
  //   The original text for the 1st data is still rendered.
  // No related tests implemented because the caching behavior doesn't seem existed in JSDOM
  if (!counterState) {
    const initialCounter = [...Array(array.length).keys()];
    if (reversed) {
      initialCounter.reverse();
    }

    counterState = React.useState(initialCounter);
  }

  const [counter] = counterState;

  return (
    <>
      {array.slice(0, (elemCount && elemCount > 0) ? elemCount : array.length).map((elem, elemIdx) => (
        <React.Fragment key={counter[elemIdx]}>
          <Row noGutters className={elemIdx === 0 ? '' : 'mt-2'}>
            <Col>
              {renderEntries(elem, elemIdx)}
            </Col>
            <Col xs="auto">
              <ArrayFormEntryControl array={array} elemIdx={elemIdx} {...props}/>
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </>
  );
};
