'use strict';

const { translateFocus, items } = require('./utils');

class WarframePlayer {
  constructor(data) {
    this.name = data.playerName;
    this.masteryRank = data.masteryRank;
    this.lastUpdated = new Date(data.lastUpdated * 1000);
    this.glyph = (items.find((item) => item.uniqueName === data.glyph)) || data.glyph;
    this.focusSchool = translateFocus(data.focus);
  }
}

module.exports = WarframePlayer;
