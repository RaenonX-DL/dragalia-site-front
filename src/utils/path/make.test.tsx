import {SupportedLanguages} from '../../api-def/api';
import {PostPath, UnitPath} from '../../const/path/definitions';
import {makePostPath, makeUnitPath} from './make';


describe('Path makers', () => {
  it('makes post path', () => {
    const postPath = makePostPath(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.CHT});

    expect(postPath).toBe('/cht/analysis/10950101');
  });

  it('makes unit path', () => {
    const unitPath = makeUnitPath(UnitPath.UNIT_INFO, {id: 10950101, lang: SupportedLanguages.CHT});

    expect(unitPath).toBe('/cht/info/10950101');
  });
});
