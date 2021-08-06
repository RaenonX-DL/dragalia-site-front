import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export type ArrayDataFormOnChangedHandler<E> = <K extends keyof E>(key: K) => (newValue: E[K]) => void;

type ArrayDataFormProps<P, E> = {
  payload: P,
  minLength: number,
  getArray: (payload: P) => Array<E>,
  setArray: (newArray: Array<E>) => void,
  getUpdatedElement: <K extends keyof E>(element: E, key: K, value: E[K]) => E,
  generateNewElement: () => E,
  renderEntries: (
    element: E,
    onChangeHandler: ArrayDataFormOnChangedHandler<E>,
    idx: number,
  ) => React.ReactElement,
}

export const ArrayDataForm = <P, E extends object>({
  payload,
  minLength,
  getArray,
  setArray,
  getUpdatedElement,
  generateNewElement,
  renderEntries,
}: ArrayDataFormProps<P, E>) => {
  // Can't use element index for render because the components are cached after removal.
  // - For example, if `renderEntries()` renders a `<textarea>`,
  //   removing the first entry only removes the underlying 1st data.
  //   The original text for the 1st data is still rendered.
  // No related tests implemented because the caching behavior doesn't seem existed in JSDOM
  const [counter, setCounter] = React.useState([...Array(getArray(payload).length).keys()]);

  const onChangeHandler = <K extends keyof E>(changedIdx: number) => (
    key: K,
  ) => (
    newValue: E[K],
  ) => {
    setArray(getArray(payload).map((elem, elemIdx) => {
      if (changedIdx !== elemIdx) {
        // Keep the data not to be changed intact
        return elem;
      }

      return getUpdatedElement(elem, key, newValue);
    }));
  };

  const onAdded = () => {
    setArray(getArray(payload).concat([generateNewElement()]));
    setCounter([...counter, counter[counter.length - 1] + 1]);
  };

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
      {
        array.map((elem, elemIdx) => (
          <React.Fragment key={counter[elemIdx]}>
            <Row noGutters className="mt-2">
              <Col>
                {renderEntries(elem, onChangeHandler(elemIdx), elemIdx)}
              </Col>
              <Col xs="auto">
                <Button
                  className="d-inline float-right ml-2"
                  variant="outline-danger"
                  onClick={onRemoved(counter[elemIdx])}
                  disabled={array.length <= minLength}
                >
                  <i className="bi bi-x-lg"/>
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        ))
      }
      <Row className="mt-2">
        <Col>
          <Button
            className="d-inline float-right"
            variant="outline-success"
            onClick={onAdded}
          >
            <i className="bi bi-plus-lg"/>
          </Button>
        </Col>
      </Row>
    </>
  );
};
