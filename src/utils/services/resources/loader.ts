import {ResourcePaths} from './paths';
import {AllConditionEnums, CategorizedConditionEnums, ElementEnums} from './types/enums';
import {ElementBonus} from './types/misc';
import {AttackingSkillData} from './types/skill';

/**
 * Class to load the resources.
 */
export class ResourceLoader {
  // region Enums
  /**
   * Get the categorized condition enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<Array<CategorizedConditionEnums>>} promise after the callback
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
   * @return {Promise<Array<CategorizedConditionEnums>>} promise after the callback
   */
  static getEnumAllConditions(callback?: (allConditionEnums: AllConditionEnums) => void): Promise<AllConditionEnums> {
    return ResourceLoader.fetchResources<AllConditionEnums>(ResourcePaths.ENUMS_CONDITIONS_ALL, callback);
  }

  /**
   * Get the element enums.
   *
   * @function
   * @param {function?} callback function to be called after fetching the resource
   * @return {Promise<Array<ElementEnums>>} promise after the callback
   */
  static getEnumElements(callback?: (elementEnums: ElementEnums) => void): Promise<ElementEnums> {
    return ResourceLoader.fetchResources<ElementEnums>(ResourcePaths.ENUMS_ELEMENTS, callback);
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
