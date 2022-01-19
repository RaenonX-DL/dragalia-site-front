import React from 'react';

import Col from 'react-bootstrap/Col';

import {SubscribeButton} from '../../../../../elements/common/button/subscribe/main';
import {SubscribeButtonState} from '../../../../../elements/common/button/subscribe/type';
import {RowRegular} from '../../../../../elements/common/grid/row';


type Props = {
  state?: [SubscribeButtonState, (newState: SubscribeButtonState) => void],
  disabled: boolean,
};

export const UnitInfoLookupOutputBar = ({state, disabled}: Props) => {
  return (
    <RowRegular className="text-end mb-3">
      <Col>
        <SubscribeButton
          state={state}
          subscriptionKey={{type: 'const', name: 'ALL_ANALYSIS'}}
          disabled={disabled}
          asIcon={false}
        />
      </Col>
    </RowRegular>
  );
};
