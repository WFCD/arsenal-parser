'use strict';

const { assert } = require('chai');

// Warframe.js testing
const Warframe = require('../../src/Warframe.js');

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

      assert.equal(
        JSON.stringify(frame),
        JSON.stringify({
          xp: 153461190,
          polarized: 5,
          features: 5,
          cosmetics: [
            {
              uniqueName: '/Lotus/Upgrades/Skins/AntiMatter/NovaDeluxeIIHelmet',
              name: 'Nova Atomica Helmet',
              description: "Nova Atomica's signature helmet.",
              type: 'Skin',
              imageName: 'nova-atomica-helmet.png',
              category: 'Skins',
            },
          ],
          upgrades: { arcanes: [], mods: [] },
          colors: {
            syandana: {
              t0: 'FF588A',
              t1: 'FE1C50',
              t2: 'FF0D43',
              t3: 'FF5C9F',
              en: 'FF70A9',
            },
            primary: {
              t0: 'FF588A',
              t1: 'FE1C50',
              t2: 'FF0D43',
              t3: 'FF5C9F',
              m0: 'FF70A9',
              m1: 'FF70A9',
              en: 'FF70A9',
            },
            sigil: {
              t0: '3F9FB7',
              t1: '808080',
              t2: 'BABABA',
              t3: '808080',
              en: 'FFBA80',
            },
            attachments: {
              t0: 'FF588A',
              t1: 'FE1C50',
              t2: 'FF0D43',
              t3: 'FF5C9F',
              en: 'FF70A9',
            },
          },
        }), 'Invalid parsing of warframe data',
      );
    });

    it('should handle an unknown warframe id', () => {
      assert.deepEqual(new Warframe({ uniqueName: 'UnknownFrame' }).warframe, { uniqueName: 'UnknownFrame' });
    });

    it('should handle an unknown cosmetic id', () => {
      assert.deepEqual(new Warframe({ skins: [{ uniqueName: 'UnknownCosmetic' }] }).cosmetics, [{ uniqueName: 'UnknownCosmetic' }]);
    });
  });
});
