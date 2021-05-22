export type ElementBonus = Record<string, Record<string, number>>;


/**
 * Class for handling the element bonus data.
 */
export class ElementBonusData {
  data: ElementBonus

  /**
   * Construct an element bonus data controller.
   *
   * @param {ElementBonus} data element bonus data
   */
  constructor(data: ElementBonus = {}) {
    this.data = data;
  }

  /**
   * Get the element bonus of the user attacking the target.
   *
   * @param {string} userElementCodeStr user element code in string
   * @param {string} targetConditionCodeStr target elemental condition code in string
   * @return {number} element bonus of the user attacks the target
   */
  getElementBonus(userElementCodeStr: string, targetConditionCodeStr: string): number {
    return this.data[userElementCodeStr][targetConditionCodeStr] || parseFloat('nan');
  }
}
