import type { Arcane, ColorMap, Item, ModUnion } from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export interface RawWeapon extends BaseObject {
  itemName?: string;
  modularParts?: Record<string, string>;
}

export default class WarframeWeapon {
  xp: number;
  polarized: number;
  upgrades: { arcanes: Arcane[]; mods: ModUnion[] };
  name?: string;
  cosmetics: { uniqueName: string }[];
  parts?: Record<string, Item | { uniqueName: string }>;
  weapon?: Item | { uniqueName: string };
  colors?: { primary: ColorMap | undefined };

  constructor(weapon: RawWeapon) {
    this.xp = weapon.xp;
    this.polarized = weapon.polarized;
    this.upgrades = loadMods(weapon.upgrades);
    if (weapon.itemName) {
      this.name = weapon.itemName.includes('|')
        ? weapon.itemName.split('|').reverse()[0]
        : weapon.itemName;
    }

    this.cosmetics = (weapon.skins || []).map(
      (skin) => findItem(skin.uniqueName) || skin
    );

    if (weapon.modularParts) {
      const parts: Record<string, Item | { uniqueName: string }> = {};
      Object.keys(weapon.modularParts).forEach((part) => {
        parts[part] = findItem(weapon.modularParts![part]) || {
          uniqueName: weapon.modularParts![part],
        };
      });

      this.parts = parts;
    } else {
      this.weapon = findItem(weapon.uniqueName) || {
        uniqueName: weapon.uniqueName,
      };
      this.colors = {
        primary: weapon.pricol ? mapColors(weapon.pricol) : undefined,
      };
    }
  }
}
