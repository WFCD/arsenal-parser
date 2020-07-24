'use strict';

const { assert } = require('chai');

// Utils.js Testing
const utils = require('../src/utils.js');

describe('utils', () => {
  describe('#loadMods', () => {
    it('Should parse a arcane correctly', () => {
      const sampleArcane = {
        uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/Utility/GolemArcaneRadialEnergyOnEnergyPickup',
        rank: 5,
      };

      const arcaneEnergize = utils.loadMods([sampleArcane]);

      assert.equal(
        JSON.stringify(arcaneEnergize.arcanes[0]),
        JSON.stringify({
          uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/Utility/GolemArcaneRadialEnergyOnEnergyPickup',
          name: 'Arcane Energize',
          rarity: 'Legendary',
          levelStats: {
            stats: [
              'On Energy Pickup:60% chance to replenish Energy to nearby allies+1 Arcane Revive',
            ],
          },
          type: 'Arcane',
          imageName: 'arcane-energize.png',
          category: 'Arcanes',
          rank: 5,
        }), 'Arcane energize invalid',
      );
    });

    it('Should parse a mod correctly', () => {
      const sampleMod = {
        uniqueName: '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod',
        rank: 5,
      };

      const hunterCommand = utils.loadMods([sampleMod]);

      assert.equal(
        JSON.stringify(hunterCommand.mods[0]),
        JSON.stringify({
          uniqueName: '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod',
          name: 'Hunter Command',
          polarity: 'Madurai',
          rarity: 'Rare',
          baseDrain: 4,
          fusionLimit: 5,
          compatName: 'BEAST',
          type: 'Sentinel',
          levelStats: {
            stats: ['Applying a <DT_SLASH>Slash Status to an enemy causes the Companion to attack them for 6s.'],
          },
          imageName: 'hunter-command.jpg',
          category: 'Mods',
          wikiaThumbnail: 'https://vignette.wikia.nocookie.net/warframe/images/1/17/HunterCommandMod.png/revision/latest?cb=20181130034216',
          wikiaUrl: 'http://warframe.fandom.com/wiki/Hunter_Command',
          rank: 5,
        }),
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

      assert.equal(
        JSON.stringify(rivenMod.mods[0]),
        JSON.stringify({
          uniqueName: '/Lotus/Upgrades/Mods/Randomized/LotusRifleRandomModRare',
          polarity: 'Varazin',
          rarity: 'Rare',
          baseDrain: 0,
          fusionLimit: 8,
          imageName: 'rifle-riven-mod.jpg',
          category: 'Mods',
          buffs: [
            { tag: 'WeaponCritDamageMod', val: 0.3296302411049886 },
            { tag: 'WeaponCritChanceMod', val: 0.4403982743997111 },
          ],
          curses: [
            { tag: 'WeaponAmmoMaxMod', val: 0.5835381164993515 },
          ],
          masteryReq: 15,
        }), 'Riven parsing failed',
      );
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
