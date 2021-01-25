/**
 * Class for resource paths.
 */
export class ResourcePaths {
  static ROOT = process.env.REACT_APP_RESOURCE_ROOT;

  static ABILITY_DIR = ResourcePaths.ROOT + '/abilities';
  static ABILITY_EX = ResourcePaths.ABILITY_DIR + '/ex.json';

  static ENUMS_DIR = ResourcePaths.ROOT + '/enums';
  static ENUMS_BUFF_PARAM = ResourcePaths.ENUMS_DIR + '/buffParam.json';
  static ENUMS_CONDITIONS = ResourcePaths.ENUMS_DIR + '/conditions.json';
  static ENUMS_CONDITIONS_ALL = ResourcePaths.ENUMS_DIR + '/allCondition.json';
  static ENUMS_ELEMENTS = ResourcePaths.ENUMS_DIR + '/elements.json';
  static ENUMS_EX_PARAMS = ResourcePaths.ENUMS_DIR + '/exParam.json';

  static SKILLS_DIR = ResourcePaths.ROOT + '/skills';
  static SKILLS_ATK = ResourcePaths.SKILLS_DIR + '/attacking.json';
  static SKILLS_IDENTIFIERS = ResourcePaths.SKILLS_DIR + '/identifiers.json';

  static MISC_DIR = ResourcePaths.ROOT + '/misc';
  static MISC_ELEM_BONUS = ResourcePaths.MISC_DIR + '/elementBonus.json';
}


/**
 * Class for the data depot paths. Mostly used for obtaining the image.
 */
export class DepotPaths {
  static ROOT = process.env.REACT_APP_DEPOT_ROOT;

  /**
   * Get the URL of the image.
   *
   * @param {string} imagePath path of the image originated from the image directory
   * @return {string} URL of the image
   */
  static getImageURL(imagePath: string) {
    return `${DepotPaths.ROOT}/assets/_gluonresources/resources/images${imagePath}`;
  }

  /**
   * Get the large character icon URL.
   *
   * @param {string} imageName name of the image without the extension
   * @return {string} URL of the large character icon
   */
  static getCharaIconURL(imageName: string) {
    return `${DepotPaths.ROOT}/assets/_gluonresources/resources/images/icon/chara/l/${imageName}.png`;
  }

  /**
   * Get the affliction icon image URL.
   *
   * @param {string} statusIcon name of the status icon
   * @return {string} URL of the status icon image
   */
  static getAfflictionIconURL(statusIcon: string) {
    return `${DepotPaths.ROOT}/assets/_gluonresources/resources/images/icon/status/${statusIcon}.png`;
  }
}
