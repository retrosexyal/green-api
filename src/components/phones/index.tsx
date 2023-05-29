import React, { useEffect, useState } from "react";
import styles from "./phones.module.scss";
import { fetchHistoryData } from "../../store/slices/historySlice";
import { setPhone } from "../../store/slices/phoneSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { IChat } from "../../interfaces/interfaces";

export const Phones = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chat, setChat] = useState<IChat[] | undefined>(undefined);
  const dispatch = useAppDispatch();
  const storageId = localStorage.getItem("idInstance");
  const storageToken = localStorage.getItem("apiTokenInstance");
  const { phone } = useAppSelector((state) => state.phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((e.target as HTMLFormElement).checkValidity()) {
      dispatch(setPhone(phoneNumber));
      dispatch(
        fetchHistoryData({
          idInstance: storageId!,
          apiTokenInstance: storageToken!,
          phoneNumber,
        })
      );
      setPhoneNumber("");
    }
  };

  const handlePhone = (e: React.MouseEvent) => {
    const number = (e.target as HTMLElement).getAttribute("data-phone");
    if (number) {
      setPhoneNumber(number);
    }
  };

  useEffect(() => {
    const existingData = localStorage.getItem("chat");
    let chat: IChat[] = [];
    if (existingData) {
      chat = JSON.parse(existingData);
    }
    setChat(chat);
  }, [phoneNumber]);

  return (
    <div className={styles.phoneNumbers}>
      <form onSubmit={handleSubmit}>
        <input
          id="phoneNumb"
          placeholder="Введите номер телефона"
          value={phoneNumber}
          onChange={handleChange}
          type="tel"
          required
          pattern="[0-9]{5,15}"
          title="Введите только цифры, длина номера от 5 до 15"
        />
        <button type="submit">создать чат</button>
      </form>
      <div onClick={handlePhone}>
        {chat?.map((chat) => {
          return (
            <div
              data-phone={chat.phoneNumber}
              key={chat.phoneNumber}
              className={
                phone === chat.phoneNumber
                  ? styles.active + " " + styles.phone
                  : styles.phone
              }
            >
              {chat.phoneNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};
