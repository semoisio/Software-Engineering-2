import { languageOptions } from '../../../tools/defaultOptions';

export const foundCorrectLabel = (value) =>{
    let palautus = ""
    languageOptions.forEach(element => {
        if (element.value === value){
            palautus = element.label
        }
    });
    return palautus;
    
}