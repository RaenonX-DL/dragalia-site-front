import React from 'react';

import {Property} from 'csstype';
import Col from 'react-bootstrap/Col';

import {useI18n} from '../../../../i18n/hook';
import {RowNoGutter} from '../../common/grid/row';
import styles from './main.module.css';


type Props<E> = {
  results: Array<E>,
  renderEntry: (entry: E) => React.ReactNode,
  height?: Property.Height,
};

export const SearchResults = <E, >({results, renderEntry, height}: Props<E>) => {
  const {t} = useI18n();

  return (
    <div className={styles['search-result']} style={{height}}>
      {
        results.length > 0 ?
          results.map((entry, idx) => (
            <React.Fragment key={idx}>{renderEntry(entry)}</React.Fragment>
          )) :
          <RowNoGutter className="mt-2 text-center text-danger">
            <Col>
              {t((t) => t.autoComplete.noMatchingOptions)}
            </Col>
          </RowNoGutter>
      }
    </div>
  );
};
