// react
import React from "react";
// react-pdf
import { Document } from "@react-pdf/renderer";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
// pdf components
import NameRow from "./detailedCardsComponets/cardFrontSide/NameRow";
import UnitMovementRow from "./detailedCardsComponets/cardFrontSide/UnitMovementRow";
import RangeWeaponRow from "./detailedCardsComponets/cardFrontSide/RangedWeaponRow";
import MeleeWeaponRow from "./detailedCardsComponets/cardFrontSide/MeleeWeaponRow";
import SizeArmorSkill from "./detailedCardsComponets/cardFrontSide/SizeArmorSkillRow";
import FearAndMoralRow from "./detailedCardsComponets/cardFrontSide/FearAndMoralRow";
import HitPointsRow from "./detailedCardsComponets/cardFrontSide/HitPointsRow";

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const DetailedCardFront = (props) => {
  return (
    <Document style={styles.entireCard}>
      <NameRow unitName={props.u.unitName} />
      <UnitMovementRow unit={props.u} />
      <RangeWeaponRow rangedWeapon={props.u.rangedWeapon} rangedAttackStats={props.u.rangedAttackStats} />
      <MeleeWeaponRow weaponName={"Waffe1"} weapon={props.u.weapon1} />
      {props.u.weapon2 === 0 ? null : <MeleeWeaponRow weaponName={"Waffe2"} weapon={props.u.weapon2} />}
      {props.u.weapon3 === 0 ? null : <MeleeWeaponRow weaponName={"Waffe3"} weapon={props.u.weapon3} />}
      <SizeArmorSkill unit={props.u} />
      <FearAndMoralRow unit={props.u} />
      <HitPointsRow hitPoints={props.u.hitpoints} />
    </Document>
  );
};
export default DetailedCardFront;
