'use strict';

const { assert } = require('chai');
const Items = require('warframe-items');

const items = new Items();

// Utils.js Testing
const utils = require('../../src/utils');

describe('utils', () => {
  describe('#loadMods', () => {
    it('Should parse an arcane correctly', () => {
      const sampleArcane = {
        uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/Utility/GolemArcaneRadialEnergyOnEnergyPickup',
        rank: 5,
      };

      const arcaneEnergize = utils.loadMods([sampleArcane]);

      assert.deepEqual(
        arcaneEnergize.arcanes[0],
        items.find((i) => i.name === 'Arcane Energize'),
        'Arcane energize invalid',
      );
    });
    it('Should parse a mod correctly', () => {
      const sampleMod = {
        uniqueName: '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod',
        rank: 5,
      };

      const hunterCommand = utils.loadMods([sampleMod]);

      assert.deepEqual(
        hunterCommand.mods[0],
        items.find((i) => i.uniqueName === '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod'),
        'Mod mismatch',
      );
    });
    it('Should parse a riven mod correctly', () => {
      const sampleRiven = {
        uniqueName: '/Lotus/Upgrades/Mods/Randomized/LotusRifleRandomModRare',
        rank: 8,
        buffs: [
          { tag: 'WeaponCritDamageMod', val: 0.3296302411049886 },
          { tag: 'WeaponCritChanceMod', val: 0.4403982743997111 },
        ],
        curses: [
          { tag: 'WeaponAmmoMaxMod', val: 0.5835381164993515 },
        ],
        compat: '/Lotus/Weapons/Grineer/LongGuns/GrineerM16Homage/GrineerM16Rifle',
        lvlReq: 15,
        pol: 'AP_DEFENSE',
      };

      const rivenMod = utils.loadMods([sampleRiven]);

      const expectedRiven = {
        uniqueName: '/Lotus/Upgrades/Mods/Randomized/LotusRifleRandomModRare',
        polarity: 'Varazin',
        rarity: 'Common',
        imageName: 'rifle-riven-mod.png',
        category: 'Mods',
        buffs: [
          { tag: 'WeaponCritDamageMod', val: 0.3296302411049886 },
          { tag: 'WeaponCritChanceMod', val: 0.4403982743997111 },
        ],
        curses: [
          { tag: 'WeaponAmmoMaxMod', val: 0.5835381164993515 },
        ],
        masteryReq: 15,
        wikiaThumbnail: undefined,
        wikiaUrl: undefined,
      };

      // ignore some fields
      delete rivenMod.mods[0].baseDrain;
      delete rivenMod.mods[0].fusionLimit;

      assert.deepEqual(rivenMod.mods[0], expectedRiven, 'Riven parsing failed');
    });
    it('should ignore mods that are unknown', () => {
      assert.deepEqual(utils.loadMods([{ uniqueName: 'MyFakeModName' }]), { arcanes: [], mods: [] }, 'Nonexistant mods not ignored');
    });
    it('should handle being passed an undefined value', () => {
      assert.deepEqual(utils.loadMods(undefined), { arcanes: [], mods: [] }, 'Failed with no input');
    });
    it('should handle being passed a mod that should not have a rank assigned', () => {
      const sampleParazonMod = {
        uniqueName: '/Lotus/Upgrades/Mods/DataSpike/Cipher/AutoHackMod',
      };
      const parazonMod = utils.loadMods([sampleParazonMod]);
      assert.deepEqual(parazonMod.mods[0].levelStats[0], { stats: ['+30% chance to auto complete Hacking'] }, 'Mod not correctly found');
    });
  });

  describe('#translateFocus', () => {
    it('should respond with None if undefined', () => {
      assert.equal(utils.translateFocus(undefined), 'None', 'Undefined focus was not None');
    });
    it('should correctly determine focus schools', () => {
      assert.equal(utils.translateFocus('Focus/Attack'), 'Madurai', 'Focus school incorrect');
      assert.equal(utils.translateFocus('Focus/Defense'), 'Varazin', 'Focus school incorrect');
      assert.equal(utils.translateFocus('Focus/Tactic'), 'Naramon', 'Focus school incorrect');
      assert.equal(utils.translateFocus('Focus/Power'), 'Zenurik', 'Focus school incorrect');
      assert.equal(utils.translateFocus('Focus/Ward'), 'Unairu', 'Focus school incorrect');
    });
  });
  describe('#translatePolarity', () => {
    it('should respond with None if undefined', () => {
      assert.equal(utils.translatePolarity(undefined), 'None', 'Undefined polarity was not None');
    });
    it('should correctly determine polarities', () => {
      assert.equal(utils.translatePolarity('AP_ATTACK'), 'Madurai', 'Polarity incorrect');
      assert.equal(utils.translatePolarity('AP_DEFENSE'), 'Varazin', 'Polarity incorrect');
      assert.equal(utils.translatePolarity('AP_TACTIC'), 'Naramon', 'Polarity incorrect');
      assert.equal(utils.translatePolarity('AP_POWER'), 'Zenurik', 'Polarity incorrect');
      assert.equal(utils.translatePolarity('AP_WARD'), 'Unairu', 'Polarity incorrect');
    });
  });
});
