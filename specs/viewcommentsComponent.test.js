/* esline-env jest */
/* esline react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';
import { shallow, mount } from './enzyme';
import ViewComments from '../client/components/viewcomments.jsx';

describe('View Comment Modules', () => {
  it('render correctly View Comments Component', () => {
    const ViewCommentsComponent = mount(<ViewComments />);
    expect(ViewCommentsComponent).toMatchSnapshot();
  });
  test('render basic component', () => {
    const tree = renderer.create(<ViewComments />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
