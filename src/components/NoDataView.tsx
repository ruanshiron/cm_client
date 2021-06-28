import { IonButton, IonText } from "@ionic/react";
import React from "react";

interface Props {
  onAddClick?: () => void;
  addRouterLink?: string;
}

const NoDataView: React.FC<Props> = ({ onAddClick, addRouterLink }) => {
  const handleClick = () => {
    if (onAddClick) onAddClick();
  };
  return (
    <div className="empty-container">
      <div>
        <IonText>Chưa có dữ liệu 📭</IonText>
      </div>
      {onAddClick && (
        <IonButton fill="clear" onClick={handleClick}>
          + Thêm mới
        </IonButton>
      )}
      {addRouterLink && (
        <IonButton fill="clear" routerLink={addRouterLink}>
          + Thêm mới
        </IonButton>
      )}
    </div>
  );
};

export default NoDataView;
