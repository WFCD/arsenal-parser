'use strict';

const { items, loadMods } = require('./utils');

class WarframeArchwing {
  constructor(archwing) {
    this.archwing = (items.find((item) => item.uniqueName === archwing.uniqueName));
    delete this.archwing.components;
    delete this.archwing.patchlogs;
    this.xp = archwing.xp;
    this.polarized = archwing.polarized;
    this.upgrades = loadMods(archwing.upgrades);

    this.colors = archwing.pricol;
  }
}

module.exports = WarframeArchwing;
