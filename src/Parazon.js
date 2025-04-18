import { find, colors } from '@wfcd/items/utilities';

const { findItem, loadMods } = find;
const { mapColors } = colors;

export default class WarframeParazon {
  constructor(parazon) {
    this.uniqueName = parazon.uniqueName;
    this.xp = parazon.xp;
    this.polarized = parazon.polarized;
    this.upgrades = loadMods(parazon.upgrades);
    if (parazon.skins) {
      this.cosmetics = parazon.skins.map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);

      this.cosmetics.forEach((cosmetic) => {
        /* eslint-disable no-param-reassign */
        delete cosmetic.components;
        delete cosmetic.patchlogs;
        delete cosmetic.tradable;
        delete cosmetic.buildPrice;
        delete cosmetic.buildTime;
        delete cosmetic.skipBuildTimePrice;
        delete cosmetic.buildQuantity;
        delete cosmetic.consumeOnBuild;
      });
    }

    this.colors = mapColors(parazon.pricol);
  }
}
