import {SubscriptionKey, SupportedLanguages, UnitType} from '../../api-def/api';
import {Element, Weapon} from '../../api-def/resources';
import {isCi, isProduction} from '../../api-def/utils';
import {InputData as ExInputData} from '../../components/pages/gameData/ex/in/types';
import {InputData as AtkInputData} from '../../components/pages/gameData/skillAtk/in/types';
import {InputData as UnitInfoInput} from '../../components/pages/gameData/unitInfo/lookup/in/types';


enum GAEvent {
  LANG_CHANGE = 'lang_change',
  DAMAGE_CALCULATOR = 'damage_calc',
  ABILITY_SEARCH = 'ability_search',
  ANALYSIS_LOOKUP = 'analysis_lookup',
  OPEN_IMAGE = 'open_image',
  LOAD_INPUT_PRESET = 'load_preset',
  SUBSCRIPTION_CHANGE = 'subscription_change',
}

enum GAParameter {
  UNIT_TYPE = 'unit_type',
  ELEM_FLAME = 'elem_flame',
  ELEM_WATER = 'elem_water',
  ELEM_WIND = 'elem_wind',
  ELEM_LIGHT = 'elem_light',
  ELEM_SHADOW = 'elem_shadow',
  WEAPON_SWORD = 'weapon_sword',
  WEAPON_BLADE = 'weapon_blade',
  WEAPON_DAGGER = 'weapon_dagger',
  WEAPON_AXE = 'weapon_axe',
  WEAPON_LANCE = 'weapon_lance',
  WEAPON_BOW = 'weapon_bow',
  WEAPON_WAND = 'weapon_wand',
  WEAPON_STAFF = 'weapon_staff',
  WEAPON_MANACASTER = 'weapon_manacaster',
  PRESET_TYPE = 'preset_type',
  SUBSCRIPTION_UPDATE_TYPE = 'subscription_update_type',
  SUBSCRIPTION_KEYS = 'subscription_keys',
}

/**
 * Class for sending GA events.
 */
export class GoogleAnalytics {
  /**
   * Record the event of switching the language.
   *
   * @param {string} oldLang old language
   * @param {SupportedLanguages} newLang new language
   */
  static languageChange(oldLang: string, newLang: SupportedLanguages) {
    GoogleAnalytics.sendEvent(
      GAEvent.LANG_CHANGE,
      {
        'old': oldLang,
        'new': newLang,
      },
    );
  }

  /**
   * Record the event of a user performed a search using damage calculator.
   *
   * @param {string} action action performed on the damage calculator
   * @param {InputData} inputData data input used for calculating the damage
   */
  static damageCalc(action: 'search', inputData: AtkInputData) {
    GoogleAnalytics.sendEvent(
      GAEvent.DAMAGE_CALCULATOR,
      {
        'action': action,
        ...inputData,
      },
    );
  }

  /**
   * Record the event of an user performed an ability search.
   *
   * @param {string} action action performed of the ability search
   * @param {InputData} inputData data input used for searching the ability
   */
  static abilitySearch(action: 'EX' | 'Character' | 'Wyrmprint', inputData: ExInputData) {
    GoogleAnalytics.sendEvent(
      GAEvent.ABILITY_SEARCH,
      {
        'action': action,
        ...inputData,
      },
    );
  }

  /**
   * Record the event of an analysis lookup.
   *
   * @param {UnitInfoInput} inputData input used to perform an analysis lookup
   */
  static analysisLookup(inputData: UnitInfoInput) {
    GoogleAnalytics.sendEvent(
      GAEvent.ANALYSIS_LOOKUP,
      {
        'keyword': inputData.keyword,
        [GAParameter.UNIT_TYPE]: UnitType[inputData.type],
        [GAParameter.ELEM_FLAME]: inputData.elements.includes(Element.FLAME),
        [GAParameter.ELEM_WATER]: inputData.elements.includes(Element.WATER),
        [GAParameter.ELEM_WIND]: inputData.elements.includes(Element.WIND),
        [GAParameter.ELEM_LIGHT]: inputData.elements.includes(Element.LIGHT),
        [GAParameter.ELEM_SHADOW]: inputData.elements.includes(Element.SHADOW),
        [GAParameter.WEAPON_SWORD]: inputData.weaponTypes.includes(Weapon.SWORD),
        [GAParameter.WEAPON_BLADE]: inputData.weaponTypes.includes(Weapon.BLADE),
        [GAParameter.WEAPON_DAGGER]: inputData.weaponTypes.includes(Weapon.DAGGER),
        [GAParameter.WEAPON_AXE]: inputData.weaponTypes.includes(Weapon.AXE),
        [GAParameter.WEAPON_LANCE]: inputData.weaponTypes.includes(Weapon.LANCE),
        [GAParameter.WEAPON_BOW]: inputData.weaponTypes.includes(Weapon.BOW),
        [GAParameter.WEAPON_WAND]: inputData.weaponTypes.includes(Weapon.WAND),
        [GAParameter.WEAPON_STAFF]: inputData.weaponTypes.includes(Weapon.STAFF),
        [GAParameter.WEAPON_MANACASTER]: inputData.weaponTypes.includes(Weapon.MANACASTER),
      },
    );
  }

  /**
   * Record that an image has been click to show.
   *
   * @param {string} imageUrl URL of the image
   */
  static showImage(imageUrl: string) {
    GoogleAnalytics.sendEvent(
      GAEvent.OPEN_IMAGE,
      {
        'image_url': imageUrl,
      },
    );
  }

  /**
   * Record that an input preset has been loaded.
   *
   * @param {string} type type of the preset loaded
   */
  static presetLoaded(type: 'atkSkill') {
    GoogleAnalytics.sendEvent(
      GAEvent.LOAD_INPUT_PRESET,
      {
        [GAParameter.PRESET_TYPE]: type,
      },
    );
  }

  /**
   * Record that a user attempted to change their subscription preference.
   *
   * @param {string} type update type
   * @param {SubscriptionKey | SubscriptionKey[]} keys subscription key(s)
   */
  static subscriptionUpdate(type: 'add' | 'remove' | 'update', keys: SubscriptionKey | SubscriptionKey[]) {
    GoogleAnalytics.sendEvent(
      GAEvent.SUBSCRIPTION_CHANGE,
      {
        [GAParameter.SUBSCRIPTION_UPDATE_TYPE]: type,
        [GAParameter.SUBSCRIPTION_KEYS]: keys,
      },
    );
  }

  /**
   * Send a Google Analytics event via gtag.js.
   *
   * @param {string} eventName name of the event
   * @param {Object} parameters parameters of the event
   */
  private static sendEvent(eventName: string, parameters: {[key in string]: any}) {
    if (!isCi()) {
      console.debug(eventName, parameters);
    }

    // Do not send GA event if is CI or not production (CI & production might be true at the same time)
    // - On Azure pipeline, for improving testing result accuracy
    if (isCi() || !isProduction()) {
      return;
    }

    if ((window as any).gtag) {
      // Defined in entry point
      // @ts-ignore
      window.gtag('event', eventName, parameters);
    }
  }
}
