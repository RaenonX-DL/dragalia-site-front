import {Components} from 'react-markdown/src/ast-to-react';

import {renderLink} from './components/link';
import {renderListItem} from './components/listItem';
import {renderParagraph} from './components/paragraph';
import {renderTable, renderTableCell, renderTableRow} from './components/table';


// Key correspondences:
// https://github.com/remarkjs/react-markdown/blob/main/changelog.md#600---2021-04-15

export const components: Components = {
  // `href` is expected for `<a>` but it's `undefined` in type definitions
  // @ts-ignore
  a: renderLink,
  p: renderParagraph,
  table: renderTable,
  tr: renderTableRow,
  td: renderTableCell,
  li: renderListItem,
};
