'use strict';

const { items, loadMods } = require('./utils');

module.exports = class WarframeMech {
  constructor(mech) {
    this.mech = (items.find((item) => item.uniqueName === mech.uniqueName))
      || mech;

    delete this.mech.patchlogs;
    delete this.mech.components;

    this.xp = mech.xp;
    this.polarized = mech.polarized;
    if (mech.skins) {
      this.cosmetics = mech.skins
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

    this.colors = mech.pricol;
    this.upgrades = loadMods(mech.upgrades);

    // ?? no idea what this is
    this.features = mech.features;
  }
};