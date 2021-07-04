import React from "react";
import {
  useIonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { algoliaClient } from "../config/algolia";
import { useSelector } from "../store";
import { color } from "../components/items/StageItem";
import { formatStringDate } from "../utils/date";
import {
  InstantSearch,
  Hits,
  Configure,
  Highlight,
} from "react-instantsearch-dom";
import { SearchBox } from "../components/search/SearchBox";

interface ModalProps {
  uid: string;
  onDidDismiss: () => void;
}

function Hit({ hit }: { hit: any }) {
  return (
    <IonItem
      key={hit.objectID}
      color="light"
      button
      routerLink={`tabs/diary/${hit.objectID}`}
    >
      <IonLabel>
        <p>{formatStringDate(hit.date)}</p>
        <b>{hit.workshopName}</b>
        <p>
          {hit.productName}
          <span style={{ margin: 4 }}>|</span>
          {hit.productSize}
          {hit.productSizes?.join(", ")}
        </p>
        {hit.note && (
          <IonText>
            <span style={{ marginRight: 4 }}>📝</span>
            <Highlight attribute="note" hit={hit} />
          </IonText>
        )}
      </IonLabel>
      <IonNote
        className="ion-text-right"
        slot="end"
        color={color(hit.processStatus)}
      >
        <IonText>{hit.processLabel}</IonText>
        <br />
        <IonText style={{ fontSize: 18, fontWeight: 700 }}>
          {hit.quantity}
        </IonText>
      </IonNote>
    </IonItem>
  );
}

const Modal: React.FC<ModalProps> = ({ uid, onDidDismiss }) => {
  return (
    <>
      <InstantSearch indexName="stages" searchClient={algoliaClient}>
        <Configure filters={`uid:${uid}`} hitsPerPage={20} distinct />
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
            <SearchBox />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Hits hitComponent={Hit} />
        </IonContent>
      </InstantSearch>
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
