import { IChat, IReceiveNotification } from "../interfaces/interfaces";

export const handleChat = (msg: IReceiveNotification) => {
  if (!msg) return;
  const type = msg.body.typeWebhook.toLowerCase().split("message")[0];
  const id = msg.receiptId;
  let phone;
  const existingData = localStorage.getItem("chat");
  let chat: IChat[] = [];
  if (existingData) {
    chat = JSON.parse(existingData);
  }
  const text =
    msg.body.messageData?.textMessageData?.textMessage ||
    msg.body.messageData?.extendedTextMessageData?.text;

  if (text) {
    const phone = msg.body.senderData.chatId.split("@")[0];
    const messages = {
      id,
      type,
      text,
    };
    const existingChat = chat.find((c) => c.phoneNumber === phone);
    if (existingChat) {
      if (existingChat.messages.find((m) => m.id === id)) {
        return { delete: id };
      }
      existingChat.messages.push(messages);
    } else {
      const newChat: IChat = {
        phoneNumber: phone,
        messages: [messages],
      };
      chat.push(newChat);
    }
    localStorage.setItem("chat", JSON.stringify(chat));
  } else {
    return { delete: id };
  }
};
