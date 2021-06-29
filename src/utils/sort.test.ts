import {sortAscending, sortDescending} from './sort';


describe('Sorter functions', () => {
  type ArrayElement = {
    val: number,
  };

  const array: Array<ArrayElement> = [
    {val: 0},
    {val: 1},
    {val: 0},
    {val: 3},
  ];

  it('sorts ASC', async () => {
    const arr = array.sort(sortAscending({getComparer: (element) => element.val}))
      .map((element) => element.val);

    expect(arr).toStrictEqual([0, 0, 1, 3]);
  });

  it('sorts DESC', async () => {
    const arr = array.sort(sortDescending({getComparer: (element) => element.val}))
      .map((element) => element.val);

    expect(arr).toStrictEqual([3, 1, 0, 0]);
  });

  it('sorts ASC and put elements to last', async () => {
    const arr = array.sort(sortAscending({
      getComparer: (element) => element.val,
      isToPutLast: (element) => element.val === 0,
    }))
      .map((element) => element.val);

    expect(arr).toStrictEqual([1, 3, 0, 0]);
  });

  it('sorts DESC and put elements to last', async () => {
    const arr = array.sort(sortDescending({
      getComparer: (element) => element.val,
      isToPutLast: (element) => element.val === 3,
    }))
      .map((element) => element.val);

    expect(arr).toStrictEqual([1, 0, 0, 3]);
  });
});
