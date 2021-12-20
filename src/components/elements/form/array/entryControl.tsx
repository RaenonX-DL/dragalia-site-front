import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {swapItem} from '../../../../utils/array';
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

  const onRemoved = (elemIdx: number) => () => {
    setArray(array.filter((element, idx) => idx !== elemIdx));
    setCounter(counter.filter((count) => count !== counter[elemIdx]));
  };

  const onMoveUp = (elemIdx: number) => () => {
    setArray(swapItem(array, elemIdx - 1, elemIdx));
    setCounter(swapItem(counter, elemIdx - 1, elemIdx));
  };

  const onMoveDown = (elemIdx: number) => () => {
    setArray(swapItem(array, elemIdx, elemIdx + 1));
    setCounter(swapItem(counter, elemIdx, elemIdx + 1));
  };

  return (
    <ButtonGroup vertical size="sm">
      <Button
        className="float-right ml-2 w-auto"
        variant="outline-danger"
        onClick={onRemoved(elemIdx)}
        disabled={array.length <= minLength}
      >
        <IconDelete/>
      </Button>
      <Button
        className="float-right ml-2 w-auto"
        variant="outline-warning"
        onClick={onMoveUp(elemIdx)}
        disabled={elemIdx === 0}
      >
        <IconMoveUp/>
      </Button>
      <Button
        className="float-right ml-2 w-auto"
        variant="outline-warning"
        onClick={onMoveDown(elemIdx)}
        disabled={array.length - 1 === elemIdx}
      >
        <IconMoveDown/>
      </Button>
    </ButtonGroup>
  );
};
