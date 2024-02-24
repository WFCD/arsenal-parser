import { find, colors } from 'warframe-items/utilities';

const { findItem, loadMods } = find;
const { mapColors } = colors;

export default class Warframe {
  constructor(frame) {
    this.warframe = findItem(frame.uniqueName) || frame;
    delete this.warframe.patchlogs;
    delete this.warframe.components;
    delete this.warframe.buildPrice;
    delete this.warframe.buildTime;
    delete this.warframe.skipBuildTimePrice;
    delete this.warframe.buildQuantity;
    delete this.warframe.consumeOnBuild;
    delete this.warframe.tradable;
    delete this.warframe.conclave;
    delete this.warframe.introduced;
    this.xp = frame.xp;
    this.polarized = frame.polarized;
    this.features = frame.polarized;
    this.cosmetics = (frame.skins || []).map((skin) => findItem(skin.uniqueName) || skin);

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
    this.upgrades = loadMods(frame.upgrades);

    this.colors = {
      syandana: mapColors(frame.eyecol),
      primary: mapColors(frame.pricol),
      sigil: mapColors(frame.sigcol),
      attachments: mapColors(frame.attcol),
    };
  }
}
