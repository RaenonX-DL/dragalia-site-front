import React from 'react';

import ReactAudioPlayer from 'react-audio-player';
import Col from 'react-bootstrap/Col';

import {AudioPaths, DepotPaths, StoryTalk as StoryTalkData} from '../../../../../api-def/resources';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {Image} from '../../../../elements/common/image';
import styles from '../main.module.css';


type Props = {
  conversation: StoryTalkData,
  playAudio: boolean,
  audioIdx: number,
  isActive: boolean,
  setAudioIdx: (newAudioIdx: number) => void,
  onAllAudioPlayed: () => void,
};

export const StoryTalk = ({conversation, playAudio, isActive, audioIdx, setAudioIdx, onAllAudioPlayed}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  if (conversation.isSys) {
    return (
      <RowNoGutter className={`mb-2 ${styles['sys-message']}`}>
        <Col>
          {conversation.content}
        </Col>
      </RowNoGutter>
    );
  }

  if (playAudio) {
    ref.current?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
  }

  return (
    <div className={isActive ? styles['conversation-active'] : styles.conversation} ref={ref}>
      {
        playAudio && conversation.audioPaths.length > 0 && audioIdx < conversation.audioPaths.length &&
        <ReactAudioPlayer
          src={AudioPaths.getStoryVoiceURL('ja_jp', conversation.audioPaths[audioIdx])}
          autoPlay
          onEnded={() => {
            const newAudioIdx = audioIdx + 1;
            setAudioIdx(newAudioIdx);

            if (newAudioIdx >= conversation.audioPaths.length) {
              onAllAudioPlayed();
            }
          }}
        />
      }
      <RowNoGutter className="mb-1">
        <Col>
          <small>
            {conversation.speakerName}
          </small>
        </Col>
      </RowNoGutter>
      <RowNoGutter>
        <Col xs="auto" className={styles['speaker-icon']}>
          {
            conversation.speakerIcon ?
              <Image
                src={DepotPaths.getStorySpeakerIconURL(conversation.speakerIcon)}
                text=""
                className={styles['speaker-icon']}
              /> :
              <></>
          }
        </Col>
        <Col>
          {conversation.content}
        </Col>
      </RowNoGutter>
    </div>
  );
};
