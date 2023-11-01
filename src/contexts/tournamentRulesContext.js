import { createContext } from "react";

const TournamentRulesContext = createContext();
const TournamentRulesProvider = TournamentRulesContext.Provider;

export { TournamentRulesContext };
export default TournamentRulesProvider;
