import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {BadgeEntry} from './types';


type Props = {
  entry: BadgeEntry,
};

export const BsBadge = ({entry}: Props) => {
  return (
    <Badge bg={entry.variant}>
      {entry.content}
    </Badge>
  );
};
