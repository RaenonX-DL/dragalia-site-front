import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {AutoFsData} from '../../../../../../../api-def/resources';
import {useI18n} from '../../../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../../../elements/common/fetch';
import {Loading} from '../../../../../../elements/common/loading';
import styles from '../main.module.css';
import {SectionTitle} from '../title';
import {AutoFsChainTab} from './chainTab';


type Props = {
  unitId: number,
}

export const AutoFsSection = ({unitId}: Props) => {
  const {t, lang} = useI18n();
  const {fetchStatus: chain, fetchFunction: fetchChain} = useFetchState<undefined | AutoFsData>(
    undefined,
    () => ResourceLoader.getAutoFsChain(unitId),
    `Failed to fetch normal attack combo chain data for unit ID ${unitId}`,
  );

  fetchChain();

  if (!chain.data) {
    return <Loading/>;
  }

  return (
    <div className={styles.autoFs}>
      <SectionTitle>{t((t) => t.game.unitInfo.title.normalAttack)}</SectionTitle>
      {
        <Tabs defaultActiveKey={0}>
          {
            chain.data.auto.map((chain, idx) => (
              <Tab eventKey={idx} title={chain.chainName[lang]} key={idx}>
                <div className="mt-1"/>
                <AutoFsChainTab chain={chain}/>
              </Tab>
            ))
          }
        </Tabs>
      }
      <SectionTitle>{t((t) => t.game.unitInfo.title.fs)}</SectionTitle>
      {
        <Tabs defaultActiveKey={0}>
          {
            chain.data.fs.map((chain, idx) => (
              <Tab eventKey={idx} title={chain.chainName[lang]} key={idx}>
                <div className="mt-1"/>
                <AutoFsChainTab chain={chain}/>
              </Tab>
            ))
          }
        </Tabs>
      }
    </div>
  );
};
