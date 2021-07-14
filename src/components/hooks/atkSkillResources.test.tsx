import {waitFor} from '@testing-library/react';

import {renderReactHook} from '../../../test/render/main';
import {useAtkSkillResources} from './atkSkillResources';


describe('ATK skill resource fetching hook', () => {
  it('only fetches condition enums', async () => {
    const {result} = renderReactHook(() => useAtkSkillResources({toFetch: 'conditionEnumsOnly'}));

    await waitFor(() => expect(result.current.isAllFetched).toBeTruthy(), {timeout: 2000});
    expect(Object.keys(result.current.conditionEnumMap).length).toBeGreaterThan(0);
    expect(Object.keys(result.current.elementBonuses.data).length).toBe(0);
    expect(result.current.attackingSkillEntries.length).toBe(0);
    expect(result.current.skillEnums.cancel.length).toBe(0);
    expect(Object.keys(result.current.skillIdentifierInfo).length).toBe(0);
    expect(result.current.statusEnums.status.length).toBe(0);
  });

  it('fetches all resources', async () => {
    const {result} = renderReactHook(() => useAtkSkillResources({toFetch: 'all'}));

    await waitFor(() => expect(result.current.isAllFetched).toBeTruthy(), {timeout: 2000});
    expect(Object.keys(result.current.conditionEnumMap).length).toBeGreaterThan(0);
    expect(Object.keys(result.current.elementBonuses.data).length).toBeGreaterThan(0);
    expect(result.current.attackingSkillEntries.length).toBeGreaterThan(0);
    expect(result.current.skillEnums.cancel.length).toBeGreaterThan(0);
    expect(Object.keys(result.current.skillIdentifierInfo).length).toBeGreaterThan(0);
    expect(result.current.statusEnums.status.length).toBeGreaterThan(0);
  });

  it('fetches all resources if no options provided', async () => {
    const {result} = renderReactHook(() => useAtkSkillResources({toFetch: 'all'}));

    await waitFor(() => expect(result.current.isAllFetched).toBeTruthy(), {timeout: 2000});
    expect(Object.keys(result.current.conditionEnumMap).length).toBeGreaterThan(0);
    expect(Object.keys(result.current.elementBonuses.data).length).toBeGreaterThan(0);
    expect(result.current.attackingSkillEntries.length).toBeGreaterThan(0);
    expect(result.current.skillEnums.cancel.length).toBeGreaterThan(0);
    expect(Object.keys(result.current.skillIdentifierInfo).length).toBeGreaterThan(0);
    expect(result.current.statusEnums.status.length).toBeGreaterThan(0);
  });
});
