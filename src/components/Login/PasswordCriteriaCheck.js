/**
 * Every password in the app must pass the following criteria:
 * - at least 8 characters long
 * - contain letters, at least one number and one special character
 * - cotain at least one capitalized letter
 */

const passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

/**
 * Function tests via RegEx if the password is valid.
 * @param {String} pw
 * @returns true, if the password fullfills the criteria.
 */
export const isThePasswordValid = (pw) => {
  return passwordRegEx.test(pw);
};


