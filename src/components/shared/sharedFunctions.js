

/**
 *  Function is a compact UUID generator. Credit to 
 *  https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * 
 * @returns String
 */
export const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
