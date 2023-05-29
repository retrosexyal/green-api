import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { ROUTES } from "./constants/routes";
import { Main } from "./pages/main";

export const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
};
