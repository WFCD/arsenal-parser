'use strict';

const { assert } = require('chai');

// Warframe.js testing
const Warframe = require('../../src/Warframe');

describe('Warframe', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      const sampleFrame = {
        xp: 153461190,
        polarized: 5,
        focus: '/Lotus/Upgrades/Focus/PowerLensGreater',
        features: 3,
        skins: [
          {
            uniqueName: '/Lotus/Upgrades/Skins/AntiMatter/NovaDeluxeIIHelmet',
          },
        ],
        eyecol: {
          t0: 'FF588A',
          t1: 'FE1C50',
          t2: 'FF0D43',
          t3: 'FF5C9F',
          en: 'FF70A9',
        },
        pricol: {
          t0: 'FF588A',
          t1: 'FE1C50',
          t2: 'FF0D43',
          t3: 'FF5C9F',
          m0: 'FF70A9',
          m1: 'FF70A9',
          en: 'FF70A9',
        },
        sigcol: {
          t0: '3F9FB7',
          t1: '808080',
          t2: 'BABABA',
          t3: '808080',
          en: 'FFBA80',
        },
        attcol: {
          t0: 'FF588A',
          t1: 'FE1C50',
          t2: 'FF0D43',
          t3: 'FF5C9F',
          en: 'FF70A9',
        },
        uniqueName: '/Lotus/Powersuits/AntiMatter/NovaPrime',
        upgrades: [],
      };

      const frame = new Warframe(sampleFrame);
      assert.equal(frame.warframe.name, 'Nova Prime', 'Frame not correctly identified');
      delete frame.warframe; // Cleanup data for comparison

      assert.deepEqual(frame, {
        xp: 153461190,
        polarized: 5,
        features: 5,
        cosmetics: [{
          uniqueName: '/Lotus/Upgrades/Skins/AntiMatter/NovaDeluxeIIHelmet',
          name: 'Nova Atomica Helmet',
          description: "Nova Atomica's signature helmet.",
          type: 'Skin',
          imageName: 'nova-atomica-helmet.png',
          category: 'Skins',
        }],
        upgrades: { arcanes: [], mods: [] },
        colors: {
          syandana: {
            primary: { hex: 'FF588A', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 2, col: 2 } }] }, secondary: { hex: 'FE1C50', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 8, col: 2 } }] }, tertiary: { hex: 'FF0D43', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 3, col: 2 } }] }, accents: { hex: 'FF5C9F', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 7, col: 2 } }] }, emissive: [], energy: [{ hex: 'FF70A9', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 12, col: 2 } }] }],
          },
          primary: {
            primary: { hex: 'FF588A', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 2, col: 2 } }] }, secondary: { hex: 'FE1C50', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 8, col: 2 } }] }, tertiary: { hex: 'FF0D43', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 3, col: 2 } }] }, accents: { hex: 'FF5C9F', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 7, col: 2 } }] }, emissive: [{ hex: 'FF70A9', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 12, col: 2 } }] }, { hex: 'FF70A9', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 12, col: 2 } }] }], energy: [{ hex: 'FF70A9', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 12, col: 2 } }] }],
          },
          sigil: {
            primary: { hex: '3F9FB7', matches: [{ palette: { name: 'Classic', description: 'Unlocks additional color options for Warframe customization.' }, position: { row: 16, col: 2 } }] }, secondary: { hex: '808080', matches: [{ palette: { name: 'Tenno', description: 'Unlocks additional color options reflecting the default colors used on each standard Warframe.' }, position: { row: 10, col: 3 } }] }, tertiary: { hex: 'BABABA', matches: [{ palette: { name: 'Tenno', description: 'Unlocks additional color options reflecting the default colors used on each standard Warframe.' }, position: { row: 12, col: 1 } }] }, accents: { hex: '808080', matches: [{ palette: { name: 'Tenno', description: 'Unlocks additional color options reflecting the default colors used on each standard Warframe.' }, position: { row: 10, col: 3 } }] }, emissive: [], energy: [{ hex: 'FFBA80', matches: [] }],
          },
          attachments: {
            primary: { hex: 'FF588A', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 2, col: 2 } }] }, secondary: { hex: 'FE1C50', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 8, col: 2 } }] }, tertiary: { hex: 'FF0D43', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 3, col: 2 } }] }, accents: { hex: 'FF5C9F', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 7, col: 2 } }] }, emissive: [], energy: [{ hex: 'FF70A9', matches: [{ palette: { name: 'Valentine', description: 'Unlocks a collection of lovely colors.' }, position: { row: 12, col: 2 } }] }],
          },
        },
      }, 'Invalid parsing of warframe data');
    });

    it('should handle an unknown warframe id', () => {
      assert.deepEqual(new Warframe({ uniqueName: 'UnknownFrame' }).warframe, { uniqueName: 'UnknownFrame' });
    });

    it('should handle an unknown cosmetic id', () => {
      assert.deepEqual(new Warframe({ skins: [{ uniqueName: 'UnknownCosmetic' }] }).cosmetics, [{ uniqueName: 'UnknownCosmetic' }]);
    });
  });
});
