import { render, screen, fireEvent } from '@testing-library/react';
import Errorpage from '../components/errorPage/Errorpage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../components/homePage/HomePage'
import SignUp from '../components/signUp/SignUp';


test('renders ErrorPage', () => {
    render(<Router><Errorpage /></Router>);
    const element = screen.getByTestId("errorpageContainer")
    expect(element).toBeInTheDocument();
});

test('renders HomePage after clicking the homepagelink', () => {
    render(<div><Router>
        <Errorpage />
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
        </Router></div>);
    fireEvent.click(screen.getByTestId('backHomeLink'));

    const element = screen.getByTestId("homepage")

    expect(element).toBeInTheDocument();
});

<Router>
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />

                /**Tämä aina viimeiseksi. Ohjaa virhe sivulle */
                <Route path="/" component={Errorpage} />
    </Switch>
</Router>