'use strict';

const { assert } = require('chai');

// Companion.js testing
const WarframeMech = require('../../src/Mech.js');

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

      assert.deepEqual(mech, {
        colors: undefined,
        cosmetics: [
          {
            category: 'Skins',
            description: 'Bear down on the enemy with this alternative Necramech helmet.',
            excludeFromCodex: true,
            imageName: 'bruntspar-necramech-helmet.png',
            name: 'Bruntspar Necramech Helmet',
            type: 'Skin',
            uniqueName: '/Lotus/Upgrades/Skins/Necramech/NecraMechCHelmetA',
          },
          {
            category: 'Skins',
            description: "Rediscover the brutal power of the earliest Necramech designs with this skin. Bruntspar is - in Father's words - 'not out to play nice and make friends.'",
            excludeFromCodex: true,
            imageName: 'bruntspar-necramech-skin.png',
            name: 'Bruntspar Necramech Skin',
            type: 'Skin',
            uniqueName: '/Lotus/Upgrades/Skins/Necramech/NecraMechCSkin',
          },
        ],
        features: 1,
        mech: {
          abilities: [
            {
              description: 'Hurl a canister of graviton fluids to create a wide mire that will significantly slow enemies traveling across it. Alternatively, the canister can be shot in mid-air to create a fiery conflagration.',
              name: 'Necraweb',
            },
            {
              description: 'Swathe the Necramech in a powerful electrical field that greatly enhances survivability in close combat. Enemies that strike the shroud will suffer for their impudence.',
              name: 'Storm Shroud',
            },
            {
              description: 'Launch a pattern of charged mines all around you. Each mine detonates in a violent blast when touched, damaging enemies in a three-meter radius.',
              name: 'Gravemines',
            },
            {
              description: 'Take a stationary stance to deploy maximum firepower and gain increased structural integrity for a time.',
              name: 'Guard Mode',
            },
          ],
          armor: 400,
          buildPrice: 25000,
          buildQuantity: 1,
          buildTime: 259200,
          category: 'Warframes',
          consumeOnBuild: true,
          description: 'Nothing fancy but gets the job done and then some. With its electrified armor, this rough and ready mech can make the battlefield treacherous for the enemy with an arsenal of explosives.',
          exalted: [
            '/Lotus/Types/Enemies/Orokin/Entrati/EntratiTech/NechroTech/ExaltedArtilleryWeapon',
          ],
          health: 1500,
          imageName: 'voidrig.png',
          masteryReq: 0,
          name: 'Voidrig',
          power: 150,
          productCategory: 'MechSuits',
          shield: 500,
          skipBuildTimePrice: 50,
          sprintSpeed: 1,
          stamina: 200,
          tradable: false,
          type: 'Warframe',
          uniqueName: '/Lotus/Powersuits/EntratiMech/NechroTech',
        },
        polarized: 1,
        upgrades: {
          arcanes: [],
          mods: [],
        },
        xp: 886972,
      }, 'Incorrect mech output');
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
