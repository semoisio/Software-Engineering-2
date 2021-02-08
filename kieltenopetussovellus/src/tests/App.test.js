import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';


test('renders app component', () => {
  render(<App />);
  const app = screen.getByTestId("app")
  expect(app).toBeInTheDocument();
});

test('renders homepage', () => {
  render(<App />);
  const element = screen.getByTestId("homepage")
  expect(element).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const element = screen.getByTestId("navbarNav")
  expect(element).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const element = screen.getByTestId("navbarNav")
  expect(element).toBeInTheDocument();
});

test('renders navbarContainer', () => {
  render(<App />);
  const element = screen.getByTestId("navbarContainer")
  expect(element).toBeInTheDocument();
});

test('renders navbarLogo', () => {
  render(<App />);
  const element = screen.getByTestId("navbarLogo")
  expect(element).toBeInTheDocument();
});

test('renders navbarHamburger slot and its display none', () => {
  render(<App />);
  const element = screen.getByTestId("navbarIcon", {display: "none"})
  expect(element).toBeInTheDocument();
});

test('renders hamburger icon', () => {
  render(<App />);
  const element = screen.getByTestId("navbarBurger")
  expect(element).toBeInTheDocument();
});

test('renders Navbar menu', () => {
  render(<App />);
  const element = screen.getByTestId("navbarMenu")
  expect(element).toBeInTheDocument();
});

test('renders Navbar menu items', () => {
  render(<App />);
  const element = screen.getByTestId("navbarMenuItem")
  expect(element).toBeInTheDocument();
});

test('renders Navbar menu item home', () => {
  render(<App />);
  const element = screen.getByTestId("navbarLink")
  expect(element).toBeInTheDocument();
});

test('renders Navbar button slots', () => {
  render(<App />);
  const element = screen.getByTestId("navbarBtn")
  expect(element).toBeInTheDocument();
});

test('renders Navbar button signin', () => {
  render(<App />);
  const element = screen.getByTestId("navbarBtnLink1")
  expect(element).toBeInTheDocument();
});

test('renders Navbar button signip', () => {
  render(<App />);
  const element = screen.getByTestId("navbarBtnLink2")
  expect(element).toBeInTheDocument();
});


test('renders sidebar to display none', () => {
  render(<App />);
  const element = screen.getByTestId("sidebarcontainer", {display: "none"});
  expect(element).toBeInTheDocument();
});

test('Sidebar toggle works', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('navbarIcon'))

  const element = screen.getByTestId("sidebarcontainer", {top: 0});
  expect(element).toBeInTheDocument();
});