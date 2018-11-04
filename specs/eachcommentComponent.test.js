/* esline-env jest */
/* esline react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';
import { shallow, mount } from './enzyme';
import EachComment from '../client/components/eachcomment.jsx';

describe('Each Comment Component ', () => {
  it('render correctly Each Comment Component', () => {
    const EachCommentComponent = mount(<EachComment />);
    expect(EachCommentComponent).toMatchSnapshot();
  });
  test('render basic component', () => {
    const tree = renderer.create(<EachComment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
