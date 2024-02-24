import { find, colors } from 'warframe-items/utilities';

const { findItem, loadMods } = find;
const { mapColors } = colors;
export default class WarframeCompanion {
  constructor(companion) {
    this.companion = findItem(companion.uniqueName) || companion;
    delete this.companion.patchlogs;
    delete this.companion.components;

    this.xp = companion.xp;
    this.polarized = companion.polarized;
    if (companion.skins) {
      this.cosmetics = companion.skins.map((cosmetic) => findItem(cosmetic.uniqueName) || cosmetic);

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
    this.colors = {
      primary: mapColors(companion.pricol),
      attachments: mapColors(companion.attcol),
    };
    this.upgrades = loadMods(companion.upgrades);
    this.type = companion.type;
    if (companion.itemName) this.name = companion.itemName;
  }
}
