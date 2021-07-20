import {HeadingComponent, ReactBaseProps, ReactMarkdownProps} from 'react-markdown/src/ast-to-react';


export type MarkdownComponentProps = ReactBaseProps & ReactMarkdownProps

export type MarkdownComponentHeadingProps = MarkdownComponentProps & HeadingComponent
