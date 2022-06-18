'use strict';

const { items, loadMods, mapColors } = require('./utils');

module.exports = class WarframeArchwing {
  constructor(archwing) {
    this.archwing = items.find((item) => item.uniqueName === archwing.uniqueName) || archwing;
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
};
