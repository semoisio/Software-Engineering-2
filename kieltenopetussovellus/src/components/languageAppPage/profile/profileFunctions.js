import { languageOptions } from '../../../tools/defaultOptions';

/**
 * Functions uses languageOptions array. It searches through array and returns corroct label for 2 digit code.
 * @param {String} value 
 * @returns 
 */
export const foundCorrectLabel = (value) => {
    let palautus = ""
    languageOptions.forEach(element => {
        if (element.value === value) {
            palautus = element.label
        }
    });
    return palautus;

}

/**
 * Function checks does the passwords match char by char
 * @param {String} new1 
 * @param {String} new2 
 * @returns 
 */
export const checkMatch = (new1, new2) => {
    if(new1.length === new2.length){
        for (let i = 0; i < new1.length; i++) {
            if (new1.charAt(i) != new2.charAt(i)) {
                return false;
            }
        }
        return true;
    }else{
        return false;
    } 
}