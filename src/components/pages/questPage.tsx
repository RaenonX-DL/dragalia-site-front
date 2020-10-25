import {useParams} from 'react-router-dom';
import React from 'react';

export const QuestPage = () => {
  const {qid} = useParams();

  return (
    <>
      <h2>Quest {qid}</h2>
      {/* FIXME: Quest page content render */}
      {/* FIXME: Track element expansion action (builds, rotations, etc.) */}
    </>
  );
};
