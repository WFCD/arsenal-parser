import { assert } from 'chai';

// Player.js testing
import WarframePlayer from '../../src/Player.js';
import { marshall } from '../utils.js';

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
      const expectedPlayer = {
        name: 'MainlandHero',
        masteryRank: 29,
        lastUpdated: new Date('2020-07-24T01:53:11.000Z').toJSON(),
        glyph: {
          uniqueName: '/Lotus/Types/StoreItems/AvatarImages/FanChannel/AvatarImageArgonSix',
          name: 'Argonsix Glyph',
          description: 'A Glyph for your profile.',
          type: 'Glyph',
          imageName: 'argonsix-glyph-e0109dbf33.png',
          category: 'Glyphs',
          tradable: false,
          masterable: false,
        },
        focusSchool: 'Vazarin',
      };

      const player = new WarframePlayer(samplePlayer);
      assert.equal(player.name, samplePlayer.playerName, 'Name match');
      assert.equal(player.masteryRank, samplePlayer.masteryRank, 'mastery rank!');
      assert.equal(player.glyph.name, expectedPlayer.glyph.name, 'glyph');
      assert.equal(player.lastUpdated.toJSON(), expectedPlayer.lastUpdated);
      assert.equal(player.focusSchool, expectedPlayer.focusSchool, 'focus');
      assert.deepEqual(marshall(player), expectedPlayer, 'Player object invalid');
    });

    it('should handle an unknown glyph', () => {
      assert.equal(
        new WarframePlayer({ glyph: 'UnknownGlyph' }).glyph,
        'UnknownGlyph',
        'Unknown glyph incorrectly handled'
      );
    });
  });
});
