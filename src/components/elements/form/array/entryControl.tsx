import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import {swapItem} from '../../../../utils/array';
import {IconDelete, IconMoveDown, IconMoveUp} from '../../common/icons';
import {ArrayFormBaseProps} from './base';


type Props<P, E> = ArrayFormBaseProps<P, E> & {
  elemIdx: number,
  array: Array<E>,
};

export const ArrayFormEntryControl = <P, E>({
  minLength,
  setArray,
  counterState,
  elemIdx,
  array,
  showMoveButton = true,
  vertical = false,
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
    <ButtonGroup size="sm" vertical={vertical}>
      {
        showMoveButton &&
        <>
          <Button
            variant="outline-warning"
            onClick={onMoveUp(elemIdx)}
            disabled={elemIdx === 0}
          >
            <IconMoveUp/>
          </Button>
          <Button
            variant="outline-warning"
            onClick={onMoveDown(elemIdx)}
            disabled={array.length - 1 === elemIdx}
          >
            <IconMoveDown/>
          </Button>
        </>
      }
      <Button
        variant="outline-danger"
        onClick={onRemoved(elemIdx)}
        disabled={array.length <= minLength}
      >
        <IconDelete/>
      </Button>
    </ButtonGroup>
  );
};
