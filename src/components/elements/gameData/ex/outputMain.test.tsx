import {ResourceLoader} from '../../../../utils/services/resources';
import {InputData} from './inputSection';
import {filterExAbilityData} from './outputMain';

const inputDataTemplate: InputData = {
  filterElementCode: [],
  filterExBuffParamCode: [],
  filterChainedExBuffParamCode: [],
};

it('checks if the promise is returning data', async () => {
  await ResourceLoader.getAbilityEx((data) => data)
    .then((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
});

it('checks if all entries are returned when no filter is applicable', async () => {
  await ResourceLoader.getAbilityEx((data) => data)
    .then((data) => {
      data = filterExAbilityData(data, inputDataTemplate);
      expect(data.length).toBeGreaterThan(0);
    });
});

it('checks if elemental filtering is working correctly', async () => {
  const enumElements = () => ResourceLoader.getEnumElements();
  const exAbilityData = () => ResourceLoader.getAbilityEx();

  await Promise.all([enumElements(), exAbilityData()])
    .then(([elemEnums, data]) => {
      elemEnums.elemental.map((elemEnum) => {
        const elemEnumCode = elemEnum.code;

        const dataFiltered = filterExAbilityData(data, {...inputDataTemplate, filterElementCode: [elemEnumCode]});
        expect(dataFiltered.length).toBeGreaterThan(0);
        expect(dataFiltered.map((entry) => entry.chara.element === elemEnumCode)).not.toContain(false);
      });
    });
});

it('checks if EX ability buff parameter filtering is working correctly', async () => {
  const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
  const exAbilityData = () => ResourceLoader.getAbilityEx();

  await Promise.all([enumBuffParams(), exAbilityData()])
    .then(([exBuffParams, data]) => {
      exBuffParams.exBuffParam.map((exBuffParam) => {
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

it('checks if chained EX ability buff parameter filtering is working correctly', async () => {
  const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
  const exAbilityData = () => ResourceLoader.getAbilityEx();

  await Promise.all([enumBuffParams(), exAbilityData()])
    .then(([exBuffParams, data]) => {
      exBuffParams.chainedExBuffParam.map((cexBuffParam) => {
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

it('checks if elemental + EX ability buff parameter filtering gives the desired result', async () => {
  const enumElements = () => ResourceLoader.getEnumElements();
  const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
  const exAbilityData = () => ResourceLoader.getAbilityEx();

  await Promise.all([enumBuffParams(), enumElements(), exAbilityData()])
    .then(([exBuffParams, elemEnums, data]) => {
      exBuffParams.exBuffParam.map((exBuffParam) => {
        const exBuffParamCode = exBuffParam.code;

        elemEnums.elemental.map((elemEnum) => {
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

it('checks if two elemental conditions are provided, record that matches the either one returns', async () => {
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
