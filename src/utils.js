'use strict';

const Items = require('warframe-items');

const items = new Items();

const Pixel = require('./Pixel');

function translateFocus(focus = '') {
  if (focus.includes('Focus/Attack')) {
    return 'Madurai';
  } if (focus.includes('Focus/Defense')) {
    return 'Varazin';
  } if (focus.includes('Focus/Tactic')) {
    return 'Naramon';
  } if (focus.includes('Focus/Power')) {
    return 'Zenurik';
  } if (focus.includes('Focus/Ward')) {
    return 'Unairu';
  }
  return 'None';
}

function translatePolarity(pol = '') {
  if (pol.includes('AP_ATTACK')) {
    return 'Madurai';
  } if (pol.includes('AP_DEFENSE')) {
    return 'Varazin';
  } if (pol.includes('AP_TACTIC')) {
    return 'Naramon';
  } if (pol.includes('AP_POWER')) {
    return 'Zenurik';
  } if (pol.includes('AP_WARD')) {
    return 'Unairu';
  }
  return 'None';
}

function loadMods(upgrades = []) {
  const arcanes = [];
  const mods = [];
  upgrades.forEach((upgrade) => {
    let upgradeData = (items.find((item) => item.uniqueName === upgrade.uniqueName)) || upgrade;

    upgradeData.rank = upgrade.rank;
    upgradeData.uniqueName = upgrade.uniqueName;
    if (upgradeData.levelStats) {
      upgradeData.levelStats = upgradeData.levelStats[upgrade.rank]
            || upgradeData.levelStats;
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

const exisColo = (color) => (color ? new Pixel(color) : null);

function mapColors(colors = undefined) {
  if (colors) {
    return {
      primary: exisColo(colors.t0),
      secondary: exisColo(colors.t1),
      tertiary: exisColo(colors.t2),
      accents: exisColo(colors.t3),
      emissive: [
        exisColo(colors.m0),
        exisColo(colors.m1),
      ].filter((c) => c),
      energy: [
        exisColo(colors.en),
        exisColo(colors.en1),
      ].filter((c) => c),
    };
  }
  return colors;
}

const findItem = (uname) => items
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
