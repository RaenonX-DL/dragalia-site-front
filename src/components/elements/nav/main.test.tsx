import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../test/render/main';
import {GeneralPath} from '../../../const/path/definitions';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {Navigation} from './main';


describe('Navigation bar', () => {
  it('has expected things shown', async () => {
    renderReact(() => <Navigation/>);

    // One for navbar, another one for title bar
    expect(screen.queryByText(translationEN.meta.inUse.site.title)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.meta.inUse.thanks.title)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.quest.titleSelf)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.nav.unitInfo)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.posts.misc.titleSelf)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.data.titleSelf)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.game.tools.titleSelf)).toBeInTheDocument();
    expect(screen.queryByText(translationEN.meta.inUse.about.title)).toBeInTheDocument();
  });

  it('shows the clicked item as active', async () => {
    const {rerender} = renderReact(() => <Navigation/>);

    const thanksButton = screen.getByText(translationEN.meta.inUse.thanks.title);
    userEvent.click(thanksButton);
    rerender();

    expect(thanksButton).toHaveClass('active');
  });

  it('marks item as active upon visit', async () => {
    renderReact(
      () => <Navigation/>,
      {
        routerOptions: {
          pathname: GeneralPath.ABOUT,
        },
      },
    );

    const aboutButton = screen.getByText(translationEN.meta.inUse.about.title);

    expect(aboutButton).toHaveClass('active');
  });
});
