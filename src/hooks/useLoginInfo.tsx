import { useState } from "react";

export const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });

  const { idInstance, apiTokenInstance } = loginInfo;

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, idInstance: e.target.value });
  };

  const handleApiToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, apiTokenInstance: e.target.value });
  };

  return {
    idInstance,
    apiTokenInstance,
    handleId,
    handleApiToken,
    setLoginInfo,
  };
};
