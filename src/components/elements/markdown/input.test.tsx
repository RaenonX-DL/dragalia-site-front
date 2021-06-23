import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {typeInput} from '../../../../test/utils/event';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {MarkdownInput} from './input';
import * as markdownMain from './main';


describe('Markdown input', () => {
  it('does not re-render markdown preview on change', async () => {
    const mdElement = jest.spyOn(markdownMain, 'Markdown').mockReturnValue(<></>);

    const {rerender} = renderReact(() => (
      <MarkdownInput value="value"/>
    ));

    const textArea = screen.getByText('value', {selector: 'textarea'});
    typeInput(textArea, 'summary', {clear: true, rerender});

    expect(mdElement).not.toHaveBeenCalled();
  });

  it('loads markdown on clicking preview', async () => {
    const mdElement = jest.spyOn(markdownMain, 'Markdown').mockReturnValue(<></>);

    renderReact(() => (
      <MarkdownInput value="value"/>
    ));

    const previewButton = screen.getByText(translationEN.posts.manage.preview);
    userEvent.click(previewButton);

    expect(mdElement).toHaveBeenCalledTimes(1);
    expect(screen.getByText('value')).toBeInTheDocument();
  });

  it('loads correct preview after change', async () => {
    const mdElement = jest.spyOn(markdownMain, 'Markdown').mockReturnValue(<></>);

    const {rerender} = renderReact(() => (
      <MarkdownInput value="value"/>
    ));

    const textArea = screen.getByText('value', {selector: 'textarea'});
    typeInput(textArea, 'new', {clear: true, rerender});

    const previewButton = screen.getByText(translationEN.posts.manage.preview);
    userEvent.click(previewButton);

    expect(mdElement).toHaveBeenCalledTimes(1);
    expect(mdElement).toHaveBeenLastCalledWith({children: 'new'}, {});
  });

  it('triggers `onChange`', async () => {
    const onChange = jest.fn();

    const {rerender} = renderReact(() => (
      <MarkdownInput value="value" onChanged={onChange}/>
    ));

    const textArea = screen.getByText('value', {selector: 'textarea'});
    typeInput(textArea, 'v', {rerender});

    expect(onChange).toHaveBeenCalled();
  });
});
