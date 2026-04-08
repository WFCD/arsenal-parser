import type { ModResolveable, RawColors } from '@wfcd/items';

export default interface BaseObject {
  uniqueName: string;
  xp: number;
  polarized: number;
  focus?: string;
  features?: number;
  upgrades: ModResolveable[];
  skins?: Array<{ uniqueName: string }>;
  pricol?: RawColors;
  attcol?: RawColors;
  sigcol?: RawColors;
  eyecol?: RawColors;
  hide?: boolean;
}
