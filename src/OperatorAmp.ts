import type { ColorMap, Item } from '@wfcd/items';
import { colors } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';

const { mapColors } = colors;

export interface RawAmp extends BaseObject {
  modularParts?: {
    LWPT_AMP_OCULUS: string;
    LWPT_AMP_BRACE: string;
    LWPT_AMP_CORE: string;
  };
}

export interface AmpParts {
  prism: Item | { uniqueName: string };
  scaffold: Item | { uniqueName: string };
  brace: Item | { uniqueName: string };
}

export default class OperatorAmp {
  xp: number;
  polarized: number;
  amp: Item | object;
  parts: AmpParts | undefined;
  colors: ColorMap | undefined;

  constructor(amp: RawAmp) {
    this.xp = amp.xp;
    this.polarized = amp.polarized;
    this.amp = findItem(amp.uniqueName) || amp;
    if (!amp.modularParts) return;
    this.parts = {
      prism: findItem(amp.modularParts.LWPT_AMP_OCULUS) || {
        uniqueName: amp.modularParts.LWPT_AMP_OCULUS,
      },
      scaffold: findItem(amp.modularParts.LWPT_AMP_CORE) || {
        uniqueName: amp.modularParts.LWPT_AMP_CORE,
      },
      brace: findItem(amp.modularParts.LWPT_AMP_BRACE) || {
        uniqueName: amp.modularParts.LWPT_AMP_BRACE,
      },
    };

    this.colors = amp.pricol ? mapColors(amp.pricol) : undefined;
  }
}
