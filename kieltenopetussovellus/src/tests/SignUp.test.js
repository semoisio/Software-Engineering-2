import { render, screen,cleanup, fireEvent,waitFor } from '@testing-library/react';
import App from '../App';


test('renders signup component after clicking signup button', async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('navbarBtnLink2'));
    
    const element = await waitFor(() => screen.getByTestId("signupcontainer"))
    
    expect(element).toBeInTheDocument();
  });
