import React from 'react';

import {DepotPaths} from '../../../../../api-def/resources';
import {Image} from '../../../../elements/common/image';
import {ExternalLink} from '../../../../elements/common/link/external';


type Props = {
  path: string,
};

export const DatamineSubtaskItem = ({path}: Props) => {
  const url = DepotPaths.getURLofUpdatedFile(path);

  if (path.endsWith('.png')) {
    return <Image src={url} text={url} style={{maxWidth: '15rem'}}/>;
  }

  return <ExternalLink newWindow href={url}>{url}</ExternalLink>;
};
