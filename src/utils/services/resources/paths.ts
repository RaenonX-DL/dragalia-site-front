/**
 * Class for resource paths.
 */
export class ResourcePaths {
  static ROOT = process.env.REACT_APP_RESOURCE_ROOT;

  static ENUMS_DIR = ResourcePaths.ROOT + '/enums';
  static ENUMS_CONDITIONS = ResourcePaths.ENUMS_DIR + '/conditions.json';
  static ENUMS_ELEMENTS = ResourcePaths.ENUMS_DIR + '/elements.json';

  static SKILLS_DIR = ResourcePaths.ROOT + '/skills';
  static SKILLS_ATK = ResourcePaths.SKILLS_DIR + '/attacking.json';

  static MISC_DIR = ResourcePaths.ROOT + '/misc';
  static MISC_ELEM_BONUS = ResourcePaths.MISC_DIR + '/elementBonus.json';
}


/**
 * Class for the data depot paths. Mostly used for obtaining the image.
 */
export class DepotPaths {
  static ROOT = process.env.REACT_APP_DEPOT_ROOT;

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
