import {renderReactHook} from '../../../../../test/render/main';
import {StoryConversation} from '../../../../api-def/resources';
import {useAudioControl} from './audioHook';

describe('Audio control hook', () => {
  const conversations: Array<StoryConversation> = [
    {
      type: 'conversation',
      speakerName: 'speaker',
      speakerIcon: null,
      content: 'content',
      isSys: false,
      audioPaths: ['A'],
    },
    {
      type: 'conversation',
      speakerName: 'speaker',
      speakerIcon: null,
      content: 'content',
      isSys: false,
      audioPaths: ['B'],
    },
    {
      type: 'conversation',
      speakerName: 'speaker',
      speakerIcon: null,
      content: 'content',
      isSys: false,
      audioPaths: [],
    },
    {type: 'break'},
    {
      type: 'conversation',
      speakerName: 'speaker',
      speakerIcon: null,
      content: 'content',
      isSys: false,
      audioPaths: ['C'],
    },
  ];

  it('is not playing on load', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    expect(result.current.currentState.mainIdx).toBe(-1);
    expect(result.current.currentState.subIdx).toBe(-1);
    expect(result.current.currentState.isPlaying).toBeFalsy();
    expect(result.current.playingState).toBe('stopping');
  });

  it('starts', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();

    expect(result.current.currentState.mainIdx).toBe(0);
    expect(result.current.currentState.subIdx).toBe(0);
    expect(result.current.currentState.isPlaying).toBeTruthy();
    expect(result.current.playingState).toBe('playing');
  });

  it('pauses', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextAudio(0)();
    result.current.pauseAudio();

    expect(result.current.currentState.mainIdx).toBe(1);
    expect(result.current.currentState.subIdx).toBe(0);
    expect(result.current.currentState.isPlaying).toBeFalsy();
    expect(result.current.playingState).toBe('pausing');
  });

  it('resumes', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextAudio(0)();
    result.current.pauseAudio();
    result.current.resumeAudio();

    expect(result.current.currentState.mainIdx).toBe(1);
    expect(result.current.currentState.subIdx).toBe(0);
    expect(result.current.currentState.isPlaying).toBeTruthy();
    expect(result.current.playingState).toBe('playing');
  });

  it('stops', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextAudio(0)();
    result.current.advanceToNextAudio(1)();
    result.current.stopAudio();

    expect(result.current.currentState.mainIdx).toBe(-1);
    expect(result.current.currentState.subIdx).toBe(-1);
    expect(result.current.currentState.isPlaying).toBeFalsy();
    expect(result.current.playingState).toBe('stopping');
  });

  it('advanced to the next sub-audio', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextSub(1);

    expect(result.current.currentState.mainIdx).toBe(0);
    expect(result.current.currentState.subIdx).toBe(1);
    expect(result.current.currentState.isPlaying).toBeTruthy();
    expect(result.current.playingState).toBe('playing');
  });

  it('does not stop on break', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextAudio(2)();

    expect(result.current.currentState.mainIdx).toBe(4);
    expect(result.current.currentState.subIdx).toBe(0);
    expect(result.current.currentState.isPlaying).toBeTruthy();
    expect(result.current.playingState).toBe('playing');
  });

  it('goes to the next conversation if no label', async () => {
    const {result} = renderReactHook(() => useAudioControl({
      getConversationOfIndex: (idx) => conversations[idx],
      conversationCount: conversations.length,
    }));

    result.current.startAudio();
    result.current.advanceToNextAudio(1)();

    expect(result.current.currentState.mainIdx).toBe(4);
    expect(result.current.currentState.subIdx).toBe(0);
    expect(result.current.currentState.isPlaying).toBeTruthy();
    expect(result.current.playingState).toBe('playing');
  });
});
