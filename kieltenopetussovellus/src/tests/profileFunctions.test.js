import {foundCorrectLabel } from '../components/languageAppPage/profile/profileFunctions';

test('Function returs correct label English', () => {
    expect(foundCorrectLabel("en")).toBe("English");
  });

  test('Function returs correct label Finnish', () => {
    expect(foundCorrectLabel("fi")).toBe("Finnish");
  });


   test('Function returs empty string ', () => {
    expect(foundCorrectLabel("fin")).toBe("");
  });