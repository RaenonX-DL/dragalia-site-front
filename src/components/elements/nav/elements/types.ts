import {GeneralPath} from '../../../../const/path/definitions';

export type NavProps = {
  path: GeneralPath,
  text: string,
}

export type NavDropdownEntry = {
  type: 'header',
  text: string,
} | {
  type: 'item',
  path: GeneralPath,
  text: string,
} | {
  type: 'divider',
}
