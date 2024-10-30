import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Context = createContext();

export default function SnackbarProvider({ children }) {
  const [snackData, setSnackData] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const openSnackbar = (message, type = "success") => {
    setSnackData({ open: true, message, severity: type });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackData({ open: false, message: "", severity: "" });
  };

  return (
    <Context.Provider value={{ openSnackbar }}>
      <Snackbar
        open={snackData.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackData.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
      {children}
    </Context.Provider>
  );
}

export const useSnackbar = () => useContext(Context);
