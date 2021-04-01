/**
 * Calculates and returns rating of given ratingarray. Returns null if array's length is zero.
 * @param {Array} ratingArray 
 */
export const calculateRating = (ratingArray) => {
    if (ratingArray.length > 0) {
        let sum = 0;
        var i;
        for (i = 0; i < ratingArray.length; i++) {
            sum += ratingArray[i].rating;
        }
        return sum / ratingArray.length;
    }
    else {
        return null;
    }
}

/**
 * Adds user's rating to given array. If the user has already rated, only updates the value.
 * @param {String} username 
 * @param {Integer} value 
 * @param {Array} ratingArray 
 */
export const addRating = (username, value, ratingArray) => {
    let index = -1;
    var i;
    for (i = 0; i < ratingArray.length; i++) {
        if (ratingArray[i].username === username) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        ratingArray.push({ username: username, rating: value });
    }
    else {
        ratingArray[i].rating = value;
    }
}

export const getRating = (username, ratingArray) => {
    if (ratingArray) {
        let found = ratingArray.find(x => x.username === username);
        if (found) {
            return found.rating;
        }
        else {
            return -1;
        }
    }
    else {
        return -1;
    }
}