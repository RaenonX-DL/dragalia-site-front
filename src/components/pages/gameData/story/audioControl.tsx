import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {IconPause, IconPlay, IconStop} from '../../../elements/common/icons';
import styles from './main.module.css';
import {UseAudioControlReturn} from './types';


type Props = {
  hookReturn: UseAudioControlReturn,
};

export const AudioControl = ({hookReturn}: Props) => {
  const {playingState, startAudio, resumeAudio, pauseAudio, stopAudio} = hookReturn;

  const PlayButton = ({isStart = false}) => (
    <Button className={styles['audio-control']} variant="outline-success" onClick={isStart ? startAudio : resumeAudio}>
      <IconPlay/>
    </Button>
  );

  const PauseButton = () => (
    <Button className={styles['audio-control']} variant="outline-warning" onClick={pauseAudio}>
      <IconPause/>
    </Button>
  );

  const StopButton = () => (
    <Button className={styles['audio-control']} variant="outline-danger" onClick={stopAudio}>
      <IconStop/>
    </Button>
  );

  if (playingState !== 'stopping') {
    return (
      <Row className={styles['audio-control']}>
        <Col>
          <ButtonGroup>
            {playingState === 'playing' ? <PauseButton/> : <PlayButton/>}
            <StopButton/>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

  return (
    <Row className={styles['audio-control']}>
      <Col>
        <PlayButton isStart/>
      </Col>
    </Row>
  );
};
