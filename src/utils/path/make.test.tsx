import {SupportedLanguages} from '../../api-def/api';
import {PostPath, UnitPath} from '../../const/path/definitions';
import {makePostUrl, makeUnitUrl} from './make';


describe('Path makers', () => {
  it('makes post path', () => {
    const postUrl = makePostUrl(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.CHT});

    expect(postUrl).toBe('/cht/analysis/10950101');
  });

  it('makes unit path', () => {
    const unitUrl = makeUnitUrl(UnitPath.UNIT_INFO, {id: 10950101, lang: SupportedLanguages.CHT});

    expect(unitUrl).toBe('/cht/info/10950101');
  });
});
