/* esline-env jest */
/* esline react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';
import { shallow, mount } from './enzyme';
import MoreModal from '../client/components/moreModal.jsx';

describe('More Modal Component', () => {
  it('render correctly MoreModal Component', () => {
    const MoreModalComponent = mount(<MoreModal />);
    expect(MoreModalComponent).toMatchSnapshot();
  });
  test('render basic component', () => {
    const tree = renderer.create(<MoreModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
