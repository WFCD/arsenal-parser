import type { Arcane, ColorMap, ModUnion } from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export default class WarframeParazon {
  uniqueName: string;
  xp: number;
  polarized: number;
  upgrades: { arcanes: Arcane[]; mods: ModUnion[] };
  cosmetics?: { uniqueName: string }[];
  colors: ColorMap | undefined;

  constructor(parazon: BaseObject) {
    this.uniqueName = parazon.uniqueName;
    this.xp = parazon.xp;
    this.polarized = parazon.polarized;
    this.upgrades = loadMods(parazon.upgrades);
    if (parazon.skins) {
      this.cosmetics = parazon.skins.map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);
    }

    this.colors = parazon.pricol ? mapColors(parazon.pricol) : undefined;
  }
}
