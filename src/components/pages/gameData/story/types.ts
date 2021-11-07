export type AudioState = {
  mainIdx: number,
  subIdx: number,
  isPlaying: boolean,
};

export type AudioPlayingState = 'playing' | 'pausing' | 'stopping';

export type UseAudioControlReturn = {
  playingState: AudioPlayingState,
  isPlayingForIdx: (idx: number) => boolean,
  startAudio: () => void,
  stopAudio: () => void,
  pauseAudio: () => void,
  resumeAudio: () => void,
  advanceToNextAudio: (srcIdx: number) => () => void,
  advanceToNextSub: (newSubIdx: number) => void,
  currentState: AudioState,
};
