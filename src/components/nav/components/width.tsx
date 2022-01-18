import React from 'react';

import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';

import {useI18n} from '../../../i18n/hook';
import {layoutDispatchers} from '../../../state/layout/dispatchers';
import {useLayoutSelector} from '../../../state/layout/selector';
import {LayoutDispatcherName} from '../../../state/layout/types';
import {useLayout} from '../../hooks/layout/main';
import {NavDropdownMenu} from '../elements/dropdown';


export const NavWidthConfig = () => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const {width} = useLayoutSelector();
  const {isLandscape} = useLayout();

  if (!isLandscape) {
    return <></>;
  }

  return (
    <NavDropdownMenu
      type="dropdown"
      renderTitle={({open, setOpen}) => (
        <Button variant="dark-orange" onClick={() => setOpen(!open)}>
          {t((t) => t.nav.layout.config)}
        </Button>
      )}
      entries={[
        {type: 'header', text: (t) => t.nav.layout.current.width},
        {type: 'text', text: (t) =>t.nav.layout.width[width]},
        {type: 'divider'},
        {
          type: 'path',
          text: (t) => t.nav.layout.width.full,
          onClick: () => dispatch(layoutDispatchers[LayoutDispatcherName.CHANGE_WIDTH]('full')),
          activeOverride: width === 'full',
        },
        {
          type: 'path',
          text: (t) => t.nav.layout.width.wide,
          onClick: () => dispatch(layoutDispatchers[LayoutDispatcherName.CHANGE_WIDTH]('wide')),
          activeOverride: width === 'wide',
        },
        {
          type: 'path',
          text: (t) => t.nav.layout.width.mid,
          onClick: () => dispatch(layoutDispatchers[LayoutDispatcherName.CHANGE_WIDTH]('mid')),
          activeOverride: width === 'mid',
        },
      ]}
    />
  );
};
