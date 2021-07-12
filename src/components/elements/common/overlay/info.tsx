import React from 'react';

import {Markdown} from '../../markdown/main';
import {TitledProps} from '../types';
import {OverlayPopover} from './popover';


type InfoPopoverProps = TitledProps & {
  description: string | React.ReactElement,
}

export const InfoPopover = ({title, description}: InfoPopoverProps) => {
  return (
    <OverlayPopover title={title} content={description}>
      <i className="bi bi-info-circle"/>
    </OverlayPopover>
  );
};

type InfoPopoverMarkdownProps = Omit<InfoPopoverProps, 'description'> & {
  description: string,
}

export const InfoPopoverMarkdown = ({title, description}: InfoPopoverMarkdownProps) => {
  return <InfoPopover title={title} description={<Markdown overrideStyle={false}>{description}</Markdown>}/>;
};
