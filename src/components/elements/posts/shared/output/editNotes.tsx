import React from 'react';

import Table from 'react-bootstrap/Table';

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
          <th className="text-center w-75">{t((t) => t.posts.manage.editNote)}</th>
        </tr>
      </thead>
      <tbody>
        {
          editNotes.map((editNote) => {
            return (
              <tr key={editNote.timestampEpoch}>
                <td className="text-center"><TimeAgo epoch={editNote.timestampEpoch}/></td>
                <td>{editNote.note}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
