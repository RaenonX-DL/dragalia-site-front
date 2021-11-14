import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {IconDelete, IconMoveDown, IconMoveUp} from '../../common/icons';
import {ArrayFormProps} from './base';


type Props<P, E> = ArrayFormProps<P, E> & {
  elemIdx: number,
  array: Array<E>,
};

export const ArrayFormEntryControl = <P, E>({
  minLength,
  setArray,
  counterState,
  elemIdx,
  array,
}: Props<P, E>) => {
  const [counter, setCounter] = counterState;

  const onRemoved = (counterToRemove: number) => () => {
    const idxToRemove = counter.indexOf(counterToRemove);

    setArray(array.filter(
      (element, elemIdx) => elemIdx !== idxToRemove,
    ));
    setCounter(counter.filter((count) => count !== counterToRemove));
  };

  const onMoveUp = () => {
    console.log('move up');
  };

  const onMoveDown = () => {
    console.log('move down');
  };

  return (
    <ButtonGroup vertical size="sm">
      <Button
        className="float-right ml-2"
        variant="outline-danger"
        onClick={onRemoved(counter[elemIdx])}
        disabled={array.length <= minLength}
      >
        <IconDelete/>
      </Button>
      <Button
        className="float-right ml-2"
        variant="outline-warning"
        onClick={onMoveUp}
        disabled={elemIdx === 0}
      >
        <IconMoveUp/>
      </Button>
      <Button
        className="float-right ml-2"
        variant="outline-warning"
        onClick={onMoveDown}
        disabled={array.length - 1 === elemIdx}
      >
        <IconMoveDown/>
      </Button>
    </ButtonGroup>
  );
};
