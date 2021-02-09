import React from 'react';
import {Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {PostModifyNote} from '../../../utils/services/api';

type PostModificationNotesProps = {
  modifyNote: Array<PostModifyNote>
}

export const PostModificationNotes = ({modifyNote}: PostModificationNotesProps) => {
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
          modifyNote.map((modNote) => {
            return (
              <tr key={modNote.timestamp.toLocaleDateString()}>
                <td className="no-line-break text-center">{modNote.timestamp}</td>
                <td className="no-line-break">{modNote.note}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
