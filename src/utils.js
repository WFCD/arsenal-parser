'use strict';

const Items = require('warframe-items');

const items = new Items();

function translateFocus(focus) {
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

function translatePolarity(pol) {
  if (pol.includes('AP_Attack')) {
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

function loadMods(upgrades) {
  const arcanes = [];
  const mods = [];
  upgrades.forEach((upgrade) => {
    if (upgrade.uniqueName === '') return;
    if (!items) return;
    let upgradeData = (items.find((item) => item.uniqueName === upgrade.uniqueName));

    upgradeData.rank = upgrade.rank;
    if (upgradeData.levelStats) {
      upgradeData.levelStats = upgradeData.levelStats[upgrade.rank]
          || upgradeData.levelStats;
    }
    delete upgradeData.drops;
    delete upgradeData.patchlogs;

    if (upgradeData.category === 'Arcanes') {
      delete upgradeData.tradeable;
      arcanes.push(upgradeData);
    } else if (upgradeData.category === 'Mods') {
      if (upgradeData.name.includes('Riven Mod')) {
        upgradeData = {
          uniqueName: upgradeData.uniqueName,
          polarity: translatePolarity(upgrade.pol),
          rarity: upgradeData.rarity,
          baseDrain: upgradeData.baseDrain,
          fusionLimit: upgradeData.fusionLimit,
          imageName: upgradeData.imageName,
          category: upgradeData.category,
          tradeable: upgradeData.tradeable,
          wikiaThumbnail: upgradeData.wikiaThumbnail,
          wikiaUrl: upgradeData.wikiaUrl,
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

module.exports = {
  translateFocus,
  loadMods,
  translatePolarity,
  items,
};
