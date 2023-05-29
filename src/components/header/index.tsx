import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAuthData, setAuthData } from "../../store/slices/loginSlice";
import { IChat } from "../../interfaces/interfaces";
import { setDeleteData } from "../../store/slices/deleteSlice";

export const Header = () => {
  const { phone } = useAppSelector((state) => state.phone);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    localStorage.setItem("idInstance", "");
    localStorage.setItem("apiTokenInstance", "");
    dispatch(setAuthData({ id: "", token: "", status: "" }));
  };
  const handleClean = () => {
    const existingData = localStorage.getItem("chat");
    let chat: IChat[] = [];
    if (existingData) {
      chat = JSON.parse(existingData);
    }
    const newChat = [
      ...chat.filter((c) => c.phoneNumber !== phone),
      { phoneNumber: phone, messages: [] },
    ];
    localStorage.setItem("chat", JSON.stringify(newChat));
    dispatch(setDeleteData(true));
  };
  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.LOGIN} onClick={handleClick} className={styles.btn}>
        logout
      </Link>
      <button onClick={handleClean} className={styles.btn}>
        clean history
      </button>
    </div>
  );
};
