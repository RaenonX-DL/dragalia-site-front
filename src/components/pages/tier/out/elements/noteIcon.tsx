import React from 'react';

import {TierNote} from '../../../../../api-def/api';
import {IconNotes} from '../../../../elements/common/icons';
import {ModalFixedContent} from '../../../../elements/common/modal/fix';
import {ModalStateFix} from '../../../../elements/common/modal/types';
import {Markdown} from '../../../../elements/markdown/main';


type Props = {
  tierNote: TierNote,
  iconClassName: string,
}

export const TierNoteIcon = ({iconClassName, tierNote}: Props) => {
  const [modalState, setModalState] = React.useState<ModalStateFix>({
    show: false,
    title: '',
  });

  return (
    <>
      <ModalFixedContent state={modalState} setState={setModalState}>
        <Markdown overrideStyle={false}>
          {tierNote.note}
        </Markdown>
      </ModalFixedContent>
      <a className={iconClassName} onClick={() => setModalState({...modalState, show: true})}>
        <IconNotes/>
      </a>
    </>
  );
};
