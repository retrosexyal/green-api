import React, { useEffect, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";

import styles from "./main.module.scss";

import { ROUTES } from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { DataStatus } from "../../constants/constants";
import { fetchAuthData, setAuthData } from "../../store/slices/loginSlice";
import { Chat } from "../../components/chat";
import { PopUp } from "../../components/popup";
import { fetchGetData } from "../../store/slices/getSlice";
import { fetchDeleteData } from "../../store/slices/deleteSlice";
import { handleChat } from "../../helpers/helpers";
import { Header } from "../../components/header";

export const Main = () => {
  const { statusInstance, status } = useAppSelector((state) => state.auth);
  const { receiveNotification } = useAppSelector((state) => state.get);
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const storageId = localStorage.getItem("idInstance");
  const storageToken = localStorage.getItem("apiTokenInstance");

  useEffect(() => {
    if (login.id && login.token) {
      const interval = setInterval(() => {
        dispatch(
          fetchGetData({
            idInstance: login.id,
            apiTokenInstance: login.token,
          })
        );
        const msg = handleChat(receiveNotification!);
        if (msg?.delete) {
          dispatch(
            fetchDeleteData({
              idInstance: login.id,
              apiTokenInstance: login.token,
              id: msg.delete,
            })
          );
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [receiveNotification]);

  useLayoutEffect(() => {
    if (
      storageId !== "" &&
      storageToken !== "" &&
      status !== DataStatus.Loaded
    ) {
      dispatch(setAuthData({ id: storageId!, token: storageToken! }));
      dispatch(
        fetchAuthData({
          idInstance: storageId!,
          apiTokenInstance: storageToken!,
        })
      );
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      {status === DataStatus.Loaded &&
        statusInstance &&
        login.id &&
        login.token && <Chat />}
      <>
        {(!login.id || !login.token) && status !== DataStatus.Loaded && (
          <Navigate to={ROUTES.LOGIN} replace={true} />
        )}
      </>
      <PopUp />
    </div>
  );
};
