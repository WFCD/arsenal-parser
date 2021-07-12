'use strict';

const { assert } = require('chai');

// Archwing.js testing
const WarframeArchwing = require('../../src/Archwing');

describe('WarframeArchwing', () => {
  describe('#constructor', () => {
    it('should understand and fetch basic archwing information', () => {
      const sampleArchwing = {
        xp: 638728,
        polarized: 0,
        pricol: {
          t0: '2E203D',
          t1: '9078EA',
          t2: 'D6A3EC',
          t3: '49667C',
          m0: 'E6B0FE',
          m1: 'E6B0FE',
          en: '2E203D',
        },
        uniqueName: '/Lotus/Powersuits/Archwing/StandardJetPack/StandardJetPack',
        upgrades: [
          {
            uniqueName: '/Lotus/Upgrades/Mods/Archwing/Suit/ArchwingSuitHealthMaxMod',
            rank: 2,
          },
          {
            uniqueName: '',
          },
          {
            uniqueName: '',
          },
          {
            uniqueName: '',
          },
          {
            uniqueName: '/Lotus/Upgrades/Mods/Archwing/Suit/ArchwingSuitShieldRechargeRateMod',
            rank: 2,
          },
          {
            uniqueName: '/Lotus/Upgrades/Mods/Archwing/Suit/ArchwingSuitShieldMaxMod',
            rank: 3,
          },
          {
            uniqueName: '',
          },
          {
            uniqueName: '',
          },
        ],
      };

      const archwing = new WarframeArchwing(sampleArchwing);

      assert.equal(archwing.xp, sampleArchwing.xp, 'Invalid xp count');
      assert.equal(archwing.archwing.name, 'Odonata', 'Incorrect archwing name');
    });

    it('should handle being passed an unknown archwing ID', () => {
      const fakeArchwing = new WarframeArchwing({ uniqueName: 'SomeNewUnknownArchwing' });

      assert.equal(JSON.stringify(fakeArchwing), JSON.stringify({
        archwing: { uniqueName: 'SomeNewUnknownArchwing' },
        upgrades: {
          arcanes: [],
          mods: [],
        },
        colors: {},
      }));
    });
  });
});
