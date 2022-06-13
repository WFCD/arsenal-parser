'use strict';

const { items, mapColors } = require('./utils');

module.exports = class OperatorAmp {
  constructor(amp) {
    this.xp = amp.xp;
    this.polarized = amp.polarized;
    this.amp = items.find((item) => item.uniqueName === amp.uniqueName) || amp;
    if (!amp.modularParts) return;
    this.parts = {
      prism: items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_OCULUS) || {
        uniqueName: amp.modularParts.LWPT_AMP_OCULUS,
      },
      scaffold: items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_CORE) || {
        uniqueName: amp.modularParts.LWPT_AMP_CORE,
      },
      brace: items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_BRACE) || {
        uniqueName: amp.modularParts.LWPT_AMP_BRACE,
      },
    };

    Object.keys(this.parts).forEach((partKey) => {
      delete this.parts[partKey].components;
      delete this.parts[partKey].patchlogs;
      delete this.parts[partKey].buildPrice;
      delete this.parts[partKey].skipBuildTimePrice;
      delete this.parts[partKey].buildQuantity;
      delete this.parts[partKey].consumeOnBuild;
      delete this.parts[partKey].buildTime;
      delete this.parts[partKey].tradable;
      delete this.parts[partKey].damagePerShot;
    });
    this.colors = mapColors(amp.pricol);
  }
};
