import {overrideObject} from './override';


describe('Object override utils', () => {
  it('overrides single-level object', async () => {
    const original = {
      a: 1,
      b: 2,
      c: 3,
    };
    const overridden = overrideObject(original, {b: 4});

    expect(overridden).toStrictEqual({a: 1, b: 4, c: 3});
  });

  it('overrides multi-level object', async () => {
    const original = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 5,
        f: 6,
      },
    };
    const overridden = overrideObject(original, {b: 4, d: {e: 8}});

    expect(overridden).toStrictEqual({a: 1, b: 4, c: 3, d: {e: 8, f: 6}});
  });

  it('overrides array object', async () => {
    const original = {
      a: [1],
      b: [3],
    };
    const overridden = overrideObject(original, {a: [2]});

    expect(overridden.a).toStrictEqual([2]);
    expect(overridden.b).toStrictEqual([3]);
  });

  it('returns original if override not provided', async () => {
    const original = {
      a: [1],
      b: [3],
    };
    const overridden = overrideObject(original, undefined);

    expect(overridden).toStrictEqual({
      a: [1],
      b: [3],
    });
  });

  it('overrides `null` or `undefined`', async () => {
    const original: {a: null | number, b: undefined | number} = {
      a: null,
      b: undefined,
    };
    const overridden = overrideObject(original, {a: 5, b: 7});

    expect(overridden).toStrictEqual({a: 5, b: 7});
  });

  it('overrides to `null`', async () => {
    const original: {a: null | number} = {a: 5};
    const overridden = overrideObject(original, {a: null});

    expect(overridden).toStrictEqual({a: null});
  });

  it('overrides with nested object', async () => {
    const original: {a: {[ID in number]: string}} = {a: {}};
    const overridden = overrideObject(original, {a: {7: 'a'}});

    expect(overridden).toStrictEqual({a: {7: 'a'}});
  });

  it('adds new property if existed in `original` but not `override`', async () => {
    const original: {a: number, b?: number} = {a: 7};
    const overridden = overrideObject(original, {b: 3});

    expect(overridden).toStrictEqual({a: 7, b: 3});
  });
});
