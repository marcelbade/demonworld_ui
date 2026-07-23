// react
import React, { useContext, useEffect } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Button, Grid, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
import { randomRgbValue } from "../../../util/utilityFunctions";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";
import { unitBluePrint } from "../unitBluePrint";
// Icons
import RemoveCircleOutlined from "@mui/icons-material/RemoveCircleOutlined";

/**
 * Component that gives the option to create multiple unit cards for a
 * singe unit.
 * @returns A JSX component
 */
const MultiCardCreator = () => {
  const theme = useTheme();
  const CCC = useContext(CardCreationContext);

  /**
   * turn the first (the original) card into the first multi stat card when the toggle is
   * clicked for the first time.
   */
  useEffect(() => {
    if (CCC.unitCards[0].isMultiStateUnit && CCC.unitCards.length === 1) {
      let tempArray = [...CCC.unitCards];

      tempArray[0].multiCardName = tempArray[0].unitName;
      tempArray[0].belongsToUnit = tempArray[0].unitName;

      CCC.setUnitCards(tempArray);
    }
  }, [CCC.unitCards[0].isMultiStateUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function changes the name of one of the multi stat cards.
   * Function usses the array index to determine which card is being edited.
   * @param {integer} cardNumber array index
   * @param {object} event
   */
  const changeMultiCardName = (cardNumber, event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[cardNumber].multiCardName = event.target.value;

    CCC.setUnitCards([...tempArray]);
  };

  /**
   * Function adds a unit card to the multi card unit.
   */
  const addMultiCard = () => {
    let tempArray = [...CCC.unitCards];
    tempArray.push({
      ...unitBluePrint, //
      unitName: tempArray[0].unitName,
      multiCardName: "",
      belongsToUnit: tempArray[0].unitName,
      isMultiStateUnit: true,
      isAdditionalUnitCard: true,
      color: randomRgbValue(),
    });

    CCC.setUnitCards([...tempArray]);
  };

  /**
   * Function removes unit card from multi card unit.
   * @param {integer} cardNumber
   */
  const RemoveMultiCard = (cardNumber) => {
    let tempArray = [...CCC.unitCards];
    tempArray.splice(cardNumber, 1);
    CCC.setUnitCards([...tempArray]);
  };

  return CCC.unitCards[0].isMultiStateUnit ? (
    <Grid
      container //
      direction={{ xs: "column", alignItems: "center" }}
      sx={theme.palette.cardCreator.box}
    >
      <Button
        onClick={addMultiCard} //
        sx={{ width: "24em" }}
      >
        {CREATOR.ADD_MULTICARD}
      </Button>
      {CCC.unitCards.map((card, i) => (
        <Stack
          direction={"row"} //
          sx={{ marginTop: "1em" }}
          key={i}
        >
          <CreatorTextInput
            id={card.unitName} //
            value={card.multiCardName}
            onChange={(event) => {
              changeMultiCardName(i, event);
            }}
            label={card.unitName}
          />
          {/* the first (original) unit card must not be removed */}
          {i > 0 ? (
            <IconButton
              onClick={() => {
                RemoveMultiCard(i);
              }} //
              sx={{ marginLeft: "1em" }}
            >
              <RemoveCircleOutlined />
            </IconButton>
          ) : null}
        </Stack>
      ))}
    </Grid>
  ) : null;
};

export default MultiCardCreator;
