import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const [isLggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((status) => status?.auth);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { isLggedIn, checkingStatus };
};

export default useAuthStatus;
