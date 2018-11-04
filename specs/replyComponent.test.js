/* esline-env jest */
/* esline react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';
import { shallow, mount } from './enzyme';
import Reply from '../client/components/moreModal.jsx';

describe('Reply Component', () => {
  it('render correctly Reply Component for each Comment Component', () => {
    const ReplyComponent = mount(<Reply />);
    expect(ReplyComponent).toMatchSnapshot();
  });
  test('render basic component', () => {
    const tree = renderer.create(<Reply />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
