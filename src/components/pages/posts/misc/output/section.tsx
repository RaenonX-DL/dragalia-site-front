import React from 'react';

import {MiscPostSection} from '../../../../../api-def/api';
import {Markdown} from '../../../../elements/markdown/main';
import {CollapsibleSectionedContent} from '../../../../elements/posts/output/section';


type Props = {
  sections: Array<MiscPostSection>
}

export const MiscSectionOutput = ({sections}: Props) => {
  return (
    <CollapsibleSectionedContent
      sections={sections}
      getTitle={(section) => section.title}
      renderSection={(section) => <Markdown>{section.content}</Markdown>}
    />
  );
};
