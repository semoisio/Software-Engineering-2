/**
 * Function checks is value empty. If not it adds vallue to query.
 * 
 * 
 * @param {Array of searchvalues} values 
 * @param {Arrays of names for searchvalues} keys 
 * 
 * @returns Query string
 */
export const buildQuery = (values, keys) => {
    let queryString = "";

    if (values[2] === "none") {
        values[2] = "";
    }

    for (let i = 0; i < values.length; i++) {

        if (values[i] !== "") {
            if (queryString !== "") {
                queryString = queryString.concat("&" + keys[i] + "=" + values[i])
            }
            else {
                queryString = queryString.concat("?" + keys[i] + "=" + values[i]);
            }
        }
    }
    return queryString;
}

/**
 * Functions checks how many 20 piece parts array need to split.
 * Splits audio array in 20 audio sections.
 * 
 * @param {Array of audios} audios 
 * @returns 
 */
export const splitAudios = (audios) => {

    //Return empty array if empty
    if (audios.length <= 0) {
        return [];
    }
    //Check how many parts needed
    //let parts = howManyParts(audios);
    let pituus = audios.length;

    let returnArray = [];
    //If parts 1 return audios 
    // if (parts === 1) {
    //     returnArray.push(audios)
    //     return returnArray;
    // }

    let audioIndex = 0;
    while (pituus > 0) {
        let apuT = []; // helper array

        //20 laps 
        for (let i = 0; i < 20 && i < pituus; i++) {
            apuT.push(audios[audioIndex]);
            audioIndex++;
        }
        returnArray.push(apuT);
        pituus = pituus - 20;
    }
    return returnArray;


}


export const howManyParts = (audios) => {
    let parts = 0;
    let pituus = audios.length;
    if (pituus <= 0) {
        return 0;
    }

    for (parts; pituus > 0; parts++) {
        pituus = pituus - 20;
    }

    return parts;
}

