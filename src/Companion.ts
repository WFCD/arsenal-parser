import { Arcane, ColorMap, ModResolveable, ModUnion, Skin, Warframe } from '@wfcd/items';
import { find, colors } from '@wfcd/items/utilities';
import BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export interface RawCompanion extends BaseObject {
  type: string;
  itemName: string;
  upgrades: ModResolveable[];
}

export default class WarframeCompanion {
  uniqueName: string;
  companion: Warframe | undefined;
  xp: any;
  polarized: any;
  cosmetics?: { uniqueName: string }[];
  colors: { primary: ColorMap | undefined; attachments: ColorMap | undefined };
  upgrades: { arcane: Arcane[]; mods: ModUnion[] };
  type: any;
  name: any;

  constructor(companion: RawCompanion) {
    this.uniqueName = companion.uniqueName;
    this.companion = findItem(companion.uniqueName) as Warframe;
    delete this.companion.patchlogs;
    delete this.companion.components;

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
