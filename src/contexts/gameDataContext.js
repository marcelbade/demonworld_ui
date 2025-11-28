import { createContext } from "react";

const GameDataContext = createContext();
const GameDataProvider = GameDataContext.Provider;

export { GameDataContext };
export default GameDataProvider;
