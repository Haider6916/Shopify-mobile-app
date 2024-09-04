/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/root/App';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {NavigationContainer} from '@react-navigation/native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App module test suit', () => {
  afterAll(() => {
    jest.useFakeTimers();
    jest.runAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.runAllTimers();
  });

  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>,
    );
  });
});
