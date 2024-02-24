import { assert } from 'chai';
import Items from 'warframe-items';

// Companion.js testing
import WarframeCompanion from '../../src/Companion.js';
import { marshall } from '../utils.js';

const items = new Items({ category: ['Pets'] });

const cheshire = items.find((i) => i.uniqueName === '/Lotus/Types/Game/CatbrowPet/CheshireCatbrowPetPowerSuit');
delete cheshire.patchlogs;

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
          en: '0',
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

      const companion = marshall(new WarframeCompanion(sampleCompanion));
      const expectedCompanion = marshall({
        colors: {
          attachments: {
            accents: {
              hex: '9A6243',
              matches: [
                {
                  palette: {
                    description: 'Express perfection with this distinctive palette of colors.',
                    name: "Ki'Teer",
                  },
                  position: {
                    col: 3,
                    row: 15,
                  },
                },
              ],
            },
            emissive: [
              {
                hex: '737234',
                matches: [
                  {
                    palette: {
                      description: 'Unlocks additional color options for Warframe customization.',
                      name: 'Color Picker D',
                    },
                    position: {
                      col: 5,
                      row: 5,
                    },
                  },
                  {
                    palette: {
                      description: 'Unlocks additional color options for Warframe customization.',
                      name: 'Storm',
                    },
                    position: {
                      col: 5,
                      row: 5,
                    },
                  },
                ],
              },
              {
                hex: 'AE681D',
                matches: [
                  {
                    palette: {
                      description: 'Unlocks additional color options for Warframe customization.',
                      name: 'Fire',
                    },
                    position: {
                      col: 4,
                      row: 9,
                    },
                  },
                ],
              },
            ],
            energy: [
              {
                hex: '9C0000',
                matches: [
                  {
                    palette: {
                      description:
                        'Unlocks a collection of Ghastly Greens, Pumpkin Orange and Blood Red colors to customize your Warframe with.',
                      name: 'Halloween',
                    },
                    position: {
                      col: 1,
                      row: 9,
                    },
                  },
                ],
              },
            ],
            primary: {
              hex: 'B0BDB8',
              matches: [
                {
                  palette: {
                    description:
                      'Unlocks additional color options reflecting the default colors used on each standard Warframe.',
                    name: 'Tenno',
                  },
                  position: {
                    col: 2,
                    row: 8,
                  },
                },
              ],
            },
            secondary: {
              hex: 'EC4400',
              matches: [
                {
                  palette: {
                    description: 'Unlocks additional color options for Warframe customization.',
                    name: 'Fire',
                  },
                  position: {
                    col: 3,
                    row: 14,
                  },
                },
              ],
            },
            tertiary: {
              hex: 'EEEAF5',
              matches: [
                {
                  palette: {
                    description: 'Unlocks additional color options for Warframe customization.',
                    name: 'Twitch',
                  },
                  position: {
                    col: 1,
                    row: 13,
                  },
                },
              ],
            },
          },
          primary: {
            accents: {
              hex: '413E3B',
              matches: [],
            },
            emissive: [],
            energy: [
              {
                hex: '0',
                isTransparent: true,
                matches: [],
              },
            ],
            primary: {
              hex: '92B1C6',
              matches: [],
            },
            secondary: {
              hex: '9C5D42',
              matches: [],
            },
            tertiary: {
              hex: '9C5D42',
              matches: [],
            },
          },
        },
        companion: cheshire,
        name: 'Anger',
        polarized: 7,
        type: 'beast',
        upgrades: {
          arcanes: [],
          mods: [],
        },
        xp: 548455507,
      });

      assert.deepEqual(companion, expectedCompanion, 'Incorrect companion output');
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
