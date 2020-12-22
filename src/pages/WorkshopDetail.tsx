import { ActionSheetButton, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { callOutline, callSharp, shareOutline, shareSharp } from "ionicons/icons";
import React, { useState } from "react";

import "./WorkshopDetail.scss";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<
    ActionSheetButton[]
  >([]);
  const [actionSheetHeader, setActionSheetHeader] = useState("");

  function openWorkshopShare(workshop: any) {
    setActionSheetButtons([
      {
        text: "Copy Link",
        handler: () => {
          console.log("Copy Link clicked");
        },
      },
      {
        text: "Share via ...",
        handler: () => {
          console.log("Share via clicked");
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          console.log("Cancel clicked");
        },
      },
    ]);
    setActionSheetHeader(`Share ${workshop.name}`);
    setShowActionSheet(true);
  }

  function openContact(workshop: any) {
    setActionSheetButtons([
      {
        text: `Email ( ${workshop.email} )`,
        handler: () => {
          window.open("mailto:" + workshop.email);
        },
      },
      {
        text: `Call ( ${workshop.phone} )`,
        handler: () => {
          window.open("tel:" + workshop.phone);
        },
      },
    ]);
    setActionSheetHeader(`Share ${workshop.name}`);
    setShowActionSheet(true);
  }

  return (
    <>
      <IonPage id="workshop-detail">
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/tabs/account" />
              </IonButtons>
              <IonButtons slot="end">
                <IonButton onClick={() => openContact({})}>
                  <IonIcon
                    slot="icon-only"
                    ios={callOutline}
                    md={callSharp}
                  ></IonIcon>
                </IonButton>
                <IonButton onClick={() => openWorkshopShare({})}>
                  <IonIcon
                    slot="icon-only"
                    ios={shareOutline}
                    md={shareSharp}
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      </IonPage>
    </>
  );
};
