import type { Item } from '@wfcd/items';
import { find } from '@wfcd/items/utilities';
import { translateFocus } from 'warframe-worldstate-data/utilities';

const { findItem } = find;

export interface PlayerInformation {
  playerName: string;
  masteryRank: number;
  lastUpdated: number;
  glyph: string;
  title: string;
  focus: string;
}

/** Warframe Player information */
export default class WarframePlayer {
  /**
   * Player name
   */
  name: string;

  /**
   * Player mastery rank
   */
  masteryRank: number;

  /**
   * Last updated date/time
   */
  lastUpdated: Date;

  /**
   * Glyph item
   */
  glyph: Item | string;

  /**
   * Currently selected focus school
   */
  focusSchool: string;

  constructor(data: PlayerInformation) {
    this.name = data.playerName;
    this.masteryRank = data.masteryRank;
    this.lastUpdated = new Date(data.lastUpdated * 1000);
    this.glyph = findItem(data.glyph) || data.glyph;
    this.focusSchool = translateFocus(data.focus || '');
  }
}
