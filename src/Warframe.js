'use strict';

const { items, loadMods } = require('./utils');

class Warframe {
  constructor(frame) {
    if (items) {
      this.warframe = (items.find((item) => item.uniqueName === frame.uniqueName)) || frame;
      delete this.warframe.patchlogs;
      delete this.warframe.components;
      delete this.warframe.buildPrice;
      delete this.warframe.buildTime;
      delete this.warframe.skipBuildTimePrice;
      delete this.warframe.buildQuantity;
      delete this.warframe.consumeOnBuild;
      delete this.warframe.tradable;
      delete this.warframe.conclave;
      delete this.warframe.introduced;
    }
    this.xp = frame.xp;
    this.polarized = frame.polarized;
    this.features = frame.polarized;
    if (items) {
      this.cosmetics = frame.skins
        .map((skin) => (items.find((item) => item.uniqueName === skin.uniqueName)) || skin);

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
    this.upgrades = loadMods(frame.upgrades);

    this.colors = {
      syandana: frame.eyecol,
      primary: frame.pricol,
      sigil: frame.sigcol,
      attachments: frame.attcol,
    };
  }
}

module.exports = Warframe;
