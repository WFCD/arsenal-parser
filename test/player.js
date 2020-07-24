'use strict';

const { assert } = require('chai');

// Player.js testing
const WarframePlayer = require('../src/Player.js');

describe('WarframePlayer', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      const samplePlayer = {
        playerName: 'MainlandHero',
        masteryRank: 29,
        lastUpdated: 1595555591,
        glyph: '/Lotus/Types/StoreItems/AvatarImages/FanChannel/AvatarImageArgonSix',
        focus: '/Lotus/Upgrades/Focus/Defense/DefenseFocusAbility',
      };

      const player = new WarframePlayer(samplePlayer);
      assert.equal(
        JSON.stringify(player),
        JSON.stringify({
          name: 'MainlandHero',
          masteryRank: 29,
          lastUpdated: '2020-07-24T01:53:11.000Z',
          glyph: {
            uniqueName: '/Lotus/Types/StoreItems/AvatarImages/FanChannel/AvatarImageArgonSix',
            name: 'Argonsix Glyph',
            description: 'A Glyph for your profile.',
            type: 'Glyph',
            imageName: 'argonsix-glyph.png',
            category: 'Glyphs',
            tradable: false,
          },
          focusSchool: 'Varazin',
        }), 'Player object invalid',
      );
    });

    it('should handle a unknown glyph', () => {
      assert.equal(new WarframePlayer({ glyph: 'UnknownGlyph' }).glyph, 'UnknownGlyph', 'Unknown glyph incorrectly handled');
    });
  });
});
