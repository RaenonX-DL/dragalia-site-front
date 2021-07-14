import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {generateExAbilityDataEntry} from '../../../../../../test/data/mock/exAbilityData';
import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api';
import {ConditionEnumMap} from '../../../../../api-def/resources';
import {PostPath} from '../../../../../const/path/definitions';
import {makePostPath} from '../../../../../utils/path/make';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {ExAbilityEntry} from './entry';


describe('Co-ability output entry', () => {
  let conditionEnumMap: ConditionEnumMap;

  beforeAll(async () => {
    conditionEnumMap = await ResourceLoader.getEnumAllConditions();
  });

  it('renders unit name as a link to their analysis', async () => {
    renderReact(() => (
      <ExAbilityEntry
        entry={generateExAbilityDataEntry()}
        conditionEnums={conditionEnumMap}
      />
    ));

    const unitLink = screen.getByText('EN name');
    userEvent.click(unitLink);

    const expectedLink = makePostPath(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.EN});

    const analysisLink = await screen.findByText('Analysis');
    expect(analysisLink).toHaveAttribute('href', expectedLink);
  });
});
