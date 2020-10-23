import React from 'react';

import {Tips} from '../elements/tips';
import {Video} from '../elements/video';
import {Builds} from '../elements/builds';
import {Rotations} from '../elements/rotations';

export const Quest = ({match}: { match: { params: object } }) => {
  return (
    <>
      <h2>Quest {match.params['qid']}</h2>
      <Tips/>
      <Video/>
      <Builds/>
      <Rotations/>
    </>
  );
};
