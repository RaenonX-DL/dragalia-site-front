import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from '../in/types';
import {filterExAbilityData} from './utils';

const inputDataTemplate: InputData = {
  filterElementCode: [],
  filterExBuffParamCode: [],
  filterChainedExBuffParamCode: [],
};

describe('(chained) ex ability filtering function', () => {
  test('ex ability resource loadable', async () => {
    await ResourceLoader.getAbilityEx((data) => data)
      .then((data) => {
        expect(data.length).toBeGreaterThan(0);
      });
  });

  test('empty filter returns all data', async () => {
    await ResourceLoader.getAbilityEx((data) => data)
      .then((data) => {
        data = filterExAbilityData(data, inputDataTemplate);
        expect(data.length).toBeGreaterThan(0);
      });
  });

  test('ex ability can be filtered by element', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumElements(), exAbilityData()])
      .then(([elemEnums, data]) => {
        elemEnums.elemental.forEach((elemEnum) => {
          const elemEnumCode = elemEnum.code;

          const dataFiltered = filterExAbilityData(data, {...inputDataTemplate, filterElementCode: [elemEnumCode]});
          expect(dataFiltered.length).toBeGreaterThan(0);
          expect(dataFiltered.map((entry) => entry.chara.element === elemEnumCode)).not.toContain(false);
        });
      });
  });

  test('ex ability can be filtered by buff parameter', async () => {
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        exBuffParams.exBuffParam.forEach((exBuffParam) => {
          const exBuffParamCode = exBuffParam.code;

          const dataFiltered = filterExAbilityData(data, {
            ...inputDataTemplate,
            filterExBuffParamCode: [exBuffParamCode],
          });
          expect(dataFiltered.map(
            (entry) => {
              return entry.ex.some((effectUnit) => effectUnit.parameter.code === exBuffParamCode);
            })).not.toContain(false);
        });
      });
  });

  test('ex ability can be filtered by buff param & element', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), enumElements(), exAbilityData()])
      .then(([exBuffParams, elemEnums, data]) => {
        exBuffParams.exBuffParam.forEach((exBuffParam) => {
          const exBuffParamCode = exBuffParam.code;

          elemEnums.elemental.forEach((elemEnum) => {
            const elemEnumCode = elemEnum.code;

            const dataFiltered = filterExAbilityData(data, {
              ...inputDataTemplate,
              filterExBuffParamCode: [exBuffParamCode],
              filterElementCode: [elemEnumCode],
            });
            expect(dataFiltered.map(
              (entry) => {
                return entry.ex.some((effectUnit) => {
                  return effectUnit.parameter.code === exBuffParamCode && entry.chara.element === elemEnumCode;
                });
              })).not.toContain(false);
          });
        });
      });
  });

  test('ex ability data filtered using OR logic', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumElements(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        const firstTwoElemCode = exBuffParams.elemental.slice(0, 2).map((entry) => entry.code);

        const dataFiltered = filterExAbilityData(data, {
          ...inputDataTemplate,
          filterElementCode: firstTwoElemCode,
        });
        expect(dataFiltered.map(
          (entry) => {
            return firstTwoElemCode.includes(entry.chara.element);
          })).not.toContain(false);
      });
  });

  test('chained ex ability can be filtered by buff parameter', async () => {
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        exBuffParams.chainedExBuffParam.forEach((cexBuffParam) => {
          const cexBuffParamCode = cexBuffParam.code;

          const dataFiltered = filterExAbilityData(data, {
            ...inputDataTemplate,
            filterChainedExBuffParamCode: [cexBuffParamCode],
          });
          expect(dataFiltered.map((entry) => {
            return entry.chainedEx.some((effectUnit) => effectUnit.parameter.code === cexBuffParamCode);
          })).not.toContain(false);
        });
      });
  });
});
