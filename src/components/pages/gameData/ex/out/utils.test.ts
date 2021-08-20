import {ResourceLoader} from '../../../../../utils/services/resources';
import {InputData} from '../in/types';
import {generateInputData, overrideInputData} from '../in/utils';
import {filterExAbilityData} from './utils';


describe('(chained) ex ability filtering function', () => {
  const inputDataTemplate: InputData = generateInputData();

  it('loads ex ability resource', async () => {
    await ResourceLoader.getAbilityEx((data) => data)
      .then((data) => {
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('returns all data if the filter is empty', async () => {
    await ResourceLoader.getAbilityEx((data) => data)
      .then((data) => {
        data = filterExAbilityData(data, inputDataTemplate);
        expect(data.length).toBeGreaterThan(0);
      });
  });

  it('filters ability using element', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumElements(), exAbilityData()])
      .then(([elemEnums, data]) => {
        elemEnums.elemental.forEach((elemEnum) => {
          const elemEnumCode = elemEnum.code;

          const dataFiltered = filterExAbilityData(
            data,
            overrideInputData(inputDataTemplate, {filter: {elements: [elemEnumCode]}}),
          );
          expect(dataFiltered.length).toBeGreaterThan(0);
          expect(dataFiltered.map((entry) => entry.chara.element === elemEnumCode)).not.toContain(false);
        });
      });
  });

  it('filters using EX buff parameter', async () => {
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        exBuffParams.exBuffParam.forEach((exBuffParam) => {
          const exBuffParamCode = exBuffParam.code;

          const dataFiltered = filterExAbilityData(
            data,
            overrideInputData(inputDataTemplate, {filter: {exBuffParams: [exBuffParamCode]}}),
          );
          expect(dataFiltered.map(
            (entry) => {
              return entry.ex.some((effectUnit) => effectUnit.parameter.code === exBuffParamCode);
            })).not.toContain(false);
        });
      });
  });

  it('filters using EX buff param & element', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), enumElements(), exAbilityData()])
      .then(([exBuffParams, elemEnums, data]) => {
        exBuffParams.exBuffParam.forEach((exBuffParam) => {
          const exBuffParamCode = exBuffParam.code;

          elemEnums.elemental.forEach((elemEnum) => {
            const elemEnumCode = elemEnum.code;

            const dataFiltered = filterExAbilityData(
              data,
              overrideInputData(
                inputDataTemplate,
                {filter: {exBuffParams: [exBuffParamCode], elements: [elemEnumCode]}},
              ),
            );
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

  it('filters ex ability using OR logic', async () => {
    const enumElements = () => ResourceLoader.getEnumElements();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumElements(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        const firstTwoElemCode = exBuffParams.elemental.slice(0, 2).map((entry) => entry.code);

        const dataFiltered = filterExAbilityData(
          data,
          overrideInputData(inputDataTemplate, {filter: {elements: firstTwoElemCode}}),
        );
        expect(dataFiltered.map(
          (entry) => {
            return firstTwoElemCode.includes(entry.chara.element);
          })).not.toContain(false);
      });
  });

  it('filters ex ability by CEX buff parameter', async () => {
    const enumBuffParams = () => ResourceLoader.getEnumExBuffParameters();
    const exAbilityData = () => ResourceLoader.getAbilityEx();

    await Promise.all([enumBuffParams(), exAbilityData()])
      .then(([exBuffParams, data]) => {
        exBuffParams.chainedExBuffParam.forEach((cexBuffParam) => {
          const cexBuffParamCode = cexBuffParam.code;

          const dataFiltered = filterExAbilityData(
            data,
            overrideInputData(inputDataTemplate, {filter: {cexBuffParams: [cexBuffParamCode]}}),
          );
          expect(dataFiltered.map((entry) => {
            return entry.chainedEx.some((effectUnit) => effectUnit.parameter.code === cexBuffParamCode);
          })).not.toContain(false);
        });
      });
  });
});
