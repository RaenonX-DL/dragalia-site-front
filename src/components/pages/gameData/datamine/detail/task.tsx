import React from 'react';

import {UpdatedIndexTask} from '../../../../../api-def/resources';
import {DatamineSubtaskItem} from './subtask';


type Props = {
  task: UpdatedIndexTask,
};

export const DatamineTaskResultView = ({task}: Props) => {
  return (
    <>
      {task.subtasks.map((subtask, key) => (
        <React.Fragment key={key}>
          <h5>{subtask.name}</h5>
          {subtask.paths.map((path, idx) => (
            <div className="text-center mb-2" key={idx}>
              <DatamineSubtaskItem path={path}/>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
