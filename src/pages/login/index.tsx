import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { useLoginInfo } from "../../hooks/useLoginInfo";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAuthData, setAuthData } from "../../store/slices/loginSlice";
import { DataStatus } from "../../constants/constants";

import styles from "./login.module.scss";

export const Login = () => {
  const { idInstance, apiTokenInstance, handleId, handleApiToken } =
    useLoginInfo();

  const dispatch = useAppDispatch();
  const { statusInstance, status } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(setAuthData({ id: idInstance, token: apiTokenInstance }));
    localStorage.setItem("idInstance", `${idInstance}`);
    localStorage.setItem("apiTokenInstance", `${apiTokenInstance}`);
    dispatch(fetchAuthData({ idInstance, apiTokenInstance }));
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="idInstance" className={styles.label}>
        Введите ваш idInstance
        <input
          type="text"
          id="idInstance"
          value={idInstance}
          onChange={handleId}
        />
      </label>
      <label htmlFor="apiTokenInstance" className={styles.label}>
        Введите ваш apiTokenInstance
        <input
          type="text"
          id="apiTokenInstance"
          value={apiTokenInstance}
          onChange={handleApiToken}
        />
      </label>
      <button onClick={handleLogin}>Войти</button>
      {statusInstance &&
        status === DataStatus.Loaded &&
        idInstance &&
        apiTokenInstance && <Navigate to={ROUTES.MAIN} replace={true} />}
      {status === DataStatus.Error && <div>Введите корректные ID и Token</div>}
    </div>
  );
};
