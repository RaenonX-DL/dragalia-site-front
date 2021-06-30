import React from 'react';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import {useI18n} from '../../../../../i18n/hook';
import {CommonModal, ModalState} from '../../../common/modal';
import {useAtkSkillInput} from '../hooks/preset';
import {PresetStatus} from './types';


const statusButtonIcon: { [status in PresetStatus]: React.ReactElement } = {
  notCreated: <i className="bi bi-share-fill"/>,
  creating: <Spinner animation="grow" size="sm"/>,
  copied: <i className="bi bi-check2"/>,
  createdNotCopied: <i className="bi bi-clipboard"/>,
};

type Props = {
  isEnabled: boolean,
}

export const AttackingSkillPreset = ({isEnabled}: Props) => {
  const {t} = useI18n();

  const [status, setStatus] = React.useState<PresetStatus>('notCreated');
  const [presetLink, setPresetLink] = React.useState<string>(t((t) => t.game.skillAtk.info.preset));
  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });
  const {inputData, makePreset, makePresetLink} = useAtkSkillInput(() => {
    setStatus('notCreated');
    setModalState({
      ...modalState,
      show: true,
      message: t((t) => t.game.skillAtk.error.presetMustLogin),
    });
  });

  const copyAndSetTimeout = (link: string) => {
    navigator.clipboard.writeText(link).then(() => setStatus('copied'));
    return setTimeout(() => setStatus('createdNotCopied'), 5000);
  };

  const onClickShareButton = () => {
    console.log('render preset', inputData.display);
    if (status === 'notCreated') {
      setStatus('creating');
      makePreset();
    }
    if (status === 'createdNotCopied' && makePresetLink) {
      const timeout: NodeJS.Timeout = copyAndSetTimeout(makePresetLink);
      return () => clearTimeout(timeout);
    }
  };

  if (status === 'creating' && makePresetLink) {
    setPresetLink(makePresetLink);
    copyAndSetTimeout(makePresetLink);
    setStatus('copied');
  }

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <InputGroup className="mb-2 mr-sm-2">
        <FormControl
          className={`bg-black-32 ${status === 'copied' ? 'text-info' : 'text-light'}`} disabled
          value={
            status === 'copied' ?
              t((t) => t.game.skillAtk.info.presetExpiry) :
              presetLink
          }
        />
        <InputGroup.Append>
          <Button
            className="d-flex align-items-center"
            variant="outline-light" onClick={onClickShareButton}
            disabled={!isEnabled || status === 'creating' || status === 'copied'}
          >
            {statusButtonIcon[status]}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};
