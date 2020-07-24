'use strict';

const { assert } = require('chai');

// Parazon.js testing
const WarframeParazon = require('../src/Parazon.js');

describe('WarframeParazon', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      const sampleParazon = {
        xp: 450000,
        polarized: 0,
        skins: [
          {
            uniqueName: '/Lotus/Upgrades/Skins/Parazon/TnRailjackDataKnife',
          },
        ],
        pricol: {
          t0: '808485',
          t1: 'D2D3D3',
          t2: '707475',
          t3: '656869',
          m0: '2F3132',
          m1: '070B0B',
          en: '070B0B',
          e1: '111212',
        },
        uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
        upgrades: [],
      };

      const parazon = new WarframeParazon(sampleParazon);
      assert.equal(
        JSON.stringify(parazon),
        JSON.stringify({
          uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
          xp: 450000,
          polarized: 0,
          upgrades: { arcanes: [], mods: [] },
          cosmetics: [
            {
              uniqueName: '/Lotus/Upgrades/Skins/Parazon/TnRailjackDataKnife',
              name: 'Sigma Series Parazon Skin',
              description: 'This Parazon model was gifted to the first Warframe Railjack crews.',
              type: 'Skin',
              imageName: 'sigma-series-parazon-skin.png',
              category: 'Skins',
            },
          ],
          colors: {
            t0: '808485',
            t1: 'D2D3D3',
            t2: '707475',
            t3: '656869',
            m0: '2F3132',
            m1: '070B0B',
            en: '070B0B',
            e1: '111212',
          },
        }), 'Failed to parse parazon',
      );
    });

    it('should handle a parazon with no cosmetics', () => {
      const sampleParazon = {
        xp: 450000,
        polarized: 0,
        pricol: {
          t0: '808485',
          t1: 'D2D3D3',
          t2: '707475',
          t3: '656869',
          m0: '2F3132',
          m1: '070B0B',
          en: '070B0B',
          e1: '111212',
        },
        uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
        upgrades: [],
      };

      const parazon = new WarframeParazon(sampleParazon);
      assert.equal(
        JSON.stringify(parazon),
        JSON.stringify({
          uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
          xp: 450000,
          polarized: 0,
          upgrades: { arcanes: [], mods: [] },
          colors: {
            t0: '808485',
            t1: 'D2D3D3',
            t2: '707475',
            t3: '656869',
            m0: '2F3132',
            m1: '070B0B',
            en: '070B0B',
            e1: '111212',
          },
        }), 'Failed to parse parazon',
      );
    });

    it('should handle a parazon with a unknown cosmetic', () => {
      const sampleParazon = {
        xp: 450000,
        polarized: 0,
        skins: [{ uniqueName: 'UnknownCosmetic' }],
        pricol: {
          t0: '808485',
          t1: 'D2D3D3',
          t2: '707475',
          t3: '656869',
          m0: '2F3132',
          m1: '070B0B',
          en: '070B0B',
          e1: '111212',
        },
        uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
        upgrades: [],
      };

      const parazon = new WarframeParazon(sampleParazon);
      assert.equal(
        JSON.stringify(parazon),
        JSON.stringify({
          uniqueName: '/Lotus/Weapons/Tenno/HackingDevices/TnHackingDevice/TnHackingDeviceWeapon',
          xp: 450000,
          polarized: 0,
          upgrades: { arcanes: [], mods: [] },
          cosmetics: [{ uniqueName: 'UnknownCosmetic' }],
          colors: {
            t0: '808485',
            t1: 'D2D3D3',
            t2: '707475',
            t3: '656869',
            m0: '2F3132',
            m1: '070B0B',
            en: '070B0B',
            e1: '111212',
          },
        }), 'Failed to parse parazon',
      );
    });
  });
});
