import {
  type Arcane,
  type ColorMap,
  type Item,
  type ModUnion,
  Skin,
  type Warframe,
} from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { loadMods } = find;
const { mapColors } = colors;

export default class WarframeMech {
  uniqueName: string;
  mech: Item | undefined;
  xp: number;
  polarized: number;
  cosmetics?: { uniqueName: string }[];
  colors: {
    primary: ColorMap | undefined;
    sigil: ColorMap | undefined;
    attachments: ColorMap | undefined;
  };
  upgrades: { arcane: Arcane[]; mods: ModUnion[] };
  features: number;

  constructor(mech: BaseObject) {
    this.uniqueName = mech.uniqueName;
    this.mech = findItem(mech.uniqueName) as Warframe;

    this.xp = mech.xp;
    this.polarized = mech.polarized;
    if (mech.skins) {
      this.cosmetics = mech.skins
        .filter((cosmetic) => cosmetic)
        .map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);
    }

    this.colors = {
      primary: mech.pricol ? mapColors(mech.pricol) : undefined,
      sigil: mech.sigcol ? mapColors(mech.sigcol) : undefined,
      attachments: mech.attcol ? mapColors(mech.attcol) : undefined,
    };
    this.upgrades = loadMods(mech.upgrades);

    // ?? no idea what this is
    this.features = mech.features;
  }
}
