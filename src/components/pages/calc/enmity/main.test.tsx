import React from 'react';

import {screen} from '@testing-library/react';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {EnmityCalculator} from './main';


describe('Enmity mod calculator - mods part', () => {
  it('updates effective mods when original enmity mod is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('1.6'); // Original enmity mod
    typeInput(input, '3', {rerender, clear: true});

    expect(await screen.findByDisplayValue('3')).toBeInTheDocument(); // Updated original enmity mod
    expect(await screen.findByDisplayValue('1.08')).toBeInTheDocument(); // Effective enmity mod
    expect(await screen.findByDisplayValue('1745')).toBeInTheDocument(); // Effective skill mod
  });

  it('updates effective skill mod when original skill mod is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('1616'); // Original skill mod
    typeInput(input, '2000', {rerender, clear: true});

    expect(await screen.findByDisplayValue('2048')).toBeInTheDocument(); // Effective skill mod
  });

  it('updates current HP values and effective skill mod when effective enmity mod is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('1.024'); // Effective enmity mod
    typeInput(input, '1', {rerender, clear: true});

    expect(await screen.findAllByDisplayValue('1616')).toHaveLength(2); // Original + Effective skill mod
    expect(await screen.findByDisplayValue('100')).toBeInTheDocument(); // Current HP %
    expect(await screen.findAllByDisplayValue('3000')).toHaveLength(2); // Current + Max HP
  });

  it('updates original skill mod when effective skill mod is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('1655'); // Effective skill mod
    typeInput(input, '2048', {rerender, clear: true});

    expect(await screen.findByDisplayValue('2000')).toBeInTheDocument(); // Original skill mod
  });

  it('updates current HP and effective mods when current HP % is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('80'); // Current HP %
    typeInput(input, '50', {rerender, clear: true});

    expect(await screen.findByDisplayValue('1500')).toBeInTheDocument(); // Current HP
    expect(await screen.findByDisplayValue('1.15')).toBeInTheDocument(); // Effective enmity mod
    expect(await screen.findByDisplayValue('1858')).toBeInTheDocument(); // Effective skill mod
  });

  it('updates HP % and effective mods when current HP is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('2400'); // Current HP
    typeInput(input, '1200', {rerender, clear: true});

    expect(await screen.findByDisplayValue('40')).toBeInTheDocument(); // Current HP %
    expect(await screen.findByDisplayValue('1.216')).toBeInTheDocument(); // Effective enmity mod
    expect(await screen.findByDisplayValue('1965')).toBeInTheDocument(); // Effective skill mod
  });

  it('updates HP % and effective mods when max HP is updated', async () => {
    const {rerender} = renderReact(() => <EnmityCalculator/>);

    const input = screen.getByDisplayValue('3000'); // Max HP
    typeInput(input, '4800', {rerender, clear: true});

    expect(await screen.findByDisplayValue('50')).toBeInTheDocument(); // Current HP %
    expect(await screen.findByDisplayValue('1.15')).toBeInTheDocument(); // Effective enmity mod
    expect(await screen.findByDisplayValue('1858')).toBeInTheDocument(); // Effective skill mod
  });
});
