import { find, colors } from 'warframe-items/utilities';

const { findItem, loadMods } = find;
const { mapColors } = colors;

export default class WarframeArchwing {
  constructor(archwing) {
    this.archwing = findItem(archwing.uniqueName) || archwing;
    delete this.archwing.components;
    delete this.archwing.patchlogs;
    this.xp = archwing.xp;
    this.polarized = archwing.polarized;
    this.upgrades = loadMods(archwing.upgrades);

    this.colors = {
      primary: mapColors(archwing.pricol),
      attachments: mapColors(archwing.attcol),
    };
  }
}
