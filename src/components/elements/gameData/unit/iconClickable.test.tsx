import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {PostPath, StoryPath, UnitPath} from '../../../../const/path/definitions';
import {makePostUrl, makeStoryUrl, makeUnitUrl} from '../../../../utils/path/make';
import {UnitIconClickable} from './iconClickable';


describe('Clickable unit icon', () => {
  it('renders icon only on loaded', async () => {
    renderReact(() => (
      <UnitIconClickable
        unit={{
          id: 10950101,
          name: 'Gala Leonidas',
          icon: {type: UnitType.CHARACTER, name: 'G!Leon'},
        }}
      />
    ));

    expect(await screen.findByText('', {selector: 'img'})).toBeInTheDocument();
    expect(screen.queryByText('Analysis')).not.toBeInTheDocument();
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
  });

  it('shows modal upon clicking the icon', async () => {
    renderReact(() => (
      <UnitIconClickable
        unit={{
          id: 10950101,
          name: 'Gala Leonidas',
          icon: {type: UnitType.CHARACTER, name: 'G!Leon'},
        }}
      />
    ));

    const iconElement = await screen.findByText('', {selector: 'img'});
    userEvent.click(iconElement);

    const analysisLink = await screen.findByText('Analysis');
    const expectedAnalysisLink = makePostUrl(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.EN});
    expect(analysisLink).toHaveAttribute('href', expectedAnalysisLink);

    const tierLink = screen.getByText('Ranking / Tier');
    const expectedTierLink = makeUnitUrl(UnitPath.UNIT_TIER, {id: 10950101, lang: SupportedLanguages.EN});
    expect(tierLink).toHaveAttribute('href', expectedTierLink);

    const infoLink = screen.getByText('Info');
    const expectedInfoLink = makeUnitUrl(UnitPath.UNIT_INFO, {id: 10950101, lang: SupportedLanguages.EN});
    expect(infoLink).toHaveAttribute('href', expectedInfoLink);

    const storyLink = screen.getByText('Story');
    const expectedStoryLink = makeStoryUrl(StoryPath.UNIT, {id: 10950101, lang: SupportedLanguages.EN});
    expect(storyLink).toHaveAttribute('href', expectedStoryLink);
  });

  it('shows modal without analysis if not exists', async () => {
    renderReact(() => (
      <UnitIconClickable
        unit={{
          id: 10950101,
          name: 'Gala Leonidas',
          icon: {type: UnitType.CHARACTER, name: 'G!Leon'},
        }}
        hasAnalysis={false}
      />
    ));

    const iconElement = await screen.findByText('', {selector: 'img'});
    userEvent.click(iconElement);

    expect(await screen.findByText('Info')).toBeInTheDocument();
    expect(screen.queryByText('Analysis')).not.toBeInTheDocument();
  });
});
