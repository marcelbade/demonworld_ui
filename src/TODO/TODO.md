- 

PDF:
- Seitenzahl richtig platzieren!
- Turnierregeloptionen: Schriftfarbe, Togglefarbe!
- Alliierte
 




TODO: YOU MISUNDERSTOOD USE_EFFECT - REFACTOR
 
 
TODO: GoblinRules -> see commented out code - hero cap!


TODO: useTreeViewController
==============================================
bug 1: you must click the same item twice to close it
bug 2: you cannot reopen the same item

 
TODO : turn stateChangesLogic into a custom hook !


TODO: theme
=================================================
 
- fix the weird drawer bug!
- finish light theme fonts 
- get rid of fonts no longer needed

 
 
ListGeneratorController

TODO: ATTENTION!!! CHANGED THE STATE PROPERTY  selectedAlternativeList

Ok, you finally realised this should not be a string this should be a small
array since you can have two values, first and second choice!
NOTE THAST YOU NEED TO CHANGE A LOT OF THE VALIDATION LOGIC; ESPECIALY FOR THE ORKS!!

==> changed Orc logic, test later!


TODO FINISH THIS NEXT :D
put all the logic for selecting the correct list of subfactions in one hook
the hook must
- take allies and alternative lists into accounts
- have it's own state 
- no context! inside - only as parameters when used


WARNING -YOU NEED TO ADD THE calculateTotalPointCost FUNCTION TO THE ADD_ITEM FUNCTION!!!


BUG: when you make a pick a unit and this election should make it possible to make a previously prohibiteed selection, the change takes place only after the NEXT unit has been selected.



TODO:  BUGS AND IMPROVEMENTS
===================================
- sort the units in the tree alphabetically
- improve the sub factions sorting
  
 


- add items to masterlist to avoid equiping the same item twice: you added the function 2x (accidentally). You removed both , do it again
- ALLE beschworenen Einheiten -> keine Gegenstände!!
- 
- DONE: add new property: no magical items allowed
 
 

TODO: src\components\shared\NoSelectionDisplay.js
You need a pic, if you want to use this :D.

 

TODO: PDF VIEWER
===================================
alternative layout (full cards)
 - fix bottom borders
 
TODO: ItemShop
===================================
- giants need more work
 
 
TODO: missing features // Version 2  - disregard for now 
===================================
- save lists 
- user accounts (!!)



TODO:  RESPONSIVE DESIGN 
SelectionInput. Army -> done, tested for smartphones
 

missing rule
---------------------------------
units that already have a magical WEAPON in their description CANNOT take a magical WEAPON!
 
 

GEGENSTÄNDE


Item types in the DB:
--------------------------------
'armor'
'arrowsAndBows'
'banner'
'boltsAndCrossbows'
'crystal'
'fortifications'
'imp'
'instrument'
'item'
'mask'
'poison'
'potion'
'Relicts'
'ringsAndAmulets'
'warpaint'
'weapon'
'YarrinsSons'



 # Run  npm install react-scripts@5.0.1  to resolve 25 vulnerabilities
SEMVER WARNING: Recommended action is a potentially breaking change

  Low             Prototype Pollution in node-forge debug API.                  

  Package         node-forge                                                    

  Dependency of   react-scripts                                                 

  Path            react-scripts > webpack-dev-server > selfsigned > node-forge  

  More info       https://github.com/advisories/GHSA-5rrq-pxf6-6jx5         



# Run  npm install axios@1.6.8  to resolve 1 vulnerability
SEMVER WARNING: Recommended action is a potentially breaking change

  Moderate        Axios Cross-Site Request Forgery Vulnerability                

  Package         axios                                                         

  Dependency of   axios                                                         

  Path            axios                                                         

  More info       https://github.com/advisories/GHSA-wf5p-g6vw-rhxx             
