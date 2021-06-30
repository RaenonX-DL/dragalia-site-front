import React from 'react';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import {useI18n} from '../../../../../i18n/hook';
import {CommonModal, ModalState} from '../../../common/modal';
import {useAtkSkillInput} from '../hooks/preset';


type CurrentStatus =
  'notCreated' |
  'creating' |
  'copied' |
  'createdNotCopied';

const statusButtonIcon: { [status in CurrentStatus]: React.ReactElement } = {
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

  const [currentStatus, setCurrentStatus] = React.useState<CurrentStatus>('notCreated');
  const [presetLink, setPresetLink] = React.useState<string>(t((t) => t.game.skillAtk.info.preset));
  const [modalState, setModalState] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });
  const {inputData, makePreset, makePresetLink} = useAtkSkillInput(() => {
    setCurrentStatus('notCreated');
    setModalState({
      ...modalState,
      show: true,
      message: t((t) => t.game.skillAtk.error.presetMustLogin),
    });
  });

  const copyAndSetTimeout = (link: string) => {
    navigator.clipboard.writeText(link).then(() => setCurrentStatus('copied'));
    return setTimeout(() => setCurrentStatus('createdNotCopied'), 5000);
  };

  const onClickShareButton = () => {
    if (currentStatus === 'notCreated') {
      setCurrentStatus('creating');
      makePreset();
    }
    if (currentStatus === 'createdNotCopied' && makePresetLink) {
      const timeout: NodeJS.Timeout = copyAndSetTimeout(makePresetLink);
      return () => clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    setCurrentStatus('notCreated');
  }, [inputData]);

  if (currentStatus === 'creating' && makePresetLink) {
    setPresetLink(makePresetLink);
    copyAndSetTimeout(makePresetLink);
    setCurrentStatus('copied');
  }

  return (
    <>
      <CommonModal modalState={modalState} setModalState={setModalState}/>
      <InputGroup className="mb-2 mr-sm-2">
        <FormControl
          className={`bg-black-32 ${currentStatus === 'copied' ? 'text-info' : 'text-light'}`} disabled
          value={
            currentStatus === 'copied' ?
              t((t) => t.game.skillAtk.info.presetExpiry) :
              presetLink
          }
        />
        <InputGroup.Append>
          <Button
            className="d-flex align-items-center"
            variant="outline-light" onClick={onClickShareButton}
            disabled={!isEnabled || currentStatus === 'creating' || currentStatus === 'copied'}
          >
            {statusButtonIcon[currentStatus]}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};
