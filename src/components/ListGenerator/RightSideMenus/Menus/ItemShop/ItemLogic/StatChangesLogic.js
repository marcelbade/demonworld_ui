
/*Wenn ein Element mit einer separat eingekauften
Nahkampfwaffe ausgestattet wird, müssen Sie zum
Kampffaktor der Waffe die Größe der Modelle
hinzurechnen. Sollte das Element ein Passagier auf
einem Streitwagen sein, so rechnen Sie zur Größe des
Elements noch die Größe der Plattform des
Streitwagens mit + 1 hinzu. Sollte das Element
Passagier auf einem großen Monster, wie einem
Drachen, sein, so rechnen Sie statt der Größe des
Elements die Größe des großen Monsters bis zu einem
maximalen Wert von 4 hinzu.
Des Weiteren müssen Sie einen Bonus für ein eventuell
vorhandenes, mitkämpfendes Reittier (z. B. Handwaffe
+ Wolf), einen Bonus für sonstige elementspezifische
nahkampffaktor-erhöhende Faktoren (z. B. Speer + Huf)
sowie einen Bonus für das Kämpfen in geschlossener
Formation (fünf Figuren auf Standardbasis)
berücksichtigen. Jeder vorhandene Bonus erhöht den
endgültigen Kampffaktor um '+2'.*/


export const calculateNewMeleeWeaponValue = (meleeWeapon, unit) => {

   let damage =  meleeWeapon.weapon1 + unit.unitSize; 
   
   


};
