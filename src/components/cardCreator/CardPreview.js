// react
import React, { Fragment, useContext } from "react";
// material ui
import { Divider } from "@mui/material";
// components and functions
import CardFront from "../shared/statCards/cardComponents/CardFront";
import CardBack from "../shared/statCards/cardComponents/CardBack";
// providers and contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const CardPreview = () => {
  const CCC = useContext(CardCreationContext);

  return (
    <Fragment>
      {CCC.unit !== undefined ? <CardFront unit={CCC.unit} /> : null}

      <Divider
        sx={{
          width: "45%",
          paddingTop: "4em",
        }}
      />
      {CCC.unit !== undefined ? <CardBack unit={CCC.unit} /> : null}
    </Fragment>
  );
};

export default CardPreview;
