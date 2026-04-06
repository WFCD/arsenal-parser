import Player, { PlayerInformation } from './Player.js';
import Warframe from './Warframe.js';
import Weapon, { RawWeapon } from './Weapon.js';
import Archwing from './Archwing.js';
import Parazon from './Parazon.js';
import Amp from './OperatorAmp.js';
import Companion, { RawCompanion } from './Companion.js';
import Mech from './Mech.js';
import BaseObject from './supporting/BaseObject.js';
import WarframeMech from './Mech.js';

export interface BaseArsenalData {
  accountInfo: PlayerInformation;
  loadOuts: BaseLoadouts;
}

export interface BaseLoadouts {
  NORMAL: {
    warframe: BaseObject;
    primary: RawWeapon;
    secondary: RawWeapon;
    melee: RawWeapon;
    heavy: RawWeapon;
    exalted: RawWeapon | RawCompanion;
  };
  ARCHWING: { archwing: BaseObject; primary: RawWeapon; melee: RawWeapon };
  DATAKNIFE: { parazon: BaseObject; primary: BaseObject };
  OPERATOR: { amp: BaseObject };
  SENTINEL: { roboticweapon?: RawWeapon; companion?: RawCompanion };
  MECH: { mech: BaseObject; heavy: RawWeapon; exalted: RawWeapon };
}

export interface ArsenalLoadout {
  warframe: Warframe;
  primary?: Weapon;
  secondary?: Weapon;
  melee?: Weapon;
  heavy?: Weapon;
  exalted?: Weapon;
  vechiles?: VechilesLoadout;
  parazon?: Parazon;
  amp?: Amp;
  companion?: Companion;
  roboticweapon?: Weapon;
}

export interface VechilesLoadout {
  archwing?: Archwing;
  primary?: Weapon;
  melee?: Weapon;
  necramech?: { mech: WarframeMech; heavy: Weapon; exalted: Weapon };
}

export default class ArsenalData {
  account: Player;
  loadout: ArsenalLoadout;
  exalted?: Companion;

  constructor(data: BaseArsenalData) {
    this.account = new Player(data.accountInfo);

    const { NORMAL, ARCHWING, DATAKNIFE, OPERATOR, SENTINEL, MECH } = data.loadOuts;

    const { warframe, primary, secondary, melee, heavy, exalted } = NORMAL;

    const { archwing, primary: archPrimary, melee: archMelee } = ARCHWING;
    const { parazon } = DATAKNIFE;
    const { amp } = OPERATOR;
    const { companion, roboticweapon } = SENTINEL;

    this.loadout = { warframe: new Warframe(warframe) };

    if (primary && !primary.hide) this.loadout.primary = new Weapon(primary);
    if (secondary && !secondary.hide) this.loadout.secondary = new Weapon(secondary);
    if (melee && !melee.hide) this.loadout.melee = new Weapon(melee);
    if (heavy && !heavy.hide) this.loadout.heavy = new Weapon(heavy);
    if (exalted) {
      if (typeof exalted.skins !== 'undefined') {
        this.exalted = new Companion(exalted as RawCompanion);
      } else {
        this.loadout.exalted = new Weapon(exalted as RawWeapon);
      }
    }

    this.loadout.vechiles = {};
    if (archwing && !archwing.hide) this.loadout.vechiles.archwing = new Archwing(archwing);
    if (archPrimary && !archPrimary.hide) this.loadout.vechiles.primary = new Weapon(archPrimary);
    if (archMelee && !archMelee.hide) this.loadout.vechiles.melee = new Weapon(archMelee);

    if (parazon && !parazon.hide) this.loadout.parazon = new Parazon(parazon);

    if (amp) this.loadout.amp = new Amp(amp);

    if (companion) this.loadout.companion = new Companion(companion);
    if (roboticweapon) this.loadout.roboticweapon = new Weapon(roboticweapon);

    if (MECH) {
      const { mech, heavy: mechLong, exalted: mechExalted } = MECH;

      // Game prevents player from unequiping necramechs or their heavy weapons. If necramech doesn't exist then neither will its slots
      if (mech) {
        this.loadout.vechiles.necramech = {
          mech: new Mech(mech),
          heavy: new Weapon(mechLong),
          exalted: new Weapon(mechExalted),
        };
      }
    }
  }
}
