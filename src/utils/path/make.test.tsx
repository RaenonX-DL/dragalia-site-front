import {PostPath} from '../../const/path/definitions';
import {makePostPath} from './make';

describe('Path makers', () => {
  it('makes post path', () => {
    const postPath = makePostPath(PostPath.ANALYSIS, {pid: 10950101});

    expect(postPath).toBe('/analysis/10950101');
  });
});
