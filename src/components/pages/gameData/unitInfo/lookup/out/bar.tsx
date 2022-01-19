import React from 'react';

import Col from 'react-bootstrap/Col';

import {SubscribeButton} from '../../../../../elements/common/button/subscribe/main';
import {RowRegular} from '../../../../../elements/common/grid/row';


type Props = {
  subscribed: boolean,
};

export const UnitInfoLookupOutputBar = ({subscribed}: Props) => {
  return (
    <RowRegular className="text-end mb-3">
      <Col>
        <SubscribeButton
          defaultSubscribed={subscribed}
          subscriptionKey={{type: 'const', name: 'ALL_ANALYSIS'}}
          asIcon={false}
        />
      </Col>
    </RowRegular>
  );
};
