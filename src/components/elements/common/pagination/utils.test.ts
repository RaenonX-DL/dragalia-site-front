import {SpecialKey} from './types';
import {getValidNewPage, pageToStartIdx, startIdxToPage} from './utils';

describe('Pagination utils', () => {
  test('get valid of first at first', () => {
    expect(getValidNewPage(SpecialKey.FIRST, 1, 10)).toBe(1);
  });

  test('get valid of first not at first', () => {
    expect(getValidNewPage(SpecialKey.FIRST, 3, 10)).toBe(1);
  });

  test('get valid of prev at first', () => {
    expect(getValidNewPage(SpecialKey.PREV, 1, 10)).toBe(1);
  });

  test('get valid of prev not at first', () => {
    expect(getValidNewPage(SpecialKey.PREV, 3, 10)).toBe(2);
  });

  test('get valid of next at max', () => {
    expect(getValidNewPage(SpecialKey.NEXT, 10, 10)).toBe(10);
  });

  test('get valid of next not at max', () => {
    expect(getValidNewPage(SpecialKey.NEXT, 3, 10)).toBe(4);
  });

  test('get valid of last at max', () => {
    expect(getValidNewPage(SpecialKey.LAST, 10, 10)).toBe(10);
  });

  test('get valid of last not at max', () => {
    expect(getValidNewPage(SpecialKey.LAST, 3, 10)).toBe(10);
  });

  test('page of start at 0, limit 25', () => {
    expect(startIdxToPage(0, 25)).toBe(1);
  });

  test('page of start at 10, limit 25', () => {
    expect(startIdxToPage(10, 25)).toBe(1);
  });

  test('page of start at 24, limit 25', () => {
    expect(startIdxToPage(24, 25)).toBe(1);
  });

  test('page of start at 25, limit 25', () => {
    expect(startIdxToPage(25, 25)).toBe(2);
  });

  test('page of start at 3, limit 1', () => {
    expect(startIdxToPage(3, 1)).toBe(4);
  });

  test('start index of page 1, limit 25', () => {
    expect(pageToStartIdx(1, 25)).toBe(0);
  });

  test('start index of page 2, limit 25', () => {
    expect(pageToStartIdx(2, 25)).toBe(25);
  });
});
