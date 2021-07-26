import React from 'react';

import {AutoFsChain} from '../../../../../../../api-def/resources';
import {AutoFsBranchedTab} from './branchedTab';


export type ChainTabProps = {
  chain: AutoFsChain,
}

export const AutoFsChainTab = ({chain}: ChainTabProps) => {
  return (
    <>
      {
        chain.chain.map((branchedChain, idx) => (
          <AutoFsBranchedTab branchedChain={branchedChain} key={idx}/>
        ))
      }
    </>
  );
};
