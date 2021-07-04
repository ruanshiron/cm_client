import React, { useState } from "react";
import {
  useIonModal,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonText,
  IonNote,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { stageIndex } from "../config/algolia";
import { useSelector } from "../store";
import { color } from "../components/items/StageItem";
import { formatStringDate } from "../utils/date";

interface ModalProps {
  uid: string;
  onDidDismiss: () => void;
}

const Modal: React.FC<ModalProps> = ({ uid, onDidDismiss }) => {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const handleChange = (text: string) => {
    setSearchText(text);
    stageIndex.search(text, { filters: `uid:${uid}` }).then(({ hits }) => {
      setResult(hits);
      console.log(hits);
    });
  };
  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonButton onClick={() => onDidDismiss()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Tìm kiếm</IonTitle>
        </IonToolbar>
        <IonToolbar color="light">
          <IonSearchbar
            animated
            placeholder={"Nhập bất kỳ từ khóa bạn muốn tìm"}
            value={searchText}
            onIonChange={(e) => handleChange(e.detail.value!)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList style={{ padding: 0 }}>
          {result.map((item) => (
            <IonItem
              key={item.objectID}
              color="light"
              button
              routerLink={`tabs/diary/${item.objectID}`}
            >
              <IonLabel>
                <p>{formatStringDate(item.date)}</p>
                <b>{item.workshopName}</b>
                <p>
                  {item.productName}
                  <span style={{ margin: 4 }}>|</span>
                  {item.productSize}
                  {item.productSizes?.join(", ")}
                </p>
                {item.note && <IonText>item.note</IonText>}
              </IonLabel>
              <IonNote
                className="ion-text-right"
                slot="end"
                color={color(item.processStatus)}
              >
                <IonText>{item.processLabel}</IonText>
                <br />
                <IonText style={{ fontSize: 18, fontWeight: 700 }}>
                  {item.quantity}
                </IonText>
              </IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

const useSearch = () => {
  const uid = useSelector((state) => state.user.uid);
  const [present, dismiss] = useIonModal(Modal, {
    uid,
    onDidDismiss: () => dismiss(),
  });
  return [present, dismiss];
};

export default useSearch;
