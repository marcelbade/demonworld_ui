import { createContext } from "react";

const CompendiumContext = createContext();
const CompendiumProvider = CompendiumContext.Provider;

export { CompendiumContext };
export default CompendiumProvider;
