/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import helpers from '../client/helpers/commentHelpers.js';

describe('helper functions', () => {
  test('Grab a random song time', () => {
    expect(typeof helpers.postSongTime(300) === 'number').toBe(true);
  });
  test('Convert time to String', () => {
    const string = '5:00';
    expect(typeof helpers.convertTime(300) === 'string').toBe(true);
    expect(helpers.convertTime(300)).toBe(string);
  });
  test('Convert time to String', () => {
    const string = '5:01';
    expect(typeof helpers.convertTime(301) === 'string').toBe(true);
    expect(helpers.convertTime(301)).toBe(string);
  });
});
