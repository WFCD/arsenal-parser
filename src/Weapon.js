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
              || { uniqueName: weapon.modularParts[part] };
      });

      Object.keys(parts).forEach((partKey) => {
        delete parts[partKey].patchlogs;
        delete parts[partKey].damagePerShot;
        delete parts[partKey].components;
        delete parts[partKey].tradable;
        delete parts[partKey].buildPrice;
        delete parts[partKey].buildTime;
        delete parts[partKey].skipBuildTimePrice;
        delete parts[partKey].buildQuantity;
        delete parts[partKey].consumeOnBuild;
      });

      this.parts = parts;
    } else {
      this.weapon = (items.find((item) => item.uniqueName === weapon.uniqueName)) || weapon;
      delete this.weapon.components;
      delete this.weapon.patchlogs;
      this.colors = weapon.pricol;
    }

    if (this.weapon) {
      delete this.weapon.damagePerShot;
    }
  }
}

module.exports = WarframeWeapon;
