// React
import React from "react";
// Material UI
import { makeStyles } from "@mui/styles";
// components & functions
import { renderBooleanAsIcon, renderMagicPoints, renderSpecialRules, renderCommandPoints } from "../depencies/factionTableFunctions";
import CardButton from "./CardButton";

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

  return (
    <tr key={props.unit.unitName} className={classes.tableRow}>
      <td></td>
      {props.columns[0].displayed ? (
        <td>
          <CardButton
            toggleUnitCard={props.toggleUnitCard} //
            unit={props.unit}
            selectedStatCards={props.selectedStatCards}
          />
        </td>
      ) : null}

      {props.columns[1].displayed ? <td>{props.unit.faction}</td> : null}
      {props.columns[2].displayed ? <td>{props.unit.subFaction}</td> : null}
      {props.columns[3].displayed ? <td>{props.unit.unitName}</td> : null}
      {props.columns[4].displayed ? <td>{props.unit.unitType}</td> : null}
      {props.columns[5].displayed ? <td>{props.unit.numberOfElements}</td> : null}
      {props.columns[6].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.standardBearer)}</td> : null}
      {props.columns[7].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.musician)}</td> : null}
      {props.columns[8].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.wedgeFormation)}</td> : null}
      {props.columns[9].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.skirmishFormation)}</td> : null}
      {props.columns[10].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.squareFormation)}</td> : null}
      {props.columns[11].displayed ? <td>{renderBooleanAsIcon(props.unit.numberOfElements, props.unit.horde)}</td> : null}
      {props.columns[12].displayed ? <td>{props.unit.move}</td> : null}
      {props.columns[13].displayed ? <td>{props.unit.charge}</td> : null}
      {props.columns[14].displayed ? <td>{props.unit.skirmish}</td> : null}
      {props.columns[15].displayed ? <td>{props.unit.hold_maneuvers}</td> : null}
      {props.columns[16].displayed ? <td>{props.unit.unitSize}</td> : null}
      {props.columns[17].displayed ? <td>{props.unit.armourRange}</td> : null}
      {props.columns[18].displayed ? <td>{props.unit.armourMelee}</td> : null}
      {props.columns[19].displayed ? <td>{props.unit.weapon1}</td> : null}
      {props.columns[20].displayed ? <td>{props.unit.weapon2}</td> : null}
      {props.columns[21].displayed ? <td>{props.unit.rangedWeapon}</td> : null}
      {props.columns[22].displayed ? <td>{props.unit.skillMelee}</td> : null}
      {props.columns[23].displayed ? <td>{props.unit.skillRange}</td> : null}
      {props.columns[24].displayed ? <td>{props.unit.initiative}</td> : null}
      {props.columns[25].displayed ? <td>{renderCommandPoints(props.unit.commandStars)}</td> : null}
      {props.columns[26].displayed ? <td>{renderMagicPoints(props.unit.magic)}</td> : null}
      {props.columns[27].displayed ? <td>{props.unit.controlZone_OverRun}</td> : null}
      {props.columns[28].displayed ? <td>{props.unit.hitpoints}</td> : null}
      {props.columns[29].displayed ? <td>{props.unit.fear}</td> : null}
      {props.columns[30].displayed ? <td>{props.unit.moral1}</td> : null}
      {props.columns[31].displayed ? <td>{props.unit.moral2}</td> : null}
      {props.columns[32].displayed ? <td>{renderSpecialRules(props.unit.specialRules)}</td> : null}
      {props.columns[33].displayed ? <td>{props.unit.points}</td> : null}
    </tr>
  );
};

export default React.memo(FactionTableRow);
