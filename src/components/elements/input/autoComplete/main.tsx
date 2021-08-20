import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';
import {ArrayFormBase, ArrayFormProps} from '../../form/array/base';
import {Search} from '../search/main';
import {IconSelectable, IconSelected} from './icons';
import styles from './main.module.css';


type Props<P, E, O> = Omit<ArrayFormProps<P, E>, 'counterState'> & {
  options: Array<O>,
  getText: (option: O) => string,
  getValue: (option: O) => E,
  isOptionSelected: (option: O) => boolean,
  isOptionMatchSearch?: (option: O, searchText: string) => boolean,
  renderOption?: (option: O) => React.ReactNode,
}

export const AutoComplete = <P, E, O>({
  options,
  getText,
  getValue,
  isOptionSelected,
  isOptionMatchSearch,
  renderOption,
  payload,
  minLength,
  getArray,
  setArray,
  renderEntries,
}: Props<P, E, O>) => {
  const {t} = useI18n();

  const counterState = React.useState([...Array(getArray(payload).length).keys()]);
  const [counter, setCounter] = counterState;

  return (
    <>
      <Search
        options={options}
        isOptionMatchSearch={(option, searchText) => (
          isOptionMatchSearch ?
            isOptionMatchSearch(option, searchText) :
            getText(option).toLowerCase().includes(searchText)
        )}
        renderMatchedSelection={(option) => {
          const optionText = getText(option);
          const isSelected = isOptionSelected(option);

          return (
            <Row
              noGutters key={optionText}
              className={isSelected ? styles.optionSelected : styles.optionSelectable}
              onClick={() => {
                if (isSelected) {
                  return;
                }

                setArray([...getArray(payload), getValue(option)]);
                setCounter([...counter, counter.length ? counter[counter.length - 1] + 1 : 0]);
              }}
            >
              <Col>
                {renderOption ? renderOption(option) : optionText}
              </Col>
              <Col xs="auto" className={styles.optionIcon}>
                {isSelected ? <IconSelected/> : <IconSelectable/>}
              </Col>
            </Row>
          );
        }}
      />
      <div className="mb-1">
        <small className="text-light-gray">{t((t) => t.autoComplete.selected)}</small>
      </div>
      <div className={styles.selected}>
        {
          getArray(payload).length ?
            <ArrayFormBase
              payload={payload}
              minLength={minLength}
              getArray={getArray}
              setArray={setArray}
              renderEntries={renderEntries}
              counterState={counterState}
            /> :
            <div className="text-center text-danger">
              {t((t) => t.autoComplete.noneSelected)}
            </div>
        }
      </div>
    </>
  );
};
