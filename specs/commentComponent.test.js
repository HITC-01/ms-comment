import Comment from '../client/components/comment.jsx';
const instanceComment = new Comment();

describe('test functions inside comment component', () => {
    test('Grab a random song time', () => {
        expect(typeof instanceComment.postSongTime(300) === 'number').toBe(true);
  });
});
