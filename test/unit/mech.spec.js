'use strict';

const { assert } = require('chai');

// Companion.js testing
const Items = require('warframe-items');
const WarframeMech = require('../../src/Mech');

const items = new Items();

describe('WarframeMech', () => {
  describe('#constructor', () => {
    it('should handle creating the mech object', () => {
      const sampleMech = {
        xp: 886972,
        polarized: 1,
        features: 1,
        skins: [
          {
            uniqueName: '/Lotus/Upgrades/Skins/Necramech/NecraMechCHelmetA',
          },
          {
            uniqueName: '/Lotus/Upgrades/Skins/Necramech/NecraMechCSkin',
          },
        ],
        uniqueName: '/Lotus/Powersuits/EntratiMech/NechroTech',
        upgrades: [],
      };

      const mech = new WarframeMech(sampleMech);

      const cosmetics = [
        '/Lotus/Upgrades/Skins/Necramech/NecraMechCHelmetA',
        '/Lotus/Upgrades/Skins/Necramech/NecraMechCSkin',
      ].map((uName) => items.find((item) => item.uniqueName === uName));

      assert.deepEqual(
        mech,
        {
          colors: {
            attachments: undefined,
            primary: undefined,
            sigil: undefined,
          },
          cosmetics,
          features: 1,
          mech: items.find((item) => item.uniqueName === '/Lotus/Powersuits/EntratiMech/NechroTech'),
          polarized: 1,
          upgrades: {
            arcanes: [],
            mods: [],
          },
          xp: 886972,
        },
        'Incorrect mech output'
      );
    });

    it('should handle getting an unknown mech id', () => {
      const unknownCompanion = {
        uniqueName: 'ExtremlyUnkownMech',
        skins: [
          { uniqueName: 'UnknownCosmetic' },
          { uniqueName: '/Lotus/Upgrades/Skins/Effects/Kuva/KuvaToxinEphemera' },
        ],
      };

      assert.isOk(new WarframeMech(unknownCompanion));
    });

    it('should handle getting an unknown mech id without cosmetics', () => {
      const unknownCompanion = { uniqueName: 'ExtremlyUnkownCompanion' };

      assert.isOk(new WarframeMech(unknownCompanion));
    });
  });
});
