import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "./API/API";
import { Home, Login } from "@mui/icons-material";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  /* useEffect(() => {
    axios
      .get(API_URL + "/Staffer/CheckSession", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => {
        console.error("Errore durante il controllo della sessione:", err);
        setIsAuth(false);
      })
      .finally(() => {
        setIsLoading(false); // Aggiorna lo stato di caricamento quando la richiesta è completata
      });
  }, []); */

  if (isLoading) {
    return (
      <div className="absolute left-0 w-full h-full flex flex-col justify-center items-center bg-gray-200">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  const ProtectedRoute = ({ isAuth, redirectPath = "/login" }) => {
    if (!isAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const LoginRoute = ({ isAuth, redirectPath = "/" }) => {
    if (isAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route element={<LoginRoute isAuth={isAuth} />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
