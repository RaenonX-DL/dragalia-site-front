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
});
