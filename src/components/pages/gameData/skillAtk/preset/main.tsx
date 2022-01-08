import React from 'react';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {IconClipboard, IconOk, IconShare} from '../../../../elements/common/icons';
import {ModalFlexContent} from '../../../../elements/common/modal/flex';
import {PRESET_QUERY_NAME} from '../hooks/preset';
import {InputData} from '../in/types';
import {PresetState, PresetStatus} from './types';


const statusButtonIcon: {[status in PresetStatus]: React.ReactElement} = {
  notCreated: <IconShare/>,
  creating: <Spinner animation="grow" size="sm"/>,
  copied: <IconOk/>,
  createdNotCopied: <IconClipboard/>,
};

type Props = {
  inputData: InputData,
  isEnabled: boolean,
};

export const AttackingSkillPreset = ({inputData, isEnabled}: Props) => {
  const {t} = useI18n();

  const context = React.useContext(AppReactContext);

  const [state, setState] = React.useState<PresetState>({
    status: 'notCreated',
    link: t((t) => t.game.skillAtk.info.preset),
    modal: {
      show: false,
      title: '',
      message: '',
    },
  });

  React.useEffect(() => {
    setState({...state, status: 'notCreated', link: t((t) => t.game.skillAtk.info.preset)});
  }, [inputData]);

  const makePreset = () => {
    setState({...state, status: 'creating'});
    if (!context?.session) {
      setState({
        ...state,
        status: 'notCreated',
        modal: {
          title: 'Error',
          show: true,
          message: t((t) => t.game.skillAtk.error.presetMustLogin),
        },
      });
      return;
    }

    ApiRequestSender.setPresetAtkSkill(context.session.user.id.toString(), inputData)
      .then((response) => {
        const link = new URL(window.location.href);
        link.searchParams.set(PRESET_QUERY_NAME, response.presetId);

        copyAndSetTimeout(link.href);
      })
      .catch((e) => {
        setState({
          ...state,
          status: 'notCreated',
          modal: {
            title: 'Error',
            show: true,
            message: e.message,
          },
        });
      });
  };

  const copyAndSetTimeout = (link: string = state.link) => {
    navigator.clipboard.writeText(link).then(() => setState({...state, status: 'copied', link}));
    return setTimeout(() => setState({...state, status: 'createdNotCopied', link}), 5000);
  };

  const onClickShareButton = () => {
    if (state.status === 'notCreated') {
      makePreset();
    }
    if (state.status === 'createdNotCopied') {
      copyAndSetTimeout();
    }
  };

  return (
    <>
      <ModalFlexContent
        state={state.modal}
        setState={(modalState) => setState({...state, modal: modalState})}
      />
      <InputGroup className="mb-2 mr-sm-2">
        <FormControl
          className={`bg-black-32 ${state.status === 'copied' ? 'text-info' : 'text-light'}`} disabled
          value={
            state.status === 'copied' ?
              t((t) => t.game.skillAtk.info.presetExpiry) :
              state.link
          }
        />
        <Button
          className="d-flex align-items-center"
          variant="outline-light" onClick={onClickShareButton}
          disabled={!isEnabled || state.status === 'creating' || state.status === 'copied'}
        >
          {statusButtonIcon[state.status]}
        </Button>
      </InputGroup>
    </>
  );
};
