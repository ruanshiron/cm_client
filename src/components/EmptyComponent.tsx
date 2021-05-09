import { IonIcon, IonText } from "@ionic/react";
import { fileTrayOutline } from "ionicons/icons";
import React from "react";

interface Props {
  isEmpty: boolean;
  children: any;
}

const FancyContent: React.FC<Props> = ({ isEmpty, children }) => {
  if (isEmpty)
    return (
      <div style={{ marginTop: 200 }} className="ion-text-center ion-padding">
        <IonIcon
          icon={fileTrayOutline}
          style={{ fontSize: 128 }}
          color="medium"
        />
        <br />
        <IonText color="medium">Không có gì ở đây cả (｡•́︿•̀｡)</IonText>
      </div>
    );
  else return children;
};

export default FancyContent;
