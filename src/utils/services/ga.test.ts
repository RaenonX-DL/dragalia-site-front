import {UnitType} from '../../api-def/api/other/unit';
import {GoogleAnalytics} from './ga';


describe('Google Analytics event sender', () => {
  let fnSendEvent: jest.SpyInstance;

  beforeEach(() => {
    fnSendEvent = jest.spyOn(GoogleAnalytics as any, 'sendEvent');
  });

  it('sends analysis lookup event correctly', async () => {
    GoogleAnalytics.analysisLookup({
      type: UnitType.CHARACTER,
      elements: [1, 2],
      weaponTypes: [4, 5],
      keyword: 'A',
      sortBy: 'unitId',
    });

    expect(fnSendEvent).toHaveBeenCalledWith(
      'analysis_lookup',
      {
        unit_type: 'CHARACTER',
        elem_flame: true,
        elem_water: true,
        elem_wind: false,
        elem_light: false,
        elem_shadow: false,
        weapon_sword: false,
        weapon_blade: false,
        weapon_dagger: false,
        weapon_axe: true,
        weapon_lance: true,
        weapon_bow: false,
        weapon_wand: false,
        weapon_staff: false,
        weapon_manacaster: false,
        keyword: 'A',
      },
    );
  });
});
