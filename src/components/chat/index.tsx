import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store";

import styles from "./chat.module.scss";
import { fetchSendData } from "../../store/slices/sendSlice";
import { fetchGetData } from "../../store/slices/getSlice";
import { Phones } from "../phones";
import { IChat } from "../../interfaces/interfaces";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<IChat | undefined>(undefined);
  const { phone: phoneNumber } = useAppSelector((state) => state.phone);
  const { result } = useAppSelector((state) => state.del);

  const data = useAppSelector((state) => state.get.receiveNotification);
  const dispatch = useAppDispatch();
  const storageId = localStorage.getItem("idInstance");
  const storageToken = localStorage.getItem("apiTokenInstance");

  useEffect(() => {
    dispatch(
      fetchGetData({
        idInstance: storageId!,
        apiTokenInstance: storageToken!,
      })
    );
  }, []);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== "\n") {
      setMessage(value);
    }
  };

  const handleSend = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        setMessage(`${message}`);
      } else {
        setMessage("");
        dispatch(
          fetchSendData({
            idInstance: storageId!,
            apiTokenInstance: storageToken!,
            phoneNumber,
            message: message,
          })
        );
      }
    }
  };

  useEffect(() => {
    const existingData = localStorage.getItem("chat");
    let chat: IChat[] = [];
    if (existingData) {
      chat = JSON.parse(existingData);
    }
    const currentChat = chat.find((c) => c.phoneNumber === phoneNumber);
    setCurrentChat(currentChat);
  }, [phoneNumber, data, result]);

  return (
    <div className={styles.wrapper}>
      <Phones />
      <div className={styles.chat}>
        <div>номер : {currentChat?.phoneNumber || phoneNumber}</div>
        <div className={styles.messages}>
          {currentChat?.messages?.map((e) => {
            return (
              <div
                key={e.id}
                className={
                  e.type.includes("outgoin") ? styles.outgoing : styles.incoming
                }
              >
                <div className={styles.message}>{e.text}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.sender}>
          <textarea
            className={styles.input}
            placeholder="Введите сообщение"
            onKeyDown={handleSend}
            value={message}
            onChange={handleMessage}
          />
        </div>
      </div>
    </div>
  );
};
