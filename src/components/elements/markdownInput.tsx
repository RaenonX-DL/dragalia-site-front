import React, {ChangeEventHandler} from 'react';
import {useTranslation} from 'react-i18next';
import {Tab, Tabs} from 'react-bootstrap';

import {Markdown} from './markdown';

type MarkdownInputProps = {
  rows?: number,
  onChanged?: ChangeEventHandler<HTMLInputElement>,
  required?: boolean
};

export const MarkdownInput = ({rows, onChanged, required = false}: MarkdownInputProps) => {
  const {t} = useTranslation();

  const [content, setContent] = React.useState('');

  const updateContent = (e) => {
    setContent(e.target.value);

    if (onChanged !== undefined) {
      onChanged(e);
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="markdown">
        <Tab eventKey="markdown" title={t('posts.manage.md')}>
          <textarea className="form-control mt-1" rows={rows} onChange={updateContent} required={required}/>
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
