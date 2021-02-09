import React, {ChangeEventHandler} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {Markdown} from './main';

type MarkdownInputProps = {
  rows?: number,
  onChanged?: ChangeEventHandler<HTMLInputElement>,
  value?: string,
  required?: boolean
};

export const MarkdownInput = ({rows, onChanged, value = '', required = false}: MarkdownInputProps) => {
  const {t} = useTranslation();

  const [content, setContent] = React.useState(value);

  const updateContent = (e) => {
    setContent(e.target.value);

    if (onChanged) {
      onChanged(e);
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="markdown">
        <Tab eventKey="markdown" title={t('posts.manage.md')}>
          <textarea
            className="form-control mt-1" rows={rows} onChange={updateContent} required={required} value={content}/>
        </Tab>
        <Tab eventKey="preview" title={t('posts.manage.preview')}>
          <div className="p-3">
            <Markdown>{content}</Markdown>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
