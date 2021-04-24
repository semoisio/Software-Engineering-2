import { render, screen,cleanup, fireEvent } from '@testing-library/react';
import SignUp from '../components/signUp/SignUp';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

//afterEach(cleanup);

test('renders signup component after clicking signup button',  () => {
    render(<Router><Switch><SignUp/></Switch></Router>);
    const element = screen.getByTestId("signupcontainer")
    expect(element).toBeInTheDocument();
  });


test('Homepage isnt rendered anymore',  () => {
  render(<Router><Switch><SignUp/></Switch></Router>);
  const element = screen.getByTestId("signupcontainer")
  expect(element).toBeInTheDocument();   
});

test('Homepage renders again',  () => {
});