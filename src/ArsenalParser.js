'use strict';

const Player = require('./Player');
const Warframe = require('./Warframe');
const Weapon = require('./Weapon');
const Archwing = require('./Archwing');
const Parazon = require('./Parazon');
const Amp = require('./OperatorAmp');
const Companion = require('./Companion');

class ArsenalData {
  constructor(data) {
    this.account = new Player(data.accountInfo);

    this.loadout = {};

    const {
      NORMAL, ARCHWING, DATAKNIFE, OPERATOR, SENTINEL,
    } = data.loadOuts;

    const {
      warframe,
      primary,
      secondary,
      melee,
      heavy,
      exalted,
    } = NORMAL;

    const { archwing, primary: archPrimary, melee: archMelee } = ARCHWING;
    const { parazon } = DATAKNIFE;
    const { amp } = OPERATOR;
    const { companion } = SENTINEL;

    if (!warframe.hide) this.loadout.warframe = new Warframe(warframe);
    if (!primary.hide) this.loadout.primary = new Weapon(primary);
    if (!secondary.hide) this.loadout.secondary = new Weapon(secondary);
    if (!melee.hide) this.loadout.melee = new Weapon(melee);
    if (!heavy.hide) this.loadout.heavy = new Weapon(heavy);
    if (exalted) {
      if (typeof exalted.skins !== 'undefined') {
        this.exalted = new Companion(exalted);
      } else {
        this.loadout.exalted = new Weapon(exalted);
      }
    }

    this.loadout.archwing = {};
    if (!archwing.hide) this.loadout.archwing.archwing = new Archwing(archwing);
    if (!archPrimary.hide) this.loadout.archwing.primary = new Weapon(primary);
    if (!archMelee.hide) this.loadout.archwing.melee = new Weapon(melee);

    if (!parazon.hide) this.loadout.parazon = new Parazon(parazon);

    if (!amp.hide) this.loadout.amp = new Amp(amp);

    if (!companion.hide) this.loadout.companion = new Companion(companion);
  }
}

module.exports = ArsenalData;
