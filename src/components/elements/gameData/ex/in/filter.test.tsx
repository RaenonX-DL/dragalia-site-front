import React from 'react';

import {renderMount} from '../../../../../../test/render/main';
import {SupportedLanguages} from '../../../../../api-def/api/other/lang';
import {ElementEnums, ExBuffParams} from '../../../../../utils/services/resources/types/enums';
import {EnumChecksBox} from '../../../common/enum/enumChecksBox';
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
  });

  it('renders the filter section', async () => {
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [],
      filterChainedExBuffParamCode: [],
    };

    const {app} = await renderMount(
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />,
    );

    expect(app.find(SectionFilter).exists()).toBeTruthy();
  });

  it('can filter by element', async () => {
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [],
      filterChainedExBuffParamCode: [],
    };

    const {app} = await renderMount(
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />,
    );

    const elemChecks = app.find(EnumChecksBox).at(0).find('input').at(0);
    expect(elemChecks.exists()).toBeTruthy();
    elemChecks.simulate('change', {target: {checked: true}});

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterElementCode).toStrictEqual([1]);
  });

  it('can filter by EX parameter', async () => {
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [],
      filterChainedExBuffParamCode: [],
    };

    const {app} = await renderMount(
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />,
    );

    const elemChecks = app.find(EnumChecksBox).at(1).find('input').at(0);
    expect(elemChecks.exists()).toBeTruthy();
    elemChecks.simulate('change', {target: {checked: true}});

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterExBuffParamCode).toStrictEqual([1]);
  });

  it('can filter by CEX parameter', async () => {
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [],
      filterChainedExBuffParamCode: [],
    };

    const {app} = await renderMount(
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />,
    );

    const elemChecks = app.find(EnumChecksBox).at(2).find('input').at(0);
    expect(elemChecks.exists()).toBeTruthy();
    elemChecks.simulate('change', {target: {checked: true}});

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterChainedExBuffParamCode).toStrictEqual([1]);
  });

  it('can filter by multiple conditions', async () => {
    inputData = {
      filterElementCode: [],
      filterExBuffParamCode: [1],
      filterChainedExBuffParamCode: [1],
    };

    const {app} = await renderMount(
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        elementEnums={elementEnums}
        exBuffParams={exBuffParams}
      />,
    );

    const elemChecks = app.find(EnumChecksBox).at(0).find('input').at(1);
    expect(elemChecks.exists()).toBeTruthy();
    elemChecks.simulate('change', {target: {checked: true}});

    expect(setInputData).toHaveBeenCalledTimes(1);
    expect(inputData.filterElementCode).toStrictEqual([2]);
    expect(inputData.filterExBuffParamCode).toStrictEqual([1]);
    expect(inputData.filterChainedExBuffParamCode).toStrictEqual([1]);
  });
});
