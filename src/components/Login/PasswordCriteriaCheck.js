
// This regex will enforce these rules:
//     At least one upper case English letter, (?=.*?[A-Z])
//     At least one lower case English letter, (?=.*?[a-z])
//     At least one digit, (?=.*?[0-9])
//     At least one special character, (?=.*?[#?!@$%^&*-])
//     Minimum eight in length .{8,} (with the anchors)

  
const passwordRegEx = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

/**
 * Function tests via RegEx if the password is valid.
 * @param {String} pw
 * @returns true, if the password fullfills the criteria.
 */
export const isThePasswordValid = (pw) => {
  return passwordRegEx.test(pw);
};


