import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  close,
  ellipseOutline,
  helpOutline,
  refreshOutline,
  triangleOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { Process } from "../../models/process";
import { Product } from "../../models/product";
import { useSelector } from "../../store";
import { color } from "./StageItem";

interface Props {
  product?: Product;
  value?: Process;
  status?: string;
  onChange: (value: Process, status: string) => void;
}

const ProcessSelectItem: React.FC<Props> = ({
  product,
  value,
  status,
  onChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const processes = useSelector((state) =>
    state.processes.filter((i) => product?.processes.includes(i.id!))
  );
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleClickItem = (item: any, status: string) => {
    onChange(item, status);
    setShowModal(false);
  };
  return (
    <>
      <IonItem button onClick={() => setShowModal(true)}>
        <IonIcon slot="start" icon={helpOutline} />
        {value && status ? (
          <IonBadge color={color(status)}>{(value as any)[status]}</IonBadge>
        ) : (
          <IonLabel color="medium">Chọn quy trình</IonLabel>
        )}
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={handleCancel}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Chọn quy trình</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {processes.map((item, index) => (
              <IonItemGroup key={index}>
                <IonItemDivider>{item.name}</IonItemDivider>
                <IonItem
                  button
                  onClick={() => handleClickItem(item, "pending")}
                >
                  <IonIcon
                    slot="start"
                    color="warning"
                    icon={triangleOutline}
                  />
                  {item.pending}
                </IonItem>
                <IonItem
                  button
                  onClick={() => handleClickItem(item, "fulfilled")}
                >
                  <IonIcon slot="start" color="success" icon={ellipseOutline} />
                  {item.fulfilled}
                </IonItem>
                <IonItem
                  button
                  onClick={() => handleClickItem(item, "rejected")}
                >
                  <IonIcon slot="start" color="danger" icon={refreshOutline} />
                  {item.rejected}
                </IonItem>
              </IonItemGroup>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ProcessSelectItem;
