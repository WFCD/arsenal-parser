'use strict';

const Player = require('./Player');
const Warframe = require('./Warframe');
const Weapon = require('./Weapon');
const Archwing = require('./Archwing');
const Parazon = require('./Parazon');
const Amp = require('./OperatorAmp');
const Companion = require('./Companion');
const Mech = require('./Mech');

module.exports = class ArsenalData {
  constructor(data) {
    this.account = new Player(data.account || data.accountInfo);

    this.loadout = {};

    const { NORMAL, ARCHWING, DATAKNIFE, OPERATOR, SENTINEL, MECH } = data.loadOuts;

    const { warframe, primary, secondary, melee, heavy, exalted } = NORMAL;

    const { archwing, primary: archPrimary, melee: archMelee } = ARCHWING;
    const { parazon } = DATAKNIFE;
    const { amp } = OPERATOR;
    const { companion, roboticweapon } = SENTINEL;

    if (warframe && !warframe.hide) this.loadout.warframe = new Warframe(warframe);
    if (primary && !primary.hide) this.loadout.primary = new Weapon(primary);
    if (secondary && !secondary.hide) this.loadout.secondary = new Weapon(secondary);
    if (melee && !melee.hide) this.loadout.melee = new Weapon(melee);
    if (heavy && !heavy.hide) this.loadout.heavy = new Weapon(heavy);
    if (exalted) {
      if (typeof exalted.skins !== 'undefined') {
        this.exalted = new Companion(exalted);
      } else {
        this.loadout.exalted = new Weapon(exalted);
      }
    }

    this.loadout.archwing = {};
    if (archwing && !archwing.hide) this.loadout.archwing.archwing = new Archwing(archwing);
    if (archPrimary && !archPrimary.hide) this.loadout.archwing.primary = new Weapon(archPrimary);
    if (archMelee && !archMelee.hide) this.loadout.archwing.melee = new Weapon(archMelee);

    if (parazon && !parazon.hide) this.loadout.parazon = new Parazon(parazon);

    if (amp) this.loadout.amp = new Amp(amp);

    if (companion) this.loadout.companion = new Companion(companion);
    if (roboticweapon) this.loadout.roboticweapon = new Weapon(roboticweapon);

    if (MECH) {
      const { mech, heavy: mechLong, exalted: mechExalted } = MECH;

      this.loadout.mech = {};
      if (mech && !mech.hide) this.loadout.mech = new Mech(mech);
      if (mechLong && !mechLong.hide) this.loadout.mech.heavy = new Weapon(mechLong);
      if (mechExalted && !mechExalted.hide) this.loadout.mech.exalted = new Weapon(mechExalted);
    }
  }
};
