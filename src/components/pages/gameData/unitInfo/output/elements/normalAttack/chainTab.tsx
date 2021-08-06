import React from 'react';

import {NormalAttackChain} from '../../../../../../../api-def/resources';
import {NormalAttackBranchedTab} from './branchedTab';


export type ChainTabProps = {
  chain: NormalAttackChain,
}

export const NormalAttackChainTab = ({chain}: ChainTabProps) => {
  return (
    <>
      {
        chain.chain.map((branchedChain, idx) => (
          <NormalAttackBranchedTab branchedChain={branchedChain} key={idx}/>
        ))
      }
    </>
  );
};
