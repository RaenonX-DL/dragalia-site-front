import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath, PostPath, UnitPath} from '../../const/path/definitions';
import {makeGeneralUrl, makePostUrl, makeUnitUrl} from './make';


describe('Path makers', () => {
  it('makes general URL', () => {
    const postUrl = makeGeneralUrl(GeneralPath.ABOUT, {lang: SupportedLanguages.CHT});

    expect(postUrl).toBe('/cht/about');
  });

  it('makes post URL', () => {
    const postUrl = makePostUrl(PostPath.ANALYSIS, {pid: 10950101, lang: SupportedLanguages.CHT});

    expect(postUrl).toBe('/cht/analysis/10950101');
  });

  it('makes unit URL', () => {
    const unitUrl = makeUnitUrl(UnitPath.UNIT_INFO, {id: 10950101, lang: SupportedLanguages.CHT});

    expect(unitUrl).toBe('/cht/info/10950101');
  });
});
