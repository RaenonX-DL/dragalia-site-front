import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {IconDelete} from '../../common/icons';


type Props<P, E> = {
  payload: P,
  minLength: number,
  getArray: (payload: P) => Array<E>,
  setArray: (newArray: Array<E>) => void,
  renderEntries: (element: E, idx: number) => React.ReactElement,
  reversed?: boolean,
}

export const ArrayFormRemoveOnly = <P, E extends object>({
  payload,
  minLength,
  getArray,
  setArray,
  renderEntries,
  reversed = false,
}: Props<P, E>) => {
  // Can't use element index for render because the components are cached after removal.
  // - For example, if `renderEntries()` renders a `<textarea>`,
  //   removing the first entry only removes the underlying 1st data.
  //   The original text for the 1st data is still rendered.
  // No related tests implemented because the caching behavior doesn't seem existed in JSDOM
  const initialCounter = [...Array(getArray(payload).length).keys()];
  if (reversed) {
    initialCounter.reverse();
  }

  const [counter, setCounter] = React.useState(initialCounter);

  const onRemoved = (counterToRemove: number) => () => {
    const idxToRemove = counter.indexOf(counterToRemove);

    setArray(getArray(payload).filter(
      (element, elemIdx) => elemIdx !== idxToRemove,
    ));
    setCounter(counter.filter((count) => count !== counterToRemove));
  };

  const array = getArray(payload);

  return (
    <>
      {array.map((elem, elemIdx) => (
        <React.Fragment key={counter[elemIdx]}>
          <Row noGutters className="mt-2">
            <Col>
              {renderEntries(elem, elemIdx)}
            </Col>
            <Col xs="auto">
              <Button
                className="d-inline float-right ml-2"
                variant="outline-danger"
                onClick={onRemoved(counter[elemIdx])}
                disabled={array.length <= minLength}
              >
                <IconDelete/>
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </>
  );
};
