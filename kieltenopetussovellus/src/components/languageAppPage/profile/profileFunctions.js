import { languageOptions } from '../../../tools/defaultOptions';

export const foundCorrectLabel = (value) => {
    let palautus = ""
    languageOptions.forEach(element => {
        if (element.value === value) {
            palautus = element.label
        }
    });
    return palautus;

}

//Check does the passwords match
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