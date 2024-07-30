// react
import React, { useContext } from "react";
// material ui
import { Divider } from "@mui/material";
// components and functions
import CardFront from "../shared/statCards/cardComponents/CardFront";
import CardBack from "../shared/statCards/cardComponents/CardBack";
// providers and contexts
import StatCardProvider from "../../contexts/statCardContext";
import { CardCreationContext } from "../../contexts/cardCreationContext";

const CardPreview = () => {
  const CCC = useContext(CardCreationContext);

  return (
    <StatCardProvider
      value={{
        unit: {
          //  faction
          faction: CCC.factionName,
          subFaction: CCC.subFactionName,
          // name
          unitName: CCC.unitName,
          // movment
          move: CCC.move,
          charge: CCC.charge,
          skirmish: CCC.skirmish,
          hold_maneuvers: CCC.maneuver,
          // formations
          squareFormation: CCC.square,
          skirmishFormation: CCC.skirmishFormation,
          wedgeFormation: CCC.wedge,
          horde: CCC.horde,
          // range
          skillRange: CCC.rangeSkill ,
          rangedAttackStats: CCC.rangedAttackStats,
          rangedWeapon: CCC.rangedWeaponName,
          // initiative
          initiative: CCC.initiative,
          //  melee
          chargeBonus: CCC.chargeBonus,
          skillMelee: CCC.meleeSkill,
          weapon1: CCC.meleeValue,
          weapon1Name: CCC.meleeWeaponName,
          weapon2: CCC.meleeValue,
          weapon2Name: CCC.meleeWeaponName,
          weapon3: CCC.meleeValue,
          weapon3Name: CCC.meleeWeaponName,
          //  size & armor
          unitSize: CCC.size,
          armourRange: CCC.rangeArmor,
          armourMelee: CCC.meleeArmor,
          // fear & moral
          fear: CCC.fear,
          moral1: CCC.moral1,
          moral2: CCC.moral2,
          // special elements
          leader: CCC.leader,
          standardBearer: CCC.banner,
          musician: CCC.musician,
          // special rules
          specialRules: CCC.specialRule,
          numberOfElements: 8,
          // hitpoints
          hitpoints: CCC.hitpoints,
          // point cost
          points: CCC.pointCost,

          // TODO
          secondSubFaction: "Kriegerkaste",
          hasShield: false,
          isHighFlyer: false,
          isLowFlyer: false,
          isMounted: false,
          isMultiStateUnit: false,
          leaderIsClosedOrder: false,
          maxFieldsMove: false,
          multiCardName: "",
          multiStateOrderNumber: 0,
          belongsToUnit: "NONE",
          commandStars: 0,
          controlZone: 0,
          overRun: 0,
          uniqueUnit: true,
          unitType: "U",
        },
      }}
    >
      <CardFront />
      <Divider
        sx={{
          backgroundColor: "hotpink",
          width: "45%",
          paddingTop: "4em",
        }}
      />
      <CardBack />
    </StatCardProvider>
  );
};

export default CardPreview;
