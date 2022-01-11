import React from 'react';

import {PyLocale, UpdatedIndexTask} from '../../../../../api-def/resources';
import {useNextRouter} from '../../../../../utils/router';
import {AdsPageTop, AdsToolBottom} from '../../../../elements/common/ads/main';
import {Loading} from '../../../../elements/common/loading';
import {CollapsibleSectionedContent} from '../../../../elements/posts/output/section';
import {useDatamineDetail} from '../fetch/detail';
import {DatamineTaskResultView} from './task';


export const DatamineDetail = () => {
  const {query} = useNextRouter();

  const versionCode = query.id as string;

  const {datamineDetail} = useDatamineDetail(versionCode);

  if (!datamineDetail) {
    return <Loading/>;
  }

  const tasks = Object.entries(datamineDetail)
    .map<[PyLocale, UpdatedIndexTask][]>(([locale, tasks]) => tasks.map((task) => [locale as PyLocale, task]))
    .flat<[PyLocale, UpdatedIndexTask][][]>();

  return (
    <>
      <AdsPageTop/>
      <CollapsibleSectionedContent
        sections={tasks}
        getTitle={([locale, task]) => `${locale.toUpperCase()} - ${task.name}`}
        renderSection={([_, task]) => <DatamineTaskResultView task={task}/>}
      />
      <AdsToolBottom/>
    </>
  );
};
