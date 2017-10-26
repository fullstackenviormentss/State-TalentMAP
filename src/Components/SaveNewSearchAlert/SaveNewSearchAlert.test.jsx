import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SaveNewSearchAlert from './SaveNewSearchAlert';

describe('SaveNewSearchAlertComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchAlert
        newSavedSearchSuccess={{ type: 'type', text: 'text' }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchAlert
        newSavedSearchSuccess={{ type: 'type', text: 'text' }}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
