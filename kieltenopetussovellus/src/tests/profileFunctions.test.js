import {foundCorrectLabel,checkMatch } from '../components/languageAppPage/profile/profileFunctions';

test('Function returs correct label English', () => {
    expect(foundCorrectLabel("en")).toBe("English");
  });

  test('Function returs correct label Finnish', () => {
    expect(foundCorrectLabel("fi")).toBe("Finnish");
  });


  test('Function returs empty string ', () => {
    expect(foundCorrectLabel("fin")).toBe("");
  });


  test('Match Function returs true', () => {
    expect(checkMatch("fi","fi" )).toBe(true);
  });

  test('Match Function returs false same lengt incorrect', () => {
    expect(checkMatch("fi","fu" )).toBe(false);
  });

  test('Match Function returs false not same lengt incorrect', () => {
    expect(checkMatch("fi","f" )).toBe(false);
  });