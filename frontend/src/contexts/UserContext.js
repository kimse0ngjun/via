import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 앱 시작 시 로컬스토리지에서 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔒 저장 시 로컬스토리지에도 같이 저장
  const setProfileData = (data) => {
    setUser(data);
    localStorage.setItem("userProfile", JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ user, setProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
