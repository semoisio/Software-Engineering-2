/**
 * Function checks is value empty. If not it adds vallue to query.
 * 
 * 
 * @param {Array of searchvalues} values 
 * @param {Arrays of names for searchvalues} keys 
 * 
 * @returns Query string
 */
export const buildQuery = (values, keys) =>{
    let queryString = "";
    
    if(values[2] === "none"){
        values[2]= "";
    }

    for(let i = 0; i < values.length ; i++){

        if (values[i] !== ""){
            if(queryString !== ""){
                queryString = queryString.concat("&"+keys[i]+"="+values[i]) 
            }
            else{
                queryString = queryString.concat("?"+keys[i]+"="+values[i]);
            }     
        }
    }
    return queryString;
}