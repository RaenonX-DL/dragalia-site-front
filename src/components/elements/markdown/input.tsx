import React, {ChangeEventHandler} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {useI18n} from '../../../i18n/hook';
import {Markdown} from './main';


enum EventKey {
  MARKDOWN = 'markdown',
  PREVIEW = 'preview',
}

type MarkdownInputProps = {
  rows?: number,
  onChanged?: ChangeEventHandler<HTMLTextAreaElement>,
  value?: string,
  required?: boolean
  disabled?: boolean,
};

export const MarkdownInput = ({
  rows,
  onChanged,
  value = '',
  required = false,
  disabled = false,
}: MarkdownInputProps) => {
  const {t} = useI18n();

  const [content, setContent] = React.useState(value);
  const [preview, setPreview] = React.useState(<></>);

  const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (onChanged) {
      onChanged(e);
    }
  };

  const onSelect = (key: string | null) => {
    if (key !== 'preview') {
      return;
    }

    // To lazy-load markdown
    setPreview(<Markdown>{content}</Markdown>);
  };

  return (
    <Tabs defaultActiveKey={EventKey.MARKDOWN} onSelect={onSelect}>
      <Tab eventKey={EventKey.MARKDOWN} title={t((t) => t.posts.manage.md)}>
        <textarea
          className="form-control" rows={rows} onChange={updateContent}
          required={required} value={content} disabled={disabled}
        />
      </Tab>
      <Tab eventKey={EventKey.PREVIEW} title={t((t) => t.posts.manage.preview)}>
        {preview}
      </Tab>
    </Tabs>
  );
};
