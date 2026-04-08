// Companion.js testing
import { assert } from 'chai';

import type BaseObject from '@/supporting/BaseObject';
import { findItem } from '@/supporting/FindItem';

import WarframeMech from '../../src/Mech';

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
      ].map((uName) => findItem(uName) || { uniqueName: uName });

      assert.deepEqual(
        mech,
        {
          uniqueName: '/Lotus/Powersuits/EntratiMech/NechroTech',
          colors: {
            attachments: undefined,
            primary: undefined,
            sigil: undefined,
          },
          cosmetics,
          features: 1,
          mech: findItem('/Lotus/Powersuits/EntratiMech/NechroTech'),
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
          {
            uniqueName: '/Lotus/Upgrades/Skins/Effects/Kuva/KuvaToxinEphemera',
          },
        ],
      };

      assert.isOk(new WarframeMech(unknownCompanion as BaseObject));
    });

    it('should handle getting an unknown mech id without cosmetics', () => {
      const unknownCompanion = { uniqueName: 'ExtremlyUnkownCompanion' };

      assert.isOk(new WarframeMech(unknownCompanion as BaseObject));
    });
  });
});
