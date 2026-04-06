import type { Arcane, ColorMap, Item, ModUnion } from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export default class Warframe {
  uniqueName: string;
  warframe: Item | undefined;
  xp: number;
  polarized: number;
  features: number;
  cosmetics: { uniqueName: string }[];
  upgrades: { arcane: Arcane[]; mods: ModUnion[] };
  colors: {
    primary?: ColorMap;
    attachments?: ColorMap;
    syandana?: ColorMap;
    sigil?: ColorMap;
  };

  constructor(frame: BaseObject) {
    this.uniqueName = frame.uniqueName;
    this.warframe = findItem(frame.uniqueName);
    this.xp = frame.xp;
    this.polarized = frame.polarized;
    this.features = frame.polarized;
    this.cosmetics = (frame.skins || []).map(
      (skin) => findItem(skin.uniqueName) || skin
    );
    this.upgrades = loadMods(frame.upgrades);

    this.colors = {
      primary: frame.pricol ? mapColors(frame.pricol) : undefined,
      attachments: frame.attcol ? mapColors(frame.attcol) : undefined,
      sigil: frame.sigcol ? mapColors(frame.sigcol) : undefined,
    };
  }
}
