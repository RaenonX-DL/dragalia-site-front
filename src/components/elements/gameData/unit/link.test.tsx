import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {SupportedLanguages, UnitType} from '../../../../api-def/api';
import {DepotPaths} from '../../../../api-def/resources';
import {PostPath, StoryPath, UnitPath} from '../../../../const/path/definitions';
import {makePostUrl, makeStoryUrl, makeUnitUrl} from '../../../../utils/path/make';
import {UnitLink} from './link';


describe('Unit link', () => {
  it('renders an <a> tag only on load', async () => {
    renderReact(() => <UnitLink unit={{id: 10950101, name: 'Gala Leonidas'}}/>);

    expect(await screen.findByText('Gala Leonidas', {selector: 'a'})).toBeInTheDocument();
    expect(screen.queryByText('Analysis')).not.toBeInTheDocument();
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
  });

  it('shows modal with correct related links', async () => {
    renderReact(() => <UnitLink unit={{id: 10950101, name: 'Gala Leonidas'}}/>);

    const linkElement = await screen.findByText('Gala Leonidas', {selector: 'a'});
    userEvent.click(linkElement);

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
    renderReact(() => <UnitLink unit={{id: 10950101, name: 'Gala Leonidas'}} hasAnalysis={false}/>);

    const linkElement = await screen.findByText('Gala Leonidas', {selector: 'a'});
    userEvent.click(linkElement);

    expect(await screen.findByText('Info')).toBeInTheDocument();
    expect(screen.queryByText('Analysis')).not.toBeInTheDocument();
  });

  it('shows loading on clicking link', async () => {
    renderReact(() => <UnitLink unit={{id: 10950101, name: 'Gala Leonidas'}}/>);

    const linkElement = await screen.findByText('Gala Leonidas', {selector: 'a'});
    userEvent.click(linkElement);

    const analysisLink = await screen.findByText('Analysis');
    userEvent.click(analysisLink);

    expect(await screen.findByText(/Loading/));
  });

  it('shows unit icon if icon name is given', async () => {
    renderReact(
      () => (
        <UnitLink
          unit={{
            id: 10950101,
            name: 'Gala Leonidas',
            icon: {name: '100013_04_r05', type: UnitType.CHARACTER},
          }}
        />
      ),
    );

    const imageElement = screen.getByText('', {selector: 'img'});
    expect(imageElement).toHaveAttribute('src', DepotPaths.getCharaIconURL('100013_04_r05'));
  });

  it('hides unit icon if icon name is not given', async () => {
    renderReact(
      () => <UnitLink unit={{id: 10950101, name: 'Gala Leonidas'}}/>,
    );

    expect(screen.queryByText('', {selector: 'img'})).not.toBeInTheDocument();
  });
});
