'use strict';

const { items, loadMods, mapColors } = require('./utils');

class WarframeCompanion {
  constructor(companion) {
    this.companion = (items.find((item) => item.uniqueName === companion.uniqueName))
          || companion;
    delete this.companion.patchlogs;
    delete this.companion.components;

    this.xp = companion.xp;
    this.polarized = companion.polarized;
    if (companion.skins) {
      this.cosmetics = companion.skins
        .map((cosmetic) => (items.find((item) => item.uniqueName === cosmetic.uniqueName))
                 || cosmetic);

      this.cosmetics.forEach((cosmetic) => {
        /* eslint-disable no-param-reassign */
        delete cosmetic.components;
        delete cosmetic.patchlogs;
        delete cosmetic.tradable;
        delete cosmetic.buildPrice;
        delete cosmetic.buildTime;
        delete cosmetic.skipBuildTimePrice;
        delete cosmetic.buildQuantity;
        delete cosmetic.consumeOnBuild;
      });
    }
    this.colors = {
      primary: mapColors(companion.pricol),
      attachments: mapColors(companion.attcol),
    };
    this.upgrades = loadMods(companion.upgrades);
    this.type = companion.type;
    if (companion.itemName) this.name = companion.itemName;
  }
}

module.exports = WarframeCompanion;
