import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api';
import {ElementEnums, ExBuffParams} from '../../../../../api-def/resources';
import {SectionFilter} from './filter';
import {InputData} from './types';

describe('EX/CEX filter section', () => {
  let inputData: InputData;
  let setInputData: jest.Mock<void, [InputData]>;

  const elementEnums: ElementEnums = {
    elemental: [
      {
        name: 'elem 1',
        code: 1,
        imagePath: 'elem/1.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT elem 1',
          [SupportedLanguages.EN]: 'EN elem 1',
          [SupportedLanguages.JP]: 'JP elem 1',
        },
      },
      {
        name: 'elem 2',
        code: 2,
        imagePath: 'elem/2.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT elem 2',
          [SupportedLanguages.EN]: 'EN elem 2',
          [SupportedLanguages.JP]: 'JP elem 2',
        },
      },
    ],
  };
  const exBuffParams: ExBuffParams = {
    exBuffParam: [
      {
        name: 'ex 1',
        code: 1,
        imagePath: 'ex/1.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT ex 1',
          [SupportedLanguages.EN]: 'EN ex 1',
          [SupportedLanguages.JP]: 'JP ex 1',
        },
      },
      {
        name: 'ex 2',
        code: 2,
        imagePath: 'ex/2.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT ex 2',
          [SupportedLanguages.EN]: 'EN ex 2',
          [SupportedLanguages.JP]: 'JP ex 2',
        },
      },
    ],
    chainedExBuffParam: [
      {
        name: 'cex 1',
        code: 1,
        imagePath: 'cex/1.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT cex 1',
          [SupportedLanguages.EN]: 'EN cex 1',
          [SupportedLanguages.JP]: 'JP cex 1',
        },
      },
      {
        name: 'cex 2',
        code: 2,
        imagePath: 'cex/2.jpg',
        trans: {
          [SupportedLanguages.CHT]: 'CHT cex 2',
          [SupportedLanguages.EN]: 'EN cex 2',
          [SupportedLanguages.JP]: 'JP cex 2',
        },
      },
    ],
  };

  beforeEach(() => {
    setInputData = jest.fn().mockImplementation((newData) => inputData = newData);
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [],
      filterChainedExBuffParamCode: [],
    };
  });

  it('renders the filter section', async () => {
    renderReact(() => (
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />
    ));
  });

  it('can filter by element', async () => {
    renderReact(() => (
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />
    ));

    const elemCheck = screen.getByAltText('EN elem 1');
    userEvent.click(elemCheck);

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterElementCode).toStrictEqual([1]);
  });

  it('can filter by EX parameter', async () => {
    renderReact(() => (
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />
    ));

    const exCheck = screen.getByAltText('EN ex 1');
    userEvent.click(exCheck);

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterExBuffParamCode).toStrictEqual([1]);
  });

  it('can filter by CEX parameter', async () => {
    renderReact(() => (
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />
    ));

    const cexCheck = screen.getByAltText('EN cex 1');
    userEvent.click(cexCheck);

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterChainedExBuffParamCode).toStrictEqual([1]);
  });

  it('can filter by multiple conditions', async () => {
    const {rerender} = renderReact(() => (
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />
    ));

    const elemCheck = screen.getByAltText('EN elem 2');
    userEvent.click(elemCheck);
    rerender();
    const exCheck = screen.getByAltText('EN ex 1');
    userEvent.click(exCheck);
    rerender();
    const cexCheck = screen.getByAltText('EN cex 1');
    userEvent.click(cexCheck);
    rerender();

    expect(setInputData).toHaveBeenCalledTimes(3);
    expect(inputData.filterElementCode).toStrictEqual([2]);
    expect(inputData.filterExBuffParamCode).toStrictEqual([1]);
    expect(inputData.filterChainedExBuffParamCode).toStrictEqual([1]);
  });
});
