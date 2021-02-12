import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../utils/testUtils';
import App from '../App';
import { initialState } from '../redux/reducers';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />, { initialState })).toBeTruthy();
  });
});
