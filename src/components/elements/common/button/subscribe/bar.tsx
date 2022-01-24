import React from 'react';

import Col from 'react-bootstrap/Col';

import {RowRegular} from '../../grid/row';
import {SubscribeButton, SubscribeButtonProps} from './main';


type Props = SubscribeButtonProps;

export const SubscriptionButtonBar = (props: Props) => {
  return (
    <RowRegular className="text-end mb-3">
      <Col>
        <SubscribeButton
          {...props}
          asIcon={false}
        />
      </Col>
    </RowRegular>
  );
};
