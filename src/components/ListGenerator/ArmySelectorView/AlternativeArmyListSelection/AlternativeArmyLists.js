// React
import { useContext, useState } from "react";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelector";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { useEffect } from "react";

const AlternativeArmyLists = () => {
  const ALC = useContext(AlternativeListContext);

  const [alternatives, setAlternatives] = useState([]);

  /**
   * Function implements a filter logic so that the last picked value is not displayed as an option in the dropdown menu(s).
   * @param {String} lastChoice
   */
  const setUpNextDropDown = (lastChoice) => {
    const temp = [alternatives];

    for (let i = 0; i < ALC.numberOfAlternativeChoices; i++) {
      temp[i] = {
        values: ALC.alternateListSubFactions.filter((a) => a !== lastChoice),
      };
    }

    setAlternatives([...temp]);
  };

  // set up correct dropdown value after first render.
  useEffect(() => {
    setUpNextDropDown(undefined);
  }, [ALC.alternateListSubFactions]); // eslint-disable-line react-hooks/exhaustive-deps

  return ALC.armyHasAlternativeLists
    ? Array(ALC.numberOfAlternativeChoices)
        .fill()
        .map((i, j) => {
          return (
            <AlternativeArmyListSelector //
              key={j}
              alternatives={
                alternatives[i] !== undefined //
                  ? alternatives[i].values
                  : ALC.numberOfAlternativeChoices
              }
              isArmySelector={false}
              setUpNextDropDown={setUpNextDropDown}
              selectorNumber={i}
            />
          );
        })
    : null;
};

export default AlternativeArmyLists;
