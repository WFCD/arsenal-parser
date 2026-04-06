import { Arcane, ColorMap, Item, ModUnion } from '@wfcd/items';
import { find, colors } from '@wfcd/items/utilities';
import BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export default class WarframeArchwing {
  uniqueName: string;
  archwing: Item | undefined;
  xp: any;
  polarized: any;
  upgrades: { arcane: Arcane[]; mods: ModUnion[] };
  colors: { primary: ColorMap | undefined; attachments: ColorMap | undefined };

  constructor(archwing: BaseObject) {
    this.uniqueName = archwing.uniqueName;
    this.archwing = findItem(archwing.uniqueName);
    this.xp = archwing.xp;
    this.polarized = archwing.polarized;
    this.upgrades = loadMods(archwing.upgrades);

    this.colors = {
      primary: archwing.pricol ? mapColors(archwing.pricol) : undefined,
      attachments: archwing.attcol ? mapColors(archwing.attcol) : undefined,
    };
  }
}
