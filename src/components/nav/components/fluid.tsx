import React from 'react';

import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';

import {useI18n} from '../../../i18n/hook';
import {layoutDispatchers} from '../../../state/layout/dispatchers';
import {useLayoutSelector} from '../../../state/layout/selector';
import {useLayout} from '../../hooks/layout/main';
import {NavDropdownMenu} from '../elements/dropdown';


export const NavFluidConfig = () => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const {fluid} = useLayoutSelector();
  const {allowFluidContainer} = useLayout();

  if (!allowFluidContainer) {
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
        {type: 'header', text: (t) => t.nav.layout.current.fluid},
        {type: 'text', text: (t) => fluid ? t.nav.layout.fluid.enabled : t.nav.layout.fluid.disabled},
        {type: 'divider'},
        {
          type: 'path',
          text: (t) => t.nav.layout.fluid.enable,
          onClick: () => dispatch(layoutDispatchers.changeFluid(true)),
          activeOverride: fluid,
        },
        {
          type: 'path',
          text: (t) => t.nav.layout.fluid.disable,
          onClick: () => dispatch(layoutDispatchers.changeFluid(false)),
          activeOverride: !fluid,
        },
      ]}
    />
  );
};
