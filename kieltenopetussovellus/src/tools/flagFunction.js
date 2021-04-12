import fin from '../images/flags/fin.jpg';
import eng from '../images/flags/eng.jpg';
import esp from '../images/flags/esp.jpg';
import ger from '../images/flags/ger.jpg';
import swe from '../images/flags/swe.jpg';

export const getFlag = (flag) => {
    switch (flag) {
        case "en":
            return eng;
        case "fi":
            return fin;
        case "esp":
            return esp;
        case "ger":
            return ger;
        case "swe":
            return swe;

        default:
            return eng;
    }
}