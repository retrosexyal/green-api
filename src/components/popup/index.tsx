import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import styles from "./popup.module.scss";

export const PopUp = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { status, error } = useAppSelector((state) => state.send);

  const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).getAttribute("data-id") === "close") {
      setIsHidden(false);
    }
  };

  useEffect(() => {
    if (error) {
      setIsHidden(true);
    }
  }, [error, status]);

  return (
    <>
      {isHidden && (
        <div className={styles.wrapper} onClick={handleShow} data-id="close">
          <div className={styles.content}>{error}</div>
        </div>
      )}
    </>
  );
};
