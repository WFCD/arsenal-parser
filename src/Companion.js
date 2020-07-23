'use strict';

const { items, loadMods } = require('./utils');

class WarframeCompanion {
  constructor(companion) {
    this.companion = (items.find((item) => item.uniqueName === companion.uniqueName));
    if (this.companion) delete this.companion.patchlogs;

    this.xp = companion.xp;
    this.polarized = companion.polarized;
    if (companion.skins) {
      this.cosmetics = companion.skins
        .map((cosmetic) => (items.find((item) => item.uniqueName === cosmetic.uniqueName)));
    }
    this.colors = companion.pricol;
    this.upgrades = loadMods(companion.upgrades);
    this.type = companion.type;
    if (companion.itemName) this.name = companion.itemName;
  }
}

module.exports = WarframeCompanion;
