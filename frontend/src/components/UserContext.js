import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  return (
    <UserContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
