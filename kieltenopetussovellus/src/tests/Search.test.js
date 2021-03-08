import { render, screen,cleanup, fireEvent,waitFor } from '@testing-library/react';
import Search from '../components/languageAppPage/searchElement/Search';


  test('renders searh component', () => {
    render(<Search />);
    const element = screen.getByTestId("searchContainer")
    expect(element).toBeInTheDocument();
  });