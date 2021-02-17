'use strict';

const Items = require('warframe-items');

const items = new Items(['Skins']).filter((i) => i.hexColours);

const position = (ind) => ({
  row: (ind % 18) + 1,
  col: Math.ceil(ind / 18),
});

module.exports = class Pixel {
  constructor(hex) {
    this.hex = hex;
    this.matches = [];

    const usedPalettes = [];

    items.forEach((item) => {
      item.hexColours.forEach(({ value }, index) => {
        if (value.toLowerCase().includes(hex.toLowerCase())) {
          if (!usedPalettes.includes(item.name)) {
            this.matches.push({
              palette: {
                name: item.name,
                description: item.description,
              },
              position: position(index),
            });

            usedPalettes.push(item.name);
          }
        }
      });
    });
  }

  get palettes() {
    return Array.from(new Set(this.matches.map((match) => match.palette.name)));
  }
};
