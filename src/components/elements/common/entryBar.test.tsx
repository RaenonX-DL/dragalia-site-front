import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {SlicedEntryBar} from './entryBar';


describe('Entry bar', () => {
  let resultCount: number;
  let setCount: jest.Mock;

  beforeEach(() => {
    resultCount = 5;
    setCount = jest.fn();
  });

  it('set correct result count after showing more', async () => {
    renderReact(() => (
      <SlicedEntryBar
        resultCount={resultCount}
        setResultCount={setCount}
        renderCount={10}
        maxCount={70}
      />
    ));

    const btn = screen.getByText(translationEN.misc.showMore);
    userEvent.click(btn);

    expect(setCount).toBeCalledWith(15);
  });

  it('set correct result count after showing all', async () => {
    renderReact(() => (
      <SlicedEntryBar
        resultCount={resultCount}
        setResultCount={setCount}
        renderCount={10}
        maxCount={70}
      />
    ));

    const btn = screen.getByText(translationEN.misc.showAll);
    userEvent.click(btn);

    expect(setCount).toBeCalledWith(-1);
  });

  it('hides button if result count is negative', async () => {
    renderReact(() => (
      <SlicedEntryBar
        resultCount={-1}
        setResultCount={setCount}
        renderCount={10}
        maxCount={70}
      />
    ));

    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
  });

  it('hides button if result count is greater than max count', async () => {
    renderReact(() => (
      <SlicedEntryBar
        resultCount={71}
        setResultCount={setCount}
        renderCount={10}
        maxCount={70}
      />
    ));

    expect(screen.queryByText(translationEN.misc.showAll)).not.toBeInTheDocument();
  });
});
