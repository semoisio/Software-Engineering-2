import {buildQuery, howManyParts,splitAudios} from '../components/languageAppPage/searchElement/searchFunctions';

test('query builder works correctly with empty query', () => {
    let t1 = ["", ""]
    let t2 = ["Testi1", "Testi2"]
    expect(buildQuery(t1, t2)).toBe("");
  });
  

test('query builder works correctly with one string', () => {
    let t1 = ["testi", ""]
    let t2 = ["Testi1", "Testi2"]
    expect(buildQuery(t1, t2)).toBe("?Testi1=testi");

    t1 = ["", "testi"]
    t2 = ["Testi1", "Testi2"]
    expect(buildQuery(t1, t2)).toBe("?Testi2=testi");
});

test('query builder works correctly with multiple string', () => {
  let t1 = ["testi", "testi"]
  let t2 = ["Testi1", "Testi2"]
  expect(buildQuery(t1, t2)).toBe("?Testi1=testi&Testi2=testi");
})

test('howManyParts works correctly with 0 ', () => {
  let t1 = []
  expect(howManyParts(t1)).toBe(0);
})

test('howManyParts works correctly more than 20 ', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  expect(howManyParts(t1)).toBe(2);
})
test('howManyParts works correctly more than 40 ', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  expect(howManyParts(t1)).toBe(3);
})
test('howManyParts works correctly with 40 ', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10]
  expect(howManyParts(t1)).toBe(2);
})

test('splitAudios works correctly with empty array', () => {
  let t1 = []
  expect(splitAudios(t1).length).toBe(0);
})

test('splitAudios works correctly with less than 20', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  expect(splitAudios(t1).length).toBe(1);
})

test('splitAudios works correctly with more than 20', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  expect(splitAudios(t1).length).toBe(2);
})
test('splitAudios works correctly with more than 40', () => {
  let t1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  expect(splitAudios(t1).length).toBe(3);
})