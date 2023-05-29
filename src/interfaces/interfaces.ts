export interface IHistoryResponce {
  type: string;
  timestamp: number;
  idMessage: string;
  typeMessage: string;
  chatId: string;
  senderId?: string;
  senderName?: string;
  textMessage?: string;
  statusMessage?: string;
  downloadUrl?: string;
  caption?: string;
}

export interface IReceiveNotification {
  receiptId: number;
  body: Body;
}

export interface Body {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
  chatId: string;
}

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface SenderData {
  chatId: string;
  sender: string;
  senderName: string;
}

export interface MessageData {
  typeMessage: string;
  textMessageData: TextMessageData;
  extendedTextMessageData: { text: string };
}

export interface TextMessageData {
  textMessage: string;
}

export interface IChat {
  phoneNumber: string;
  messages: IMessage[];
}

interface IMessage {
  id: number;
  type: string;
  text: string;
}
