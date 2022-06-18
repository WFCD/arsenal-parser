'use strict';

const Items = require('warframe-items');
const Pixel = require('./Pixel');

const items = new Items();

function translateFocus(focus = '') {
  if (focus.includes('Focus/Attack')) {
    return 'Madurai';
  }
  if (focus.includes('Focus/Defense')) {
    return 'Varazin';
  }
  if (focus.includes('Focus/Tactic')) {
    return 'Naramon';
  }
  if (focus.includes('Focus/Power')) {
    return 'Zenurik';
  }
  if (focus.includes('Focus/Ward')) {
    return 'Unairu';
  }
  return 'None';
}

function translatePolarity(pol = '') {
  if (pol.includes('AP_ATTACK')) {
    return 'Madurai';
  }
  if (pol.includes('AP_DEFENSE')) {
    return 'Varazin';
  }
  if (pol.includes('AP_TACTIC')) {
    return 'Naramon';
  }
  if (pol.includes('AP_POWER')) {
    return 'Zenurik';
  }
  if (pol.includes('AP_WARD')) {
    return 'Unairu';
  }
  return 'None';
}

function loadMods(upgrades = []) {
  const arcanes = [];
  const mods = [];
  upgrades.forEach((upgrade) => {
    let upgradeData = items.find((item) => item.uniqueName === upgrade.uniqueName) || upgrade;

    upgradeData.rank = upgrade.rank;
    upgradeData.uniqueName = upgrade.uniqueName;
    if (upgradeData.levelStats) {
      upgradeData.levelStats = upgradeData.levelStats[upgrade.rank] || upgradeData.levelStats;
    }
    delete upgradeData.drops;
    delete upgradeData.patchlogs;

    if (upgradeData.category === 'Arcanes') {
      delete upgradeData.tradable;
      arcanes.push(upgradeData);
    } else if (upgradeData.category === 'Mods') {
      if (upgradeData.name.includes('Riven Mod')) {
        upgradeData = {
          uniqueName: upgradeData.uniqueName,
          polarity: translatePolarity(upgrade.pol),
          rarity: upgradeData.rarity,
          baseDrain: Number(upgradeData.baseDrain),
          fusionLimit: upgradeData.fusionLimit,
          imageName: upgradeData.imageName,
          category: upgradeData.category,
          tradable: upgradeData.tradable,
          wikiaThumbnail: upgradeData.wikiaThumbnail || undefined,
          wikiaUrl: upgradeData.wikiaUrl || undefined,
          buffs: upgrade.buffs,
          curses: upgrade.curses,
          masteryReq: upgrade.lvlReq,
        };
      }
      delete upgradeData.transmutable;
      delete upgradeData.tradable;
      mods.push(upgradeData);
    }
  });
  return {
    arcanes,
    mods,
  };
}

/**
 * Safely map a color to a pixel
 * @param {string|undefined} color hex value to check for existence
 * @returns {Pixel|undefined}
 */
const safeColor = (color) => (color ? new Pixel(color) : undefined);

/**
 * Common Color Map
 * @typedef {Object} ColorMap
 * @property {Pixel} [primary]
 * @property {Pixel} [secondary]
 * @property {Pixel} [tertiary]
 * @property {Pixel} [accents]
 * @property {Array<Pixel>} [emissive]
 * @property {Array<Pixel>} [energy]
 */

/**
 * @typedef {Object} RawColors
 * @property {string} [t0] primary color hex
 * @property {string} [t1] secondary color hex
 * @property {string} [t2] tertiary color hex
 * @property {string} [t3] accent color hex
 * @property {string} [m0] first emissive color hex
 * @property {string} [m1] second emissive color hex
 * @property {string} [en] first energy color hex
 * @property {string} [en1] second energy color hex
 */

/**
 * Map DE Colors to common named colors
 * @param {RawColors} colors raw colors from api
 * @returns {ColorMap|undefined}
 */
function mapColors(colors = undefined) {
  if (!colors) return undefined;
  return {
    primary: safeColor(colors.t0),
    secondary: safeColor(colors.t1),
    tertiary: safeColor(colors.t2),
    accents: safeColor(colors.t3),
    emissive: [safeColor(colors.m0), safeColor(colors.m1)].filter((c) => c),
    energy: [safeColor(colors.en), safeColor(colors.en1)].filter((c) => c),
  };
}

const findItem = (uname) =>
  items
    .filter((item) => item && typeof item !== 'undefined' && item.uniqueName)
    .find((item) => item.uniqueName === uname);

module.exports = {
  translateFocus,
  loadMods,
  translatePolarity,
  items,
  findItem,
  mapColors,
};
