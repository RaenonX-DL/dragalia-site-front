import React from 'react';

import {Table} from 'react-bootstrap';

import {PostEditNote} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {TimeAgo} from '../../../../../utils/timeago';

type PostEditNotesProps = {
  editNotes: Array<PostEditNote>
}

export const PostEditNotes = ({editNotes}: PostEditNotesProps) => {
  const {t} = useI18n();

  return (
    <Table striped bordered hover responsive="lg" variant="dark">
      <thead>
        <tr>
          <th className="text-center">{t((t) => t.posts.manage.modifyTime)}</th>
          <th className="text-center w-75">{t((t) => t.posts.manage.modifyNote)}</th>
        </tr>
      </thead>
      <tbody>
        {
          editNotes.map((editNote) => {
            return (
              <tr key={editNote.timestampEpoch}>
                <td className="no-line-break text-center"><TimeAgo epoch={editNote.timestampEpoch}/></td>
                <td className="no-line-break">{editNote.note}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
