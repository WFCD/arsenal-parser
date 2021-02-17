'use strict';

const { assert } = require('chai');

// OperatorAmp.js testing
const OperatorAmp = require('../../src/OperatorAmp.js');

describe('OperatorAmp', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      const sampleAmp = {
        itemName: 'META',
        xp: 5458755,
        polarized: 0,
        features: 8,
        pricol: {
          t0: '5B73D6',
          t1: '4559A5',
          t2: '33589B',
          t3: '6F7DB3',
          m0: '33589B',
          m1: '5E71B3',
          en: '33589B',
          e1: '5E71B3',
        },
        uniqueName: '/Lotus/Weapons/Sentients/OperatorAmplifiers/OperatorAmpWeapon',
        upgrades: [
          {
            uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/OperatorAmps/IncreasedCriticalDamageOnCriticalStrike',
            rank: 3,
          },
        ],
        modularParts: {
          LWPT_AMP_OCULUS: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Barrel/CorpAmpSet1BarrelPartC',
          LWPT_AMP_BRACE: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Grip/CorpAmpSet1GripPartC',
          LWPT_AMP_CORE: '/Lotus/Weapons/Sentients/OperatorAmplifiers/Set1/Chassis/SentAmpSet1ChassisPartB',
        },
      };

      const amp = new OperatorAmp(sampleAmp);
      assert.equal(JSON.stringify(amp), JSON.stringify({
        xp: 5458755,
        polarized: 0,
        amp: {
          itemName: 'META',
          xp: 5458755,
          polarized: 0,
          features: 8,
          pricol: {
            t0: '5B73D6',
            t1: '4559A5',
            t2: '33589B',
            t3: '6F7DB3',
            m0: '33589B',
            m1: '5E71B3',
            en: '33589B',
            e1: '5E71B3',
          },
          uniqueName: '/Lotus/Weapons/Sentients/OperatorAmplifiers/OperatorAmpWeapon',
          upgrades: [
            {
              uniqueName: '/Lotus/Upgrades/CosmeticEnhancers/OperatorAmps/IncreasedCriticalDamageOnCriticalStrike',
              rank: 3,
            },
          ],
          modularParts: {
            LWPT_AMP_OCULUS: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Barrel/CorpAmpSet1BarrelPartC',
            LWPT_AMP_BRACE: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Grip/CorpAmpSet1GripPartC',
            LWPT_AMP_CORE: '/Lotus/Weapons/Sentients/OperatorAmplifiers/Set1/Chassis/SentAmpSet1ChassisPartB',
          },
        },
        parts: {
          prism: {
            name: 'Klamora Prism',
            uniqueName: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Barrel/CorpAmpSet1BarrelPartC',
            totalDamage: 0,
            description: '',
            criticalChance: 0,
            criticalMultiplier: 0,
            procChance: 0,
            fireRate: 0,
            masteryReq: 0,
            productCategory: 'Pistols',
            omegaAttenuation: 1,
            type: 'Amp',
            imageName: 'klamora-prism.png',
            category: 'Misc',
          },
          scaffold: {
            name: 'Shraksun Scaffold',
            uniqueName: '/Lotus/Weapons/Sentients/OperatorAmplifiers/Set1/Chassis/SentAmpSet1ChassisPartB',
            totalDamage: 0,
            description: '',
            criticalChance: 0,
            criticalMultiplier: 0,
            procChance: 0,
            fireRate: 0,
            masteryReq: 0,
            productCategory: 'Pistols',
            omegaAttenuation: 1,
            type: 'Amp',
            imageName: 'shraksun-scaffold.png',
            category: 'Misc',
          },
          brace: {
            name: 'Certus Brace',
            uniqueName: '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Grip/CorpAmpSet1GripPartC',
            totalDamage: 0,
            description: '',
            criticalChance: 0,
            criticalMultiplier: 0,
            procChance: 0,
            fireRate: 0,
            masteryReq: 0,
            productCategory: 'Pistols',
            omegaAttenuation: 1,
            type: 'Amp',
            imageName: 'certus-brace.png',
            category: 'Misc',
          },
        },
      }));
    });

    it('should handle unknown modularpart ids', () => {
      const sampleAmp = {
        modularParts: {
          LWPT_AMP_OCULUS: 'UnknownPart',
          LWPT_AMP_BRACE: 'UnkownPart',
          LWPT_AMP_CORE: 'UnkownPart',
        },
      };

      assert.isOk(new OperatorAmp(sampleAmp));
    });

    it('should handle being passed no modularparts', () => {
      assert.isOk(new OperatorAmp({}));
    });
  });
});