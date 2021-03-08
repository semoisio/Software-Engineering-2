import { render, screen,cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import { shallow } from 'enzyme';

//afterEach(cleanup);

test('renders signup component after clicking signup button', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Join now'));
    
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

    fireEvent.click(screen.getByTestId('navbarLogo'));
    const element = screen.getByTestId("homepage");
    expect(element).toBeInTheDocument();
  });