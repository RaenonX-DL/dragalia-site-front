import React from 'react';

import {Table} from 'react-bootstrap';

import {PostEditNote} from '../../../../../api-def/api';
import {useTranslation} from '../../../../../i18n/utils';

type PostEditNotesProps = {
  editNotes: Array<PostEditNote>
}

export const PostEditNotes = ({editNotes}: PostEditNotesProps) => {
  const {t} = useTranslation();

  return (
    <Table striped bordered hover responsive="lg" variant="dark">
      <thead>
        <tr>
          <th className="text-center">{t('posts.manage.modify_time')}</th>
          <th className="text-center w-75">{t('posts.manage.modify_note')}</th>
        </tr>
      </thead>
      <tbody>
        {
          editNotes.map((editNote) => {
            return (
              <tr key={editNote.timestamp.toLocaleDateString()}>
                <td className="no-line-break text-center">{editNote.timestamp}</td>
                <td className="no-line-break">{editNote.note}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
