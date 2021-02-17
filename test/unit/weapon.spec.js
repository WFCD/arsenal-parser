'use strict';

const { assert } = require('chai');

// Weapon.js testing
const WarframeWeapon = require('../../src/Weapon.js');

describe('WarframeWeapon', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      const sampleWeapon = {
        itemName: "/Lotus/Language/Weapons/KuvaKarakName|VONDRB ZAZ'D",
        xp: 79927583,
        polarized: 5,
        features: 3,
        uniqueName: '/Lotus/Weapons/Grineer/KuvaLich/LongGuns/Karak/KuvaKarak',
        upgrades: [],
      };

      const weapon = new WarframeWeapon(sampleWeapon);
      assert.equal(weapon.weapon.name, 'Kuva Karak');
    });

    it('should handle modular weapons', () => {
      const sampleKitgun = {
        modularParts: {
          LWPT_GUN_BARREL: 'UnkownPart',
        },
      };

      const kitgun = new WarframeWeapon(sampleKitgun);

      assert.equal(kitgun.parts.LWPT_GUN_BARREL.uniqueName, 'UnkownPart');
    });

    it('should handle an unknown cosmetic id', () => {
      assert.deepEqual(new WarframeWeapon({ skins: [{ uniqueName: 'UnknownSkin' }] }).cosmetics[0], { uniqueName: 'UnknownSkin' });
    });

    it('should handle an unknown part id', () => {
      const sampleKitgun = {
        itemName: 'Blaster Master',
        xp: 17767782,
        polarized: 8,
        features: 11,
        pricol: {
          t0: '1F2425',
          t1: '3B3A3D',
          t2: '93A7A7',
          t3: 'ECC45A',
          m0: '2D0415',
          m1: 'F60A11',
          en: 'F60A11',
          e1: 'FFFFFF',
        },
        uniqueName: '/Lotus/Weapons/SolarisUnited/Secondary/LotusModularSecondaryShotgun',
        upgrades: [],
        modularParts: {
          LWPT_GUN_BARREL: '/Lotus/Weapons/SolarisUnited/Secondary/SUModularSecondarySet1/Barrel/SUModularSecondaryBarrelAPart',
          LWPT_GUN_CLIP: '/Lotus/Weapons/SolarisUnited/Secondary/SUModularSecondarySet1/Clip/SUModularCritIICapIClipPart',
          LWPT_GUN_SECONDARY_HANDLE: '/Lotus/Weapons/SolarisUnited/Secondary/SUModularSecondarySet1/Handle/SUModularSecondaryHandleCPart',
        },
      };

      const kitgun = new WarframeWeapon(sampleKitgun);

      assert.equal(kitgun.itemName, 'Blaster Master');

      assert.equal(kitgun.parts.LWPT_GUN_BARREL.name, 'Catchmoon');
      assert.equal(kitgun.parts.LWPT_GUN_CLIP.name, 'Splat');
      assert.equal(kitgun.parts.LWPT_GUN_SECONDARY_HANDLE.name, 'Haymaker');
    });
  });
});
