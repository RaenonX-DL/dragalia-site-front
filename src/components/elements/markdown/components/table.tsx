import React from 'react';

import {TableCellComponent, TableRowComponent} from 'react-markdown/src/ast-to-react';

import styles from '../main.module.css';
import {Text, TextChildren} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


let headers: Array<string>;
let idxCounter = 0;

const checkInTableHeaders = (node: MarkdownComponentProps['node']) => {
  const tableHead = node.children
    .find((child) => child.type === 'element' && child.tagName === 'thead');
  if (!tableHead || tableHead.type !== 'element') {
    return;
  }

  const tableHeaderRow = tableHead.children
    .find((child) => child.type === 'element' && child.tagName === 'tr');
  if (!tableHeaderRow || tableHeaderRow.type !== 'element') {
    return;
  }

  headers = tableHeaderRow.children
    .filter((child) => child.type === 'element' && child.tagName === 'th')
    .map((cell) => (cell as MarkdownComponentProps['node']).children[0].value as string);
};

export const renderTable = ({children, node}: MarkdownComponentProps) => {
  checkInTableHeaders(node);

  return <table>{children}</table>;
};

export const renderTableHeader = ({children}: MarkdownComponentProps) => (
  <th>
    <TextChildren>
      {children}
    </TextChildren>
  </th>
);

export const renderTableRow: TableRowComponent = ({children}) => {
  idxCounter = 0;

  return <tr>{children}</tr>;
};

export const renderTableCell: TableCellComponent = ({children}) => {
  return (
    <td>
      <span className={styles.responsiveHeader}>
        <Text>
          {headers[idxCounter++]}
        </Text>
      </span>
      <TextChildren>
        {children}
      </TextChildren>
    </td>
  );
};
