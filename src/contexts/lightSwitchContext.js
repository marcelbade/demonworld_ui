import { createContext } from "react";

const LightSwitchContext = createContext();
const LightSwitchProvider = LightSwitchContext.Provider;

export { LightSwitchContext };
export default LightSwitchProvider;
