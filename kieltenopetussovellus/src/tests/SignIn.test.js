import { render, screen,cleanup, fireEvent,waitFor } from '@testing-library/react';
import App from '../App';


afterEach(cleanup);


test('renders signin component after clicking signin button', async () => {
  render(<App />);

    fireEvent.click(screen.getByText('Sign in'));
    
    const element = screen.getByTestId("signincontainer")
    
    expect(element).toBeInTheDocument();
  });


  test('Homepage isnt rendered anymore', async () => {

    render(<App />);
    const element = screen.queryByTestId("homepage");
    expect(element).toBeNull();
  });

  test('Homepage renders again', async () => {

    render(<App />);

    fireEvent.click(screen.getByTestId('navbarLogo'));
    const element = screen.getByTestId("homepage");
    expect(element).toBeInTheDocument();
  });