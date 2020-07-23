'use strict';

const { items } = require('./utils');

class OperatorAmp {
  constructor(amp) {
    this.xp = amp.xp;
    this.polarized = amp.polarized;
    this.amp = (items.find((item) => item.uniqueName === amp.uniqueName));
    this.parts = {
      prism: (items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_OCULUS)),
      scaffold: (items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_CORE)),
      brace: (items.find((item) => item.uniqueName === amp.modularParts.LWPT_AMP_BRACE)),
    };

    delete this.parts.prism.components;
    delete this.parts.scaffold.components;
    delete this.parts.brace.components;

    delete this.parts.prism.patchlogs;
    delete this.parts.scaffold.patchlogs;
    delete this.parts.brace.patchlogs;
  }
}

module.exports = OperatorAmp;
