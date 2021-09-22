import React from 'react';

import {Story} from '../../../../api-def/resources';
import {StoryBreak} from './conversation/break';
import {StoryTalk} from './conversation/talk';


type Props = {
  chapter: Story,
}

export const StoryChapter = ({chapter}: Props) => {
  return (
    <>
      {chapter.conversations.map((conversation, idx) => {
        if (conversation.type === 'conversation') {
          return <StoryTalk key={idx} conversation={conversation}/>;
        }
        if (conversation.type === 'break') {
          return <StoryBreak key={idx}/>;
        }
      })}
    </>
  );
};
