'use strict';

const { items, loadMods } = require('./utils');

class WarframeParazon {
  constructor(parazon) {
    this.uniqueName = parazon.uniqueName;
    this.xp = parazon.xp;
    this.polarized = parazon.polarized;
    this.upgrades = loadMods(parazon.upgrades);
    if (parazon.cosmetics) {
      this.cosmetics = (parazon.skins || [])
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

    this.colors = parazon.pricol;
  }
}

module.exports = WarframeParazon;
