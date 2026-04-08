import type { Arcane, ColorMap, Item, ModUnion } from '@wfcd/items';
import { colors, find } from '@wfcd/items/utilities';

import type BaseObject from './supporting/BaseObject';
import { findItem } from './supporting/FindItem';
import type { RawWeapon } from './Weapon';
import WarframeWeapon from './Weapon';

const { mapColors } = colors;
const { loadMods } = find;

type RawItemObject = { uniqueName: string };
type CrewMemberSlots = { SLOT_A: RawCrewMember; SLOT_B: RawCrewMember; SLOT_C: RawCrewMember };
type CrewMemberSkill = { Assinged: number };

export interface RawRailjackObject {
  railjack: RawRailjack;
  armaments: RawArmaments;
  crew: { members: CrewMemberSlots };
}

export interface RawRailjack extends BaseObject {
  itemName: string;
  modularParts: { SHIELD: RawItemObject; ENGINES: RawItemObject; REACTOR: RawItemObject; HULL: RawItemObject };
}

export interface RailjackLoadout {
  shield: Item | RawItemObject;
  engines: Item | RawItemObject;
  reactor: Item | RawItemObject;
  hull: Item | RawItemObject;
}

export interface RawArmaments {
  modularParts: { PILOT: RawItemObject; ORDINANCE: RawItemObject; PORT_GUNS: RawItemObject };
}

export interface RawCrewMember extends BaseObject {
  role: number;
  skills: {
    PILOTING: CrewMemberSkill;
    GUNNERY: CrewMemberSkill;
    ENGINEERING: CrewMemberSkill;
    COMBAT: CrewMemberSkill;
    SURVIVABILITY: CrewMemberSkill;
  };
  suit: string;
  secondincommand: boolean;
  crewweapon: RawWeapon;
  faction: string;
}

export class Armaments {
  pilot: Item | RawItemObject;
  portGuns: Item | RawItemObject;
  ordinance: Item | RawItemObject;

  constructor(armaments: RawArmaments) {
    const { PILOT, ORDINANCE, PORT_GUNS } = armaments.modularParts;

    this.pilot = findItem(PILOT.uniqueName) || PILOT;
    this.portGuns = findItem(PORT_GUNS.uniqueName) || PORT_GUNS;
    this.ordinance = findItem(ORDINANCE.uniqueName) || ORDINANCE;
  }
}

export class CrewMember {
  uniqueName: string;
  xp: number;
  skills: { piloting: number; gunnery: number; repair: number; combat: number; endurance: number };
  isSecondInCommand: boolean;
  weapon: WarframeWeapon;
  colors: {
    primary?: ColorMap;
    attachments?: ColorMap;
    syandana?: ColorMap;
    sigil?: ColorMap;
  };

  /**
   * 1 - Defender
   * 2 - Pilot
   * 3 - Gunner
   * 4 - Engineer
   */
  role: number;

  constructor(member: RawCrewMember) {
    this.uniqueName = member.uniqueName;
    this.xp = member.xp;
    this.role = member.role;

    this.skills = {
      piloting: member.skills.PILOTING.Assinged,
      gunnery: member.skills.GUNNERY.Assinged,
      repair: member.skills.ENGINEERING.Assinged,
      combat: member.skills.COMBAT.Assinged,
      endurance: member.skills.SURVIVABILITY.Assinged,
    };

    this.isSecondInCommand = member.secondincommand;
    this.weapon = new WarframeWeapon(member.crewweapon);
    this.colors = {
      primary: member.pricol ? mapColors(member.pricol) : undefined,
      attachments: member.attcol ? mapColors(member.attcol) : undefined,
      syandana: member.eyecol ? mapColors(member.eyecol) : undefined,
      sigil: member.sigcol ? mapColors(member.sigcol) : undefined,
    };
  }
}

export class Railjack {
  uniqueName: string;
  name: string;
  loadout: RailjackLoadout;
  upgrades: { arcanes: Arcane[]; mods: ModUnion[] };
  armaments: Armaments;
  crewMembers: CrewMember[];
  color: { primary?: ColorMap };

  constructor({ railjack, armaments, crew }: RawRailjackObject) {
    this.uniqueName = railjack.uniqueName;
    this.name = railjack.itemName;

    const { SHIELD, ENGINES, REACTOR, HULL } = railjack.modularParts;
    this.loadout = {
      shield: findItem(SHIELD.uniqueName) || SHIELD,
      engines: findItem(ENGINES.uniqueName) || ENGINES,
      reactor: findItem(REACTOR.uniqueName) || REACTOR,
      hull: findItem(HULL.uniqueName) || HULL,
    };

    this.upgrades = loadMods(railjack.upgrades);
    this.armaments = new Armaments(armaments);

    this.crewMembers = [];
    Object.keys(crew.members).forEach((c) => {
      const member = new CrewMember(crew.members[c as keyof CrewMemberSlots]);
      this.crewMembers.push(member);
    });

    this.color = { primary: railjack.pricol ? mapColors(railjack.pricol) : undefined };
  }
}
