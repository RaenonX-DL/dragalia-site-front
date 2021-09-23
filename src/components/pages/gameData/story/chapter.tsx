import React from 'react';


import {Story} from '../../../../api-def/resources';
import {AudioControl} from './audioControl';
import {useAudioControl} from './audioHook';
import {StoryBreak} from './conversation/break';
import {StoryTalk} from './conversation/talk';


type Props = {
  chapter: Story,
}

export const StoryChapter = ({chapter}: Props) => {
  const hookReturn = useAudioControl({
    getConversationOfIndex: (idx) => chapter.conversations[idx],
    conversationCount: chapter.conversations.length,
  });
  const {playingState, isPlayingForIdx, advanceToNextAudio, advanceToNextSub, currentState} = hookReturn;

  return (
    <>
      <AudioControl hookReturn={hookReturn}/>
      {chapter.conversations.map((conversation, idx) => {
        if (conversation.type === 'conversation') {
          return (
            <StoryTalk
              key={idx}
              conversation={conversation}
              playAudio={isPlayingForIdx(idx) && playingState === 'playing'}
              audioIdx={currentState.subIdx}
              isActive={isPlayingForIdx(idx)}
              setAudioIdx={advanceToNextSub}
              onAllAudioPlayed={advanceToNextAudio(idx)}
            />
          );
        }
        if (conversation.type === 'break') {
          return <StoryBreak key={idx}/>;
        }
      })}
    </>
  );
};
