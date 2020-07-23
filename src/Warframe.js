'use strict';

const { items, loadMods } = require('./utils');

class Warframe {
  constructor(frame) {
    this.warframe = (items.find((item) => item.uniqueName === frame.uniqueName));
    delete this.warframe.patchlogs;
    delete this.warframe.components;
    this.xp = frame.xp;
    this.polarized = frame.polarized;
    this.features = frame.polarized;
    this.cosmetics = frame.skins
      .map((skin) => (items.find((item) => item.uniqueName === skin.uniqueName)) || skin);
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
