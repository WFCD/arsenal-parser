'use strict';

const { items, loadMods } = require('./utils');

class Warframe {
  constructor(frame) {
    if (items) {
      this.warframe = (items.find((item) => item.uniqueName === frame.uniqueName));
      delete this.warframe.patchlogs;
      delete this.warframe.components;
    }
    this.xp = frame.xp;
    this.polarized = frame.polarized;
    this.features = frame.polarized;
    if (items) {
      this.cosmetics = frame.skins
        .map((skin) => (items.find((item) => item.uniqueName === skin.uniqueName)) || skin);

      this.cosmetics.forEach((cosmetic) => {
        if (cosmetic.components) {
          cosmetic.components.forEach((component) => {
            delete component.drops; // eslint-disable-line no-param-reassign
          });
        }
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
