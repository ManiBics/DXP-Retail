import React, { createContext, useState, useContext, useEffect } from "react";
import { useBackDrop } from "./BackDropContext";
import {
  getCustomer,
  getCustomerById,
  register,
  signIn,
} from "./userApiHandler";
import { usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "./SnackbarContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();
  const pathname = usePathname();

  const signInHandler = async (credential) => {
    showBackDrop();
    // const res = await signIn(credential);
    // if (res?.accessToken) {
    const data = await getCustomer(credential.email);
    const customerData = data?.results[0] || {};
    if (customerData.id) {
      localStorage.setItem("customerId", customerData.id);
      setUser(customerData);
      router.push("/");
    } else {
      openSnackbar("Email or Password is invalid", "error");
    }
    // }
    hideBackDrop();
  };

  const registerHandler = async (credential) => {
    showBackDrop();
    const data = await register(credential);
    if (data.errors) {
      openSnackbar(data.message, "error");
    } else {
      openSnackbar("Account successfully created");
      router.push("/login");
    }
    hideBackDrop();
  };

  useEffect(() => {
    (async () => {
      const storedCustomerId = localStorage.getItem("customerId");
      showBackDrop();
      if (storedCustomerId) {
        if (pathname === "/login" || pathname === "/register") {
          return router.push("/");
        }
        const data = await getCustomerById(storedCustomerId);
        setUser(data);
      } else if (pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      }
      hideBackDrop();
    })();
  }, []);

  const logoutHandler = () => {
    setUser({});
    localStorage.removeItem("customerId");
    router.push("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signInHandler,
        logoutHandler,
        registerHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
