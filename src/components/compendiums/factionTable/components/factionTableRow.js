// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@mui/styles";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
import {
  renderBooleanAsIcon,
  renderMagicPoints,
  renderSpecialRules,
  renderCommandPoints,
  renderUnitTypeName,
  renderEffectiveness_1,
  renderEffectiveness_2,
} from "../depencies/factionTableFunctions";
import CardButton from "./CardButton";
import RowLock from "./RowLock";

const useStyles = makeStyles({
  tableRow: {
    fontFamily: "jaapokkiRegular",
    "&:hover": {
      backgroundColor: "#ac6725",
    },
  },
});

const FactionTableRow = (props) => {
  const classes = useStyles();
  const TC = useContext(TableContext);

  return (
    <tr key={props.rowNumber} className={classes.tableRow}>
      <td></td>
      <td>
        <RowLock unit={props.unit} />
      </td>
      {TC.columns[0].displayed ? (
        <td>
          <CardButton unit={props.unit} />
        </td>
      ) : null}

      {TC.columns[1].displayed ? <td>{props.unit.faction}</td> : null}
      {TC.columns[2].displayed ? <td>{props.unit.subFaction}</td> : null}
      {TC.columns[3].displayed ? <td>{props.unit.unitName}</td> : null}
      {TC.columns[4].displayed ? <td>{renderUnitTypeName(props.unit.unitType)}</td> : null}
      {TC.columns[5].displayed ? <td>{props.unit.numberOfElements}</td> : null}
      {TC.columns[6].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.standardBearer)}</td> : null}
      {TC.columns[7].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.musician)}</td> : null}
      {TC.columns[8].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.wedgeFormation)}</td> : null}
      {TC.columns[9].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.skirmishFormation)}</td> : null}
      {TC.columns[10].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.squareFormation)}</td> : null}
      {TC.columns[11].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.horde)}</td> : null}
      {TC.columns[12].displayed ? <td>{props.unit.move}</td> : null}
      {TC.columns[13].displayed ? <td>{props.unit.charge}</td> : null}
      {TC.columns[14].displayed ? <td>{props.unit.skirmish}</td> : null}
      {TC.columns[15].displayed ? <td>{props.unit.hold_maneuvers}</td> : null}
      {TC.columns[16].displayed ? <td>{props.unit.unitSize}</td> : null}
      {TC.columns[17].displayed ? <td>{props.unit.armourRange}</td> : null}
      {TC.columns[18].displayed ? <td>{props.unit.armourMelee}</td> : null}
      {TC.columns[19].displayed ? <td>{props.unit.weapon1Name + " " + props.unit.weapon1}</td> : null}
      {TC.columns[20].displayed ? <td>{props.unit.weapon2Name + " " + props.unit.weapon2}</td> : null}
      {TC.columns[20].displayed ? <td>{props.unit.weapon3Name + " " + props.unit.weapon3}</td> : null}
      {TC.columns[21].displayed ? <td>{props.unit.rangedWeapon}</td> : null}
      {TC.columns[22].displayed ? <td>{props.unit.skillMelee}</td> : null}
      {TC.columns[23].displayed ? <td>{props.unit.skillRange}</td> : null}
      {TC.columns[24].displayed ? <td>{props.unit.initiative}</td> : null}
      {TC.columns[25].displayed ? <td>{renderCommandPoints(props.unit.commandStars)}</td> : null}
      {TC.columns[26].displayed ? <td>{renderMagicPoints(props.unit.magic)}</td> : null}
      {TC.columns[27].displayed ? <td>{props.unit.controlZone_OverRun}</td> : null}
      {TC.columns[28].displayed ? <td>{props.unit.hitpoints}</td> : null}
      {TC.columns[29].displayed ? <td>{props.unit.fear}</td> : null}
      {TC.columns[30].displayed ? <td>{props.unit.moral1}</td> : null}
      {TC.columns[31].displayed ? <td>{props.unit.moral2}</td> : null}
      {TC.columns[32].displayed ? <td>{renderSpecialRules(props.unit.specialRules)}</td> : null}
      {TC.columns[33].displayed ? <td>{props.unit.points}</td> : null}
      {TC.columns[33].displayed ? <td>{renderEffectiveness_1(props.unit)}</td> : null}
      {TC.columns[33].displayed ? <td>{renderEffectiveness_2(props.unit)}</td> : null}
    </tr>
  );
};

export default React.memo(FactionTableRow);
