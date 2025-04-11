import { find } from '@wfcd/items/utilities';
import { translateFocus } from 'warframe-worldstate-data/utilities';

const { findItem } = find;
export default /** Warframe Player information */ class WarframePlayer {
  /**
   * Player name
   * @type {string}
   */
  #name;
  /**
   * Player mastery rank
   * @type {number}
   */
  #masteryRank;
  /**
   * Last updated date/time
   * @type {Date}
   */
  #lastUpdated;
  /**
   * Glyph item
   * @type {Item}
   */
  #glyph;
  /**
   * Currently selected focus school
   * @type {string}
   */
  #focusSchool;

  constructor(data) {
    this.#name = data.playerName;
    this.#masteryRank = data.masteryRank;
    this.#lastUpdated = new Date(data.lastUpdated * 1000);
    this.#glyph = findItem(data.glyph) || data.glyph;
    this.#focusSchool = translateFocus(data.focus || '');
  }

  /**
   * Player name
   * @returns {string}
   */
  get name() {
    return this.#name;
  }
  /**
   * Player mastery rank
   * @returns {number}
   */
  get masteryRank() {
    return this.#masteryRank;
  }
  /**
   * Last updated date/time
   * @returns {Date}
   */
  get lastUpdated() {
    return this.#lastUpdated;
  }
  /**
   * Glyph item
   * @returns {Item}
   */
  get glyph() {
    return this.#glyph;
  }
  /**
   * Currently selected focus school
   * @returns {string}
   */
  get focusSchool() {
    return this.#focusSchool;
  }

  toJSON() {
    return {
      name: this.#name,
      masteryRank: this.#masteryRank,
      lastUpdated: this.#lastUpdated,
      glyph: this.#glyph,
      focusSchool: this.#focusSchool,
    };
  }
}
