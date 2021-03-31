import React from "react";
import { IonList, IonItem, IonLabel } from "@ionic/react";
import { useDispatch } from "react-redux";
import { setMode } from "../../store/diarySlice";

interface DiaryPagePopoverProps {
  dismiss: () => void;
}

export const DiaryPagePopover: React.FC<DiaryPagePopoverProps> = ({
  dismiss,
}) => {
  const dispatch = useDispatch();

  const handleSetMode = (mode: "all" | "day") => {
    dispatch(setMode(mode));
    dismiss();
  };
  return (
    <IonList>
      <IonItem button onClick={(e) => handleSetMode("all")}>
        <IonLabel>Xem tất cả</IonLabel>
      </IonItem>
      <IonItem button onClick={(e) => handleSetMode("day")}>
        <IonLabel>Xem theo ngày</IonLabel>
      </IonItem>
    </IonList>
  );
};
