import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {CalcExpression} from './main';


describe('Markdown math expression', () => {
  it('shows the expression at the beginning', async () => {
    renderReact(() => <CalcExpression>{'[fx]5 + 5'}</CalcExpression>);

    expect(screen.getByText('(5 + 5) 10')).toBeInTheDocument();
  });

  it('shows the expression at the end', async () => {
    renderReact(() => <CalcExpression>{'5 + 5[fx]'}</CalcExpression>);

    expect(screen.getByText('10 (5 + 5)')).toBeInTheDocument();
  });

  it('trims whitespaces in the expression', async () => {
    renderReact(() => <CalcExpression>{'5 + 5 [fx]'}</CalcExpression>);

    expect(screen.getByText('10 (5 + 5)')).toBeInTheDocument();
  });

  it('does not show the expression', async () => {
    renderReact(() => <CalcExpression>{'5 + 5'}</CalcExpression>);

    const result = screen.getByText('10');
    expect(result).toBeInTheDocument();

    userEvent.hover(result);
    expect(screen.getByText('5 + 5')).toBeInTheDocument();
  });

  it('shows the original text if the expression is invalid', async () => {
    renderReact(() => <CalcExpression>{'some text'}</CalcExpression>);

    expect(screen.getByText('some text')).toBeInTheDocument();
  });

  it('can use `x` for multiplication', async () => {
    renderReact(() => <CalcExpression>{'5 x 5'}</CalcExpression>);

    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('replaces `*` with `x` in expression', async () => {
    renderReact(() => <CalcExpression>{'[fx]5 * 5'}</CalcExpression>);

    expect(screen.getByText('(5 x 5) 25')).toBeInTheDocument();
  });

  it('shows 2 decimals', async () => {
    renderReact(() => <CalcExpression>{'5 / 8[2f]'}</CalcExpression>);

    expect(screen.getByText('0.63')).toBeInTheDocument();
  });

  it('shows 2 decimals and the expression', async () => {
    renderReact(() => <CalcExpression>{'5 / 8[fx][2f]'}</CalcExpression>);

    expect(screen.getByText('0.63 (5 / 8)')).toBeInTheDocument();
  });
});
