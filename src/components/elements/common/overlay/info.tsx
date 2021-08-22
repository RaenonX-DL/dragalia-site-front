import React from 'react';

import {Markdown} from '../../markdown/main';
import {IconInfo} from '../icons';
import {TitledProps} from '../types';
import {OverlayPopover} from './popover';


type InfoPopoverProps = TitledProps & {
  description: string | React.ReactElement,
}

export const InfoPopover = ({title, description}: InfoPopoverProps) => {
  return (
    <OverlayPopover title={title} content={description}>
      {/* Needs an intermediate HTML element to accept `ref` for this to work properly */}
      <span>
        <IconInfo/>
      </span>
    </OverlayPopover>
  );
};

type InfoPopoverMarkdownProps = Omit<InfoPopoverProps, 'description'> & {
  description: string,
}

export const InfoPopoverMarkdown = ({title, description}: InfoPopoverMarkdownProps) => {
  return <InfoPopover title={title} description={<Markdown overrideStyle={false}>{description}</Markdown>}/>;
};
