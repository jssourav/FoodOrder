import { createContext } from "react";

const UserContext = createContext({
  loggedinUser: "Dummy User",
});

export default UserContext;
