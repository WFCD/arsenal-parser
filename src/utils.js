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
    let upgradeData = (items.find((item) => item.uniqueName === upgrade.uniqueName));
    upgradeData.rank = upgrade.rank;
    delete upgradeData.drops;
    delete upgradeData.patchlogs;
    if (upgradeData.category === 'Arcanes') {
      arcanes.push(upgradeData);
    } else if (upgradeData.category === 'Mods') {
      let rivenData;
      if (upgradeData.name.includes('Riven Mod')) {
        rivenData = {};
        rivenData.uniqueName = upgradeData.uniqueName;
        rivenData.polarity = translatePolarity(upgrade.pol);
        rivenData.rarity = upgradeData.rarity;
        rivenData.baseDrain = upgradeData.baseDrain;
        rivenData.fusionLimit = upgradeData.fusionLimit;
        rivenData.imageName = upgradeData.imageName;
        rivenData.category = upgradeData.category;
        rivenData.tradeable = upgradeData.tradeable;
        rivenData.wikiaThumbnail = upgradeData.wikiaThumbnail;
        rivenData.wikiaUrl = upgradeData.wikiaUrl;
        rivenData.buffs = upgrade.buffs;
        rivenData.curses = upgrade.curses;
        rivenData.masteryReq = upgrade.lvlReq;
        upgradeData = rivenData;
      }
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
