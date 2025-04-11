import { find, colors } from '@wfcd/items/utilities';

const { findItem, loadMods } = find;
const { mapColors } = colors;

export default class WarframeWeapon {
  constructor(weapon) {
    this.xp = weapon.xp;
    this.polarized = weapon.polarized;
    this.upgrades = loadMods(weapon.upgrades);
    if (weapon.itemName) this.itemName = weapon.itemName;
    this.cosmetics = (weapon.skins || []).map((skin) => findItem(skin.uniqueName) || skin);

    if (weapon.modularParts) {
      const parts = {};
      Object.keys(weapon.modularParts).forEach((part) => {
        parts[part] = findItem(weapon.modularParts[part]) || {
          uniqueName: weapon.modularParts[part],
        };
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
      this.weapon = findItem(weapon.uniqueName) || weapon;
      delete this.weapon.components;
      delete this.weapon.patchlogs;
      this.colors = mapColors(weapon.pricol);
    }

    if (this.weapon) {
      delete this.weapon.damagePerShot;
    }
  }
}
