import React from 'react';

import {StoryConversation} from '../../../../api-def/resources';
import {AudioPlayingState, AudioState, UseAudioControlReturn} from './types';


type UseAudioControlOptions = {
  getConversationOfIndex: (index: number) => StoryConversation,
  conversationCount: number
};

export const useAudioControl = ({
  getConversationOfIndex,
  conversationCount,
}: UseAudioControlOptions): UseAudioControlReturn => {
  const [state, setState] = React.useState<AudioState>({
    mainIdx: -1,
    subIdx: -1,
    isPlaying: false,
  });

  let playingState: AudioPlayingState;
  if (state.mainIdx === -1) {
    playingState = 'stopping';
  } else {
    playingState = state.isPlaying ? 'playing' : 'pausing';
  }

  const isPlayingForIdx = (idx: number) => state.mainIdx === idx;

  const advanceToNextAudio = (currentAudioIdx: number) => () => {
    let newAudioIdx = currentAudioIdx + 1;

    while (!hasAudioToPlay(newAudioIdx)) {
      newAudioIdx++;

      if (newAudioIdx >= conversationCount) {
        // Audio loop complete, set back to non-playing index
        stopAudio();
        return;
      }
    }

    setState({mainIdx: newAudioIdx, subIdx: 0, isPlaying: true});
  };

  const startAudio = advanceToNextAudio(-1);

  const stopAudio = () => setState({mainIdx: -1, subIdx: -1, isPlaying: false});

  const pauseAudio = () => setState({...state, isPlaying: false});

  const resumeAudio = () => setState({...state, isPlaying: true});

  const hasAudioToPlay = (idx: number) => {
    const conversation = getConversationOfIndex(idx);

    if (conversation.type !== 'conversation') {
      return false;
    }

    return conversation.audioPaths.length > 0;
  };

  const advanceToNextSub = (subIdx: number) => setState({...state, subIdx});

  return {
    playingState,
    isPlayingForIdx,
    startAudio,
    stopAudio,
    pauseAudio,
    resumeAudio,
    advanceToNextAudio,
    advanceToNextSub,
    currentState: state,
  };
};
