import React from 'react';

import {MiscPostSection} from '../../../../../api-def/api';
import {Markdown} from '../../../../elements/markdown/main';
import {AlertVideoTips} from '../../../../elements/posts/alert';
import {CollapsibleSectionedContent} from '../../../../elements/posts/output/section';


type Props = {
  sections: Array<MiscPostSection>
}

export const MiscSectionOutput = ({sections}: Props) => {
  return (
    <>
      <div className="mb-2">
        <AlertVideoTips/>
      </div>
      <CollapsibleSectionedContent
        sections={sections}
        getTitle={(section) => section.title}
        renderSection={(section) => <Markdown>{section.content}</Markdown>}
      />
    </>
  );
};
