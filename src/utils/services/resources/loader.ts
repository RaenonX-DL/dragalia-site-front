import {
  AttackingSkillData,
  BuffParamEnums,
  CategorizedConditionEnums,
  CharaExAbilityDataEntry,
  CharaInfo,
  ConditionEnumMap,
  DragonInfo,
  ElementBonus,
  ElementEnums,
  ExBuffParams,
  ResourcePaths,
  SkillIdentifierInfo,
  StatusEnums,
  WeaponTypeEnums,
} from '../../../api-def/resources';


/**
 * Class to load the resources.
 */
export class ResourceLoader {
  // region Ability
  /**
   * Get the EX ability data of each playable character.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<Array<CharaExAbilityDataEntry>>} promise after the callback
   */
  static getAbilityEx(
    callback?: (exAbilityDataEntries: Array<CharaExAbilityDataEntry>) => void,
  ): Promise<Array<CharaExAbilityDataEntry>> {
    return ResourceLoader.fetchResources<Array<CharaExAbilityDataEntry>>(ResourcePaths.ABILITY_EX, callback);
  }

  // endregion

  // region Enums
  /**
   * Get the buff parameter enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<BuffParamEnums>} promise after the callback
   */
  static getEnumBuffParam(
    callback?: (categorizedConditionEnums: BuffParamEnums) => void,
  ): Promise<BuffParamEnums> {
    return ResourceLoader.fetchResources<BuffParamEnums>(ResourcePaths.ENUMS_BUFF_PARAM, callback);
  }

  /**
   * Get the categorized condition enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<CategorizedConditionEnums>} promise after the callback
   */
  static getEnumCategorizedConditions(
    callback?: (categorizedConditionEnums: CategorizedConditionEnums) => void,
  ): Promise<CategorizedConditionEnums> {
    return ResourceLoader.fetchResources<CategorizedConditionEnums>(ResourcePaths.ENUMS_CONDITIONS, callback);
  }

  /**
   * Get all condition enums (uncategorized).
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<ConditionEnumMap>} promise after the callback
   */
  static getEnumAllConditions(callback?: (allConditionEnums: ConditionEnumMap) => void): Promise<ConditionEnumMap> {
    return ResourceLoader.fetchResources<ConditionEnumMap>(ResourcePaths.ENUMS_CONDITIONS_ALL, callback);
  }

  /**
   * Get the element enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<ElementEnums>} promise after the callback
   */
  static getEnumElements(callback?: (elementEnums: ElementEnums) => void): Promise<ElementEnums> {
    return ResourceLoader.fetchResources<ElementEnums>(ResourcePaths.ENUMS_ELEMENTS, callback);
  }

  /**
   * Get affliction status enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<WeaponTypeEnums>} promise after the callback
   */
  static getEnumAfflictionStatus(callback?: (weaponTypeEnums: StatusEnums) => void): Promise<StatusEnums> {
    return ResourceLoader.fetchResources<StatusEnums>(ResourcePaths.ENUMS_STATUS, callback);
  }

  /**
   * Get the weapon type enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<WeaponTypeEnums>} promise after the callback
   */
  static getEnumWeaponTypes(callback?: (weaponTypeEnums: WeaponTypeEnums) => void): Promise<WeaponTypeEnums> {
    return ResourceLoader.fetchResources<WeaponTypeEnums>(ResourcePaths.ENUMS_WEAPON_TYPES, callback);
  }

  /**
   * Get the EX/CEX buff parameter enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<ExBuffParams>} promise after the callback
   */
  static getEnumExBuffParameters(
    callback?: (categorizedConditionEnums: ExBuffParams) => void,
  ): Promise<ExBuffParams> {
    return ResourceLoader.fetchResources<ExBuffParams>(ResourcePaths.ENUMS_EX_PARAMS, callback);
  }

  // endregion

  // region Skill data
  /**
   * Get the attacking skill entry data.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<Array<AttackingSkillData>>} promise after the callback
   */
  static getAttackingSkillEntries(
    callback?: (attackingSkillData: Array<AttackingSkillData>) => void,
  ): Promise<Array<AttackingSkillData>> {
    return ResourceLoader.fetchResources<Array<AttackingSkillData>>(ResourcePaths.SKILLS_ATK, callback);
  }

  /**
   * Get the skill identifier info.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<Array<AttackingSkillData>>} promise after the callback
   */
  static getSkillIdentifierInfo(
    callback?: (skillIdentifierInfo: SkillIdentifierInfo) => void,
  ): Promise<SkillIdentifierInfo> {
    return ResourceLoader.fetchResources<SkillIdentifierInfo>(ResourcePaths.SKILLS_IDENTIFIERS, callback);
  }

  // endregion

  // region Unit info
  /**
   * Get the character info data.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<CharaInfo>} promise after the callback
   */
  static getCharacterInfo(callback?: (elementBonusData: CharaInfo) => void): Promise<CharaInfo> {
    return ResourceLoader.fetchResources<CharaInfo>(ResourcePaths.INFO_CHARA, callback);
  }

  /**
   * Get the dragon info data.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<DragonInfo>} promise after the callback
   */
  static getDragonInfo(callback?: (elementBonusData: DragonInfo) => void): Promise<DragonInfo> {
    return ResourceLoader.fetchResources<DragonInfo>(ResourcePaths.INFO_DRAGON, callback);
  }

  // endregion

  // region Misc
  /**
   * Get the element bonus data.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<ElementBonus>} promise after the callback
   */
  static getElementBonusData(callback?: (elementBonusData: ElementBonus) => void): Promise<ElementBonus> {
    return ResourceLoader.fetchResources<ElementBonus>(ResourcePaths.MISC_ELEM_BONUS, callback);
  }

  // endregion

  /**
   * Fetch the resource, execute the callback function, then return its promise.
   *
   * @param {string} resourceUrl URL of the resource
   * @function
   * @param {function} callback function to be called after fetching the resource
   * @return {Promise<T>} a promise after executing the callback
   */
  private static fetchResources<T>(resourceUrl: string, callback?: (resource: T) => void): Promise<T> {
    return fetch(resourceUrl)
      .then((response) => response.json())
      .then((data: T) => {
        if (callback) {
          callback(data);
        }
        return data;
      });
  }
}
