'use strict';

const { items, loadMods } = require('./utils');

class WarframeWeapon {
  constructor(weapon) {
    this.xp = weapon.xp;
    this.polarized = weapon.polarized;
    this.upgrades = loadMods(weapon.upgrades);
    if (weapon.itemName) this.itemName = weapon.itemName;

    if (weapon.modularParts) {
      const parts = {};
      Object.keys(weapon.modularParts).forEach((part) => {
        parts[part] = (items.find((item) => item.uniqueName === weapon.modularParts[part]))
          || weapon.modularParts[part];
      });

      this.parts = parts;
    } else {
      this.weapon = (items.find((item) => item.uniqueName === weapon.uniqueName));
      delete this.weapon.components;
      delete this.weapon.patchlogs;
      this.colors = weapon.pricol;
    }
  }
}

module.exports = WarframeWeapon;
