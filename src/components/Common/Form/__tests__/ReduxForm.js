/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';

import Error from '../Error';
import Form from '../Form';
import Information from '../Information';
import Input from '../Input';
import Label from '../Label';
import Success from '../Success';
import TextArea from '../TextArea';
import Warning from '../Warning';
import rules from '../rules';

describe('Error', () => {
  test('renders', () => {
    const props = {
      error: 'test',
      touched: true,
    };

    const Component = shallow(<Error {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Success', () => {
  test('renders', () => {
    const props = {
      success: 'test',
      touched: true,
    };

    const Component = shallow(<Success {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Warning', () => {
  test('renders', () => {
    const props = {
      warning: 'test',
      touched: true,
    };

    const Component = shallow(<Warning {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Form', () => {
  test('renders', () => {
    const props = {
      warning: null,
      success: null,
      error: null,
      onSubmit: jest.fn(),
    };

    const Component = shallow(<Form {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Information', () => {
  test('renders', () => {
    const props = {
      information: 'test',
    };

    const Component = shallow(<Information {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Input', () => {
  test('renders', () => {
    const props = {
      label: 'test',
      type: 'text',
      placeholder: 'test',
      input: {
        value: 'text',
        onChange: jest.fn(),
      },
      meta: {
        touched: false,
        warning: null,
        error: null,
      },
    };

    const Component = shallow(<Input {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('Label', () => {
  test('renders', () => {
    const props = {
      label: 'test',
    };

    const Component = shallow(<Label {...props} />);
    expect(Component).toMatchSnapshot();
  });
});

describe('TextArea', () => {
  test('renders', () => {
    const props = {
      label: 'test',
      meta: {
        touched: false,
        warning: null,
        error: null,
      },
      input: {
        value: 'text',
        onChange: jest.fn(),
      },
    };

    const Component = shallow(<TextArea {...props} />);
    expect(Component).toMatchSnapshot();
  });
});
