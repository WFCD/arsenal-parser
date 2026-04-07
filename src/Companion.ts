import type { Arcane, ColorMap, Item, ModResolveable, ModUnion } from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export interface RawCompanion extends BaseObject {
  type: string;
  itemName?: string;
  upgrades: ModResolveable[];
}

export default class WarframeCompanion {
  uniqueName: string;
  name?: string;
  companion: Item | undefined;
  xp: number;
  polarized: number;
  cosmetics?: { uniqueName: string }[];
  colors: { primary: ColorMap | undefined; attachments: ColorMap | undefined };
  upgrades: { arcanes: Arcane[]; mods: ModUnion[] };
  type: string;

  constructor(companion: RawCompanion) {
    this.uniqueName = companion.uniqueName;
    if (companion.itemName) this.name = companion.itemName;
    this.companion = findItem(companion.uniqueName) as Item;

    this.xp = companion.xp;
    this.polarized = companion.polarized;
    if (companion.skins) {
      this.cosmetics = companion.skins.map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);
    }
    this.colors = {
      primary: companion.pricol ? mapColors(companion.pricol) : undefined,
      attachments: companion.attcol ? mapColors(companion.attcol) : undefined,
    };
    this.upgrades = loadMods(companion.upgrades);
    this.type = companion.type;
    if (companion.itemName) this.name = companion.itemName;
  }
}
