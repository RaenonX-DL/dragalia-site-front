import {waitFor} from '@testing-library/react';

import {renderReactHook} from '../../../../../test/render/main';
import {SupportedLanguages} from '../../../../api-def/api';
import {useUnitInfo} from './hooks';


describe('Unit info hook', () => {
  it('loads all unit info and create a lookup map', async () => {
    const {result} = renderReactHook(() => useUnitInfo());

    await waitFor(() => expect(result.current.charaInfo.length).toBeGreaterThan(0));
    await waitFor(() => expect(result.current.dragonInfo.length).toBeGreaterThan(0));
    expect(result.current.unitInfoMap.size).toBeGreaterThan(0);
  });

  it('returns the unit name if it exists', async () => {
    const {result} = renderReactHook(() => useUnitInfo());

    await waitFor(() => expect(result.current.charaInfo.length).toBeGreaterThan(0));
    await waitFor(() => expect(result.current.dragonInfo.length).toBeGreaterThan(0));
    expect(result.current.unitInfoMap.size).toBeGreaterThan(0);

    expect(result.current.getUnitName(10950101, SupportedLanguages.EN)).toBe('Gala Leonidas');
  });

  it('returns undefined if the unit does not exist', async () => {
    const {result} = renderReactHook(() => useUnitInfo());

    await waitFor(() => expect(result.current.charaInfo.length).toBeGreaterThan(0));
    await waitFor(() => expect(result.current.dragonInfo.length).toBeGreaterThan(0));
    expect(result.current.unitInfoMap.size).toBeGreaterThan(0);

    expect(result.current.getUnitName(1, SupportedLanguages.EN)).toBeUndefined();
  });
});
