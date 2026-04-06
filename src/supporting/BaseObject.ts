import { ModResolveable, RawColors } from '@wfcd/items';

export default interface BaseObject {
  uniqueName: string;
  xp: number;
  polarized: number;
  focus: string | undefined;
  features: number;
  upgrades: ModResolveable[];
  skins: { uniqueName: string }[] | undefined;
  pricol: RawColors | undefined;
  attcol: RawColors | undefined;
  sigcol: RawColors | undefined;
  hide: boolean;
}
