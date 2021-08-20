import React from 'react';

import {Property} from 'csstype';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';
import styles from './main.module.css';


type Props<E> = {
  results: Array<E>,
  renderEntry: (entry: E) => React.ReactNode,
  height?: Property.Height,
}

export const SearchResults = <E, >({results, renderEntry, height}: Props<E>) => {
  const {t} = useI18n();

  if (!results.length) {
    return (
      <Row noGutters className="mt-2 text-center text-danger">
        <Col>
          {t((t) => t.autoComplete.noMatchingOptions)}
        </Col>
      </Row>
    );
  }

  return (
    <div className={styles.searchResult} style={{height}}>
      {results.map((entry, idx) => (
        <React.Fragment key={idx}>{renderEntry(entry)}</React.Fragment>
      ))}
    </div>
  );
};
