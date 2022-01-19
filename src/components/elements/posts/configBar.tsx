import React from 'react';

import Col from 'react-bootstrap/Col';

import {SubscribeButton, SubscribeButtonProps} from '../common/button/subscribe/main';
import {RowNoGutter} from '../common/grid/row';


type Props = SubscribeButtonProps;

export const PostConfigBar = (props: Props) => {
  return (
    <RowNoGutter className="text-end mb-2">
      <Col>
        <SubscribeButton
          {...props}
          asIcon={false}
        />
      </Col>
    </RowNoGutter>
  );
};
