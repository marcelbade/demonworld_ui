import { createContext } from "react";

const ServerErrorContext = createContext();
const ServerErrorProvider = ServerErrorContext.Provider;

export { ServerErrorContext };
export default ServerErrorProvider;
