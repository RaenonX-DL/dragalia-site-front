import React from 'react';

import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {translation as translationEN} from '../../../../i18n/translations/en/translation';
import {CollapsibleSectionedContent} from './section';


describe('Collapsible sections', () => {
  it('hides all contents on load', async () => {
    renderReact(() => (
      <CollapsibleSectionedContent
        sections={[{title: 'a', content: 'ac'}, {title: 'b', content: 'bc'}]}
        getTitle={(section) => section.title}
        renderSection={(section) => <>{section.content}</>}
      />
    ));

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    // Cannot use `toBeInTheDocument` because the element is already rendered in DOM tree, just not shown
    expect(screen.getByText('ac')).not.toHaveClass('show');
    expect(screen.getByText('bc')).not.toHaveClass('show');
  });

  it('expands/hides the corresponding section', async () => {
    renderReact(() => (
      <CollapsibleSectionedContent
        sections={[{title: 'a', content: 'ac'}, {title: 'b', content: 'bc'}]}
        getTitle={(section) => section.title}
        renderSection={(section) => <>{section.content}</>}
      />
    ));

    const buttonOpenA = screen.getByText('a');
    userEvent.click(buttonOpenA);

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    // Shown collapsed element will have class 'show'
    await waitFor(() => expect(screen.getByText('ac')).toHaveClass('show'));
    // Cannot use `toBeInTheDocument` because the element is already rendered in DOM tree, just not shown
    expect(screen.getByText('bc')).not.toHaveClass('show');

    userEvent.click(buttonOpenA);

    // Cannot use `toBeInTheDocument` because the element is already rendered in DOM tree, just not shown
    expect(screen.getByText('ac')).not.toHaveClass('show');
    expect(screen.getByText('bc')).not.toHaveClass('show');
  });

  it('expands/hides all sections', async () => {
    renderReact(() => (
      <CollapsibleSectionedContent
        sections={[{title: 'a', content: 'ac'}, {title: 'b', content: 'bc'}]}
        getTitle={(section) => section.title}
        renderSection={(section) => <>{section.content}</>}
      />
    ));

    const buttonOpenAll = screen.getByText(translationEN.misc.collapseAll);
    userEvent.click(buttonOpenAll);

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    // Shown collapsed element will have class 'show'
    await waitFor(() => expect(screen.getByText('ac')).toHaveClass('show'));
    // Cannot use `toBeInTheDocument` because the element is already rendered in DOM tree, just not shown
    expect(screen.getByText('bc')).toHaveClass('show');

    userEvent.click(buttonOpenAll);

    // Cannot use `toBeInTheDocument` because the element is already rendered in DOM tree, just not shown
    expect(screen.getByText('ac')).not.toHaveClass('show');
    expect(screen.getByText('bc')).not.toHaveClass('show');
  });
});
