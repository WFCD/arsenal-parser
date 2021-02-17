'use strict';

const { assert } = require('chai');

// Companion.js testing
const WarframeCompanion = require('../../src/Companion.js');

describe('WarframeCompanion', () => {
  describe('#constructor', () => {
    it('should handle creating the companion object', () => {
      const sampleCompanion = {
        xp: 548455507,
        polarized: 7,
        features: 1,
        pricol: {
          t0: '92B1C6',
          t1: '9C5D42',
          t2: '9C5D42',
          t3: '413E3B',
          en: 'F6DC13',
        },
        attcol: {
          t0: 'B0BDB8',
          t1: 'EC4400',
          t2: 'EEEAF5',
          t3: '9A6243',
          m0: '737234',
          m1: 'AE681D',
          en: '9C0000',
          e1: 'A2BFA5',
        },
        type: 'beast',
        itemName: 'Anger',
        uniqueName: '/Lotus/Types/Game/CatbrowPet/CheshireCatbrowPetPowerSuit',
        upgrades: [],
      };

      const companion = new WarframeCompanion(sampleCompanion);
      assert.deepEqual(companion, {
        companion: {
          uniqueName: '/Lotus/Types/Game/CatbrowPet/CheshireCatbrowPetPowerSuit',
          name: 'Smeeta Kavat',
          description: 'This sly feline is playful yet devious.',
          health: 50,
          shield: 60,
          armor: 50,
          stamina: 8,
          power: 100,
          productCategory: 'KubrowPets',
          type: 'Pets',
          imageName: 'smeeta-kavat.png',
          category: 'Pets',
          tradable: false,
        },
        xp: 548455507,
        polarized: 7,
        colors: {
          t0: '92B1C6',
          t1: '9C5D42',
          t2: '9C5D42',
          t3: '413E3B',
          en: 'F6DC13',
        },
        upgrades: { arcanes: [], mods: [] },
        type: 'beast',
        name: 'Anger',
      }, 'Incorect companion output');
    });
    it('should handle getting an unknown companion id', () => {
      const unknownCompanion = {
        uniqueName: 'ExtremlyUnkownCompanion',
        skins: [
          { uniqueName: 'UnknownCosmetic' },
          { uniqueName: '/Lotus/Upgrades/Skins/Effects/Kuva/KuvaToxinEphemera' },
        ],
      };

      assert.isOk(new WarframeCompanion(unknownCompanion));
    });
  });
});
