import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import LanguageAppHome from '../components/languageAppPage/LanguageAppHome';


test('renders LanguageAppHome component', () => {
    render(<LanguageAppHome />);
    const element = screen.getByTestId("languageContainer")
    expect(element).toBeInTheDocument();
  });


  test('renders new recordingpage after click', () => {
    render(<LanguageAppHome />);

    fireEvent.click(screen.getByTestId('navBtnRecording'));
    const element = screen.getByTestId("recordingContainer")
    expect(element).toBeInTheDocument();
  });

  test('renders profile after click', () => {
    render(<LanguageAppHome />);

    fireEvent.click(screen.getByTestId('navBtnProfile'));
    const element = screen.getByTestId("profileContainer")
    expect(element).toBeInTheDocument();
  });

  test('renders signout after click', () => {
    render(<LanguageAppHome />);

    fireEvent.click(screen.getByTestId('navBtnSignout'));
    const element = screen.getByTestId("signoutContainer")
    expect(element).toBeInTheDocument();
  });

  test('renders search after click', () => {
    render(<LanguageAppHome />);

    fireEvent.click(screen.getByTestId('navBtnSearch'));
    const element = screen.getByTestId("searchContainer")
    expect(element).toBeInTheDocument();
  });

