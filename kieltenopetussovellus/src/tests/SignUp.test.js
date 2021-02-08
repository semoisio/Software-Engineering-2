import { render, screen,cleanup, fireEvent,waitFor } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('renders signup component after clicking signup button', async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('navbarBtnLink2'));
    
    const element = screen.getByTestId("signupcontainer")
    
    expect(element).toBeInTheDocument();
  });


  test('Homepage isnt rendered anymore', async () => {

    render(<App />);
    const element = screen.queryByTestId("homepage");
    expect(element).toBeNull();
  });

  test('Homepage renders again', async () => {

    render(<App />);

    fireEvent.click(screen.getByTestId('signupicon'));
    const element = screen.getByTestId("homepage");
    expect(element).toBeInTheDocument();
  });