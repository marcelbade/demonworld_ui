import { useEffect } from "react";

/**
 * Custom hook that contains the logic for key bindings. In order to work properly and
 * not cause a state bug, the hook requires two parameters:
 * - an array of objects. Each object has two properties: an array of key names
 *   (e.g. "ArrowLeft", "ArrowDown") and the function called when pressing the keys.
 * - the state of the page using this hook. This is necessary to avoid a stale closure
 *   by rebinding the keys everytime the state changes.
 * @param {[ {boundKeys: [keyboardKey], boundFunction: calledFunction]} } keyBindingArray
 * @param {*} state
 */
export const useKeybindings = (boundKeysAndActions, state) => {
  const currentlyPressedKeys = new Set();

  /**
   * Function checks whether the key pressed by the user is bound to a function.
   * @param {String[]} keyArray
   * @returns true, if currentlyPressedKeys contains any one of the keys in keyArray. Else it returns false.
   */
  const isBoundKeyPressed = (keyArray) => {
    for (const key of keyArray) {
      if (!currentlyPressedKeys.has(key)) return false;
    }
    return true;
  };

  /**
   * Function interecpts key press event, checks if the key is bound to a function and, if it is, calls the function,
   * @param {eventObj} event key event.
   */
  const bindingsKeyDown = (event) => {
    currentlyPressedKeys.add(event.key);
    boundKeysAndActions.forEach((boundKeyObj) => {
      if (isBoundKeyPressed(boundKeyObj.boundKeys)) {
        boundKeyObj.boundFunction();
      }
    });
  };

  /**
   * Function removes the key from the set holding all currently pressed keys,
   * once the user no longer presses it.
   * @param {eventObj} event
   */
  const bindingsKeyUp = (event) => {
    currentlyPressedKeys.delete(event.key);
  };

  // Adds event listeners to the current page's DOM on first page load.
  useEffect(() => {
    document.addEventListener("keydown", bindingsKeyDown);
    document.addEventListener("keyup", bindingsKeyUp);
    // cleanup
    return () => {
      document.removeEventListener("keydown", bindingsKeyDown);
      document.removeEventListener("keyup", bindingsKeyUp);
    };
  }, [JSON.stringify(state)]); // eslint-disable-line react-hooks/exhaustive-deps
};
