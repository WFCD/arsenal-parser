import { assert } from 'chai';
import Items from '@wfcd/items';
import { find } from '@wfcd/items/utilities';
import { translateFocus, translatePolarity } from 'warframe-worldstate-data/utilities';

// js Testing
import { marshall } from '../utils.js';

const { loadMods } = find;

const items = new Items();

describe('utilities', () => {
  describe('#loadMods', () => {
    it('Should parse an arcane correctly', () => {
      const sampleArcane = {
        uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/Utility/GolemArcaneRadialEnergyOnEnergyPickup',
        rank: 5,
      };

      const arcaneEnergize = loadMods([sampleArcane]);

      assert.deepEqual(
        marshall(arcaneEnergize.arcanes[0]),
        marshall(items.find((i) => i.name === 'Arcane Energize')),
        'Arcane energize invalid'
      );
    });
    it('Should parse a mod correctly', () => {
      const sampleMod = {
        uniqueName: '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod',
        rank: 5,
      };

      const hunterCommand = loadMods([sampleMod]);

      assert.deepEqual(
        hunterCommand.mods[0],
        items.find((i) => i.uniqueName === '/Lotus/Upgrades/Mods/Sets/Hunter/CompanionHunterCommandMod'),
        'Mod mismatch'
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
        curses: [{ tag: 'WeaponAmmoMaxMod', val: 0.5835381164993515 }],
        compat: '/Lotus/Weapons/Grineer/LongGuns/GrineerM16Homage/GrineerM16Rifle',
        lvlReq: 15,
        pol: 'AP_DEFENSE',
      };

      const rivenMod = loadMods([sampleRiven]);

      const expectedRiven = {
        uniqueName: '/Lotus/Upgrades/Mods/Randomized/LotusRifleRandomModRare',
        polarity: 'Vazarin',
        rarity: 'Common',
        imageName: 'rifle-riven-mod-e05c5519f1.png',
        category: 'Mods',
        buffs: [
          { tag: 'WeaponCritDamageMod', val: 0.3296302411049886 },
          { tag: 'WeaponCritChanceMod', val: 0.4403982743997111 },
        ],
        curses: [{ tag: 'WeaponAmmoMaxMod', val: 0.5835381164993515 }],
        masteryReq: 15,
        wikiaThumbnail: undefined,
        wikiaUrl: undefined,
      };

      // ignore some fields
      delete rivenMod.mods[0].baseDrain;
      delete rivenMod.mods[0].fusionLimit;

      assert.deepEqual(marshall(rivenMod.mods[0]), marshall(expectedRiven), 'Riven parsing failed');
    });
    it('should ignore mods that are unknown', () => {
      assert.deepEqual(
        loadMods([{ uniqueName: 'MyFakeModName' }]),
        { arcanes: [], mods: [] },
        'Nonexistant mods not ignored'
      );
    });
    it('should handle being passed an undefined value', () => {
      assert.deepEqual(loadMods(undefined), { arcanes: [], mods: [] }, 'Failed with no input');
    });
    it('should handle being passed a mod that should not have a rank assigned', () => {
      const sampleParazonMod = {
        uniqueName: '/Lotus/Upgrades/Mods/DataSpike/Cipher/AutoHackMod',
      };
      const parazonMod = loadMods([sampleParazonMod]);
      assert.deepEqual(
        parazonMod.mods[0].levelStats[0],
        { stats: ['+30% chance to auto complete Hacking'] },
        'Mod not correctly found'
      );
    });
  });

  describe('#translateFocus', () => {
    it('should respond with None if undefined', () => {
      assert.equal(translateFocus(undefined), 'None', 'Undefined focus was not None');
    });
    it('should correctly determine focus schools', () => {
      assert.equal(translateFocus('Focus/Attack'), 'Madurai', 'Focus school incorrect');
      assert.equal(translateFocus('Focus/Defense'), 'Vazarin', 'Focus school incorrect');
      assert.equal(translateFocus('Focus/Tactic'), 'Naramon', 'Focus school incorrect');
      assert.equal(translateFocus('Focus/Power'), 'Zenurik', 'Focus school incorrect');
      assert.equal(translateFocus('Focus/Ward'), 'Unairu', 'Focus school incorrect');
    });
  });
  describe('#translatePolarity', () => {
    it('should respond with None if undefined', () => {
      assert.equal(translatePolarity(undefined), 'None', 'Undefined polarity was not None');
    });
    it('should correctly determine polarities', () => {
      assert.equal(translatePolarity('AP_ATTACK'), 'Madurai', 'Polarity incorrect');
      assert.equal(translatePolarity('AP_DEFENSE'), 'Vazarin', 'Polarity incorrect');
      assert.equal(translatePolarity('AP_TACTIC'), 'Naramon', 'Polarity incorrect');
      assert.equal(translatePolarity('AP_POWER'), 'Zenurik', 'Polarity incorrect');
      assert.equal(translatePolarity('AP_WARD'), 'Unairu', 'Polarity incorrect');
    });
  });
});
