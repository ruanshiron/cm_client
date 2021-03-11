import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { WorkshopItem } from "../../components/items/WorkshopItem";
import { MaterialStorePagePopover } from "../../components/popovers/MaterialStorePagePopover";
import { useSelector } from "../../store";
import { fetchMaterialStores } from "../../store/dataSlice";
import "./MaterialStorePage.scss";

interface MaterialStorePageProps {}

const MaterialStorePage: React.FC<MaterialStorePageProps> = () => {
  const dispatch = useDispatch();
  const materialStores = useSelector((state) => state.data.materialStores);

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any>();

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  useEffect(() => {
    dispatch(fetchMaterialStores());
  }, [dispatch]);

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nguồn nguyên liệu</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={presentPopover}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nguồn nguyên liệu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            {materialStores.map((materialStore) => (
              <IonCol size="12" size-md="6" key={materialStore.id}>
                <WorkshopItem data={materialStore} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <MaterialStorePagePopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default MaterialStorePage;
