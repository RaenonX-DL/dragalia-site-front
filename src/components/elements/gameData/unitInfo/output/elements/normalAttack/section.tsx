import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {useI18n} from '../../../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../../common/fetch';
import {Loading} from '../../../../../common/loading';
import styles from '../main.module.css';
import {SectionTitle} from '../title';
import {NormalAttackChainTab} from './chainTab';


type Props = {
  unitId: number,
}

export const NormalAttackSection = ({unitId}: Props) => {
  const {t, lang} = useI18n();
  const {fetchStatus: chain, fetchFunction: fetchChain} = useFetchState(
    [],
    () => ResourceLoader.getNormalAttackChain(unitId),
    `Failed to fetch normal attack combo chain data for unit ID ${unitId}`,
  );

  fetchChain();

  return (
    <div className={styles.normalAttack}>
      <SectionTitle>{t((t) => t.game.unitInfo.title.normalAttack)}</SectionTitle>
      {
        !chain.data.length ?
          <Loading/> :
          <Tabs defaultActiveKey={0}>
            {
              chain.data.map((chain, idx) => (
                <Tab eventKey={idx} title={chain.chainName[lang]} key={idx}>
                  <div className="mt-1"/>
                  <NormalAttackChainTab chain={chain}/>
                </Tab>
              ))
            }
          </Tabs>
      }
    </div>
  );
};
