import { useEffect, useState } from "react";

/**
 * Custom hook encapsules logic and state for any carousel buttons in the app to keep it DRY.
 * Carousel buttons allow the user to cycle through a list, displaying one element at a time. 
 * This hook is meant to be used with the CarousellButton component.
 * @param {object} currentDisplayedElement - selected list element that is displayed
 * @param {function} setDisplayData - setter for the selected list element
 * @param {[object]} displayDataList - the array to be cycled trough
 * @returns
 */
const useCarouselButtons = (currentDisplayedElement, setDisplayData, displayDataList) => {
  const [elementNumber, setElementNumber] = useState(0);

  // rerender to correctly display the new unit, whenever the supplied unit changes.
  useEffect(() => {
    const temp = { ...currentDisplayedElement };
    setDisplayData(temp);
  }, [JSON.stringify(currentDisplayedElement)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function allows user to cycle through the multiple stat cards counter-clockwise.
   */
  const carouselForward = () => {
    if (elementNumber < displayDataList.length - 1) {
      setElementNumber(elementNumber + 1);
      setDisplayData(displayDataList[elementNumber + 1]);
    } else {
      setElementNumber(0);
      setDisplayData(displayDataList[0]);
    }
  };

  /**
   * Function allows user to cycle through the multiple stat cards clockwise.
   */
  const carouselBackward = () => {
    if (elementNumber > 0) {
      setElementNumber(elementNumber - 1);
      setDisplayData(displayDataList[elementNumber - 1]);
    } else {
      setElementNumber(displayDataList.length - 1);
      setDisplayData(displayDataList[displayDataList.length - 1]);
    }
  };

  return {
    carouselBackward: carouselBackward,
    carouselForward: carouselForward,
    currentDisplayedData: currentDisplayedElement,
    elementNumber: elementNumber,
  };
};

export default useCarouselButtons;
