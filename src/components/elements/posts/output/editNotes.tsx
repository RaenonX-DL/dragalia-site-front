import React from 'react';

import {PostEditNote} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {TimeAgo} from '../../../../utils/timeago';


type PostEditNotesProps = {
  editNotes: Array<PostEditNote>
}

export const PostEditNotes = ({editNotes}: PostEditNotesProps) => {
  const {t} = useI18n();

  return (
    <>
      <h5>{t((t) => t.posts.manage.editNote)}</h5>
      <ul>
        {editNotes.map((editNote) => (
          <li key={editNote.timestampEpoch}>
            <TimeAgo epoch={editNote.timestampEpoch}/> - {editNote.note || <span className="text-muted">(N/A)</span>}
          </li>
        ))}
      </ul>
    </>
  );
};
