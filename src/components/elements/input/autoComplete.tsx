import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import {ArrayFormBase, ArrayFormProps} from '../form/array/base';
import styles from './autoComplete.module.css';
import {IconSelectable, IconSelected} from './icons';


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

  const [searchText, setSearchText] = React.useState('');
  const counterState = React.useState([...Array(getArray(payload).length).keys()]);
  const [counter, setCounter] = counterState;

  let matchedOptions = options;

  if (!!searchText) {
    if (isOptionMatchSearch) {
      matchedOptions = options.filter((option) => isOptionMatchSearch(option, searchText));
    } else {
      // `toLowerCase()` is faster than `match()`
      const searchTextLower = searchText.toLowerCase();
      matchedOptions = options.filter((option) => getText(option).toLowerCase().includes(searchTextLower));
    }
  }

  return (
    <>
      <Form.Control
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t((t) => t.autoComplete.inputPlaceholder)}
      />
      <div className={styles.searchResult}>
        {
          matchedOptions.length ?
            matchedOptions.map((option) => {
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
            }) :
            <Row noGutters className="mt-2 text-center text-danger">
              <Col>
                {t((t) => t.autoComplete.noMatchingOptions)}
              </Col>
            </Row>
        }
      </div>
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
