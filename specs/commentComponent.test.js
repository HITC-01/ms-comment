import Comment from '../client/components/comment.jsx';

describe('test functions inside comment component', () => {
    test('Grab a random song time', () => {
        expect(Comment.postSongTime(300)).toBe(Number);
  });
});
