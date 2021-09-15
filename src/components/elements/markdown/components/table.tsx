import React from 'react';

import {TableCellComponent, TableRowComponent} from 'react-markdown/src/ast-to-react';

import styles from '../main.module.css';
import {TextChildren} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


const headers: Array<Array<React.ReactNode>> = [] as Array<Array<React.ReactNode>>;
let idxCounter = 0;

export const renderTable = ({children}: MarkdownComponentProps) => (
  <table>{children}</table>
);

export const renderTableHeader = ({children}: MarkdownComponentProps) => {
  headers.push(children);

  return (
    <th>
      <TextChildren>
        {children}
      </TextChildren>
    </th>
  );
};

export const renderTableRow: TableRowComponent = ({children}) => {
  idxCounter = 0;

  return <tr>{children}</tr>;
};

export const renderTableCell: TableCellComponent = ({children}) => {
  return (
    <td>
      <span className={styles.responsiveHeader}>
        {headers[idxCounter++]}
      </span>
      <TextChildren>
        {children}
      </TextChildren>
    </td>
  );
};
