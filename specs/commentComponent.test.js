/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';
import { shallow, mount } from './enzyme';
import Comment from '../client/components/comment.jsx';
import MoreModal from '../client/components/moreModal';
const instanceComment = new Comment(); // create a new instance of comment to access methods

describe('Comment (Create) Component', () => {
  it('render correctly Comment Component', () => {
    const CommentComponent = mount(<Comment />);
    expect(CommentComponent).toMatchSnapshot();
  });
  test('render basic component', () => {
    const tree = renderer.create(<Comment />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('handle toggle functions', () => {
    const instance = mount(<Comment />).instance();
    instance.toggleLike();
    expect(instance.state.like).not.toBe(false);
    instance.toggleRepost();
    expect(instance.state.repost).not.toBe(false);
    instance.toggleShare();
    expect(instance.state.share).not.toBe(false);
    instance.toggleModal();
    expect(instance.state.show).not.toBe(false);
    instance.toggleModal();
    expect(instance.state.show).not.toBe(true);
  });
  test('grab artist info', () => {
    const instance = mount(<Comment />).instance();
    instance.grabArtistInfo();
    expect(instance.state.artistInfo).not.toBe([]);
  });
  test('grab song info', () => {
    const instance = mount(<Comment />).instance();
    instance.grabSongInfo(5);
    expect(instance.state.songInfo).not.toBe([]);
  });
  it('textbox testing', () => {
    const wrapper = shallow(<Comment />);
    expect(wrapper.find('#text')).toHaveLength(1); // Is a textbox present?
    const textBox = wrapper.find('#text');
    textBox.simulate('change', { target: { value: 'I love this freaking song' } });
    expect(wrapper.state().commentText).toBe('I love this freaking song');
  });
});






/* 
it('render correctly text component', () => {  
    const TextInputComponent = renderer.create(<TextInput />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
 Jest Snapshot v1, https://goo.gl/fbAQLP
exports[`Render TextInput correctly component 1`] = `  
<input  
  className="input-custom"
  disabled={undefined}
  id={undefined}
  name={undefined}
  onBlur={undefined}
  onChange={[Function]}
  pattern={undefined}
  placeholder={undefined}
  readOnly={false}
  required={undefined}
  type="text"
  value={undefined}
/>
`;

it('render correctly date component', () => {  
    const DateInputComponent = renderer.create(<DateInput />).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
});


it('check the type of value', () => {  
    const props = {
            value: '10.03.2018'
        },
        DateInputComponent = mount(<DateInput {...props} />);
    expect(DateInputComponent.prop('value')).toBeString();
});

it('render date input correctly with null value', () => {  
    const props = {
            value: null
        },
        DateInputComponent = mount(<DateInput {...props} />);
    expect((DateInputComponent).prop('value')).toEqual(null);
});


it('check the type of value', () => {  
    const props = {
            value: '10.03.2018'
        },
        DateInputComponent = mount(<DateInput {...props} />);
    expect(DateInputComponent.prop('value')).toBeString();
});

it('check the onChange callback', () => {  
    const onChange = jest.fn(),
        props = {
            value: '20.01.2018',
            onChange
        },
        DateInputComponent = mount(<DateInput {...props} />).find('input');
    DateInputComponent.simulate('change', { target: {value: moment('2018-01-22')} });
    expect(onChange).toHaveBeenCalledWith('22.01.2018');
});

it('check DatePicker popup open', () => {  
    const DateComponent = mount(<DateInput />),
        dateInput = DateComponent.find("input[type='text']");
    dateInput.simulate('click');
    expect(DateComponent.find('.react-datepicker')).toHaveLength(1);
});


*/
