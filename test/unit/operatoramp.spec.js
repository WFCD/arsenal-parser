import { assert } from 'chai';
import Items from '@wfcd/items';

// OperatorAmp.js testing
import OperatorAmp from '../../src/OperatorAmp.js';
import { marshall } from '../utils.js';

const items = new Items();

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
      const sampleProcessedAmp = {
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
          prism: items.find(
            (i) => i.uniqueName === '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Barrel/CorpAmpSet1BarrelPartC'
          ),
          scaffold: items.find(
            (i) => i.uniqueName === '/Lotus/Weapons/Sentients/OperatorAmplifiers/Set1/Chassis/SentAmpSet1ChassisPartB'
          ),
          brace: items.find(
            (i) => i.uniqueName === '/Lotus/Weapons/Corpus/OperatorAmplifiers/Set1/Grip/CorpAmpSet1GripPartC'
          ),
        },
        colors: {
          primary: {
            hex: '5B73D6',
            matches: [
              {
                palette: { name: 'Dojo', description: 'Unlocks a collection of colors inspired by Dojo pigments.' },
                position: { row: 5, col: 4 },
              },
            ],
          },
          secondary: {
            hex: '4559A5',
            matches: [
              {
                palette: { name: 'Dojo', description: 'Unlocks a collection of colors inspired by Dojo pigments.' },
                position: { row: 2, col: 4 },
              },
            ],
          },
          tertiary: {
            hex: '33589B',
            matches: [
              {
                palette: { name: 'Dojo', description: 'Unlocks a collection of colors inspired by Dojo pigments.' },
                position: { row: 18, col: 4 },
              },
            ],
          },
          accents: {
            hex: '6F7DB3',
            matches: [
              {
                palette: {
                  name: 'Lotus',
                  description:
                    'A set of colors inspired by the Lotus.\n\nUnlocks additional color options for Warframe customization.',
                },
                position: { row: 4, col: 5 },
              },
            ],
          },
          emissive: [
            {
              hex: '33589B',
              matches: [
                {
                  palette: { name: 'Dojo', description: 'Unlocks a collection of colors inspired by Dojo pigments.' },
                  position: { row: 18, col: 4 },
                },
              ],
            },
            {
              hex: '5E71B3',
              matches: [
                {
                  palette: {
                    name: 'Discord',
                    description: 'Unlocks a collection of Blurple, Greyple and not quite black colors.',
                  },
                  position: { row: 8, col: 1 },
                },
              ],
            },
          ],
          energy: [
            {
              hex: '33589B',
              matches: [
                {
                  palette: { name: 'Dojo', description: 'Unlocks a collection of colors inspired by Dojo pigments.' },
                  position: { row: 18, col: 4 },
                },
              ],
            },
          ],
        },
      };

      const amp = new OperatorAmp(sampleAmp);
      assert.deepEqual(marshall(amp), marshall(sampleProcessedAmp));
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
