'use strict';

const { loadMods, mapColors, findItem } = require('./utils');

module.exports = class WarframeMech {
  constructor(mech) {
    this.mech = findItem(mech.uniqueName) || mech;

    delete this.mech.patchlogs;
    delete this.mech.components;

    this.xp = mech.xp;
    this.polarized = mech.polarized;
    if (mech.skins) {
      this.cosmetics = mech.skins
        .filter((cosmetic) => cosmetic)
        .map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);

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
      primary: mapColors(mech.pricol),
      sigil: mapColors(mech.sigcol),
      attachments: mapColors(mech.attcol),
    };
    this.upgrades = loadMods(mech.upgrades);

    // ?? no idea what this is
    this.features = mech.features;
  }
};
