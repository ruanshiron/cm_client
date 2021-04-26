import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  analyticsOutline,
  callOutline,
  callSharp,
  copyOutline,
  personOutline,
  phonePortraitOutline,
  qrCodeOutline,
  refresh,
} from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import { WorkshopModal } from "../../../components/modals/WorkshopModal";
import { useSelector } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import { saveWorkshop } from "../../../models/workshop";
import { useDispatch } from "react-redux";
import {
  fetchAllWorkshops,
  statisticsForWorkshop,
  statisticsForWorkshopAndGroupByProduct,
} from "../../../store/data/workshopSlice";
import { toast } from "../../../utils/toast";
import QRCode from "qrcode.react";

interface WorkshopDetailProps {}

export const WorkshopDetail: React.FC<WorkshopDetailProps> = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const workshop = useSelector((state) =>
    state.workshops.find((v) => v.id === id)
  );

  const statistics = useSelector((state) =>
    statisticsForWorkshopAndGroupByProduct(statisticsForWorkshop(state, id))
  );

  const dispatch = useDispatch();

  const handleUpdateCode = async () => {
    const code = uuidv4();
    try {
      await saveWorkshop({
        ...workshop,
        code,
      });
      toast("Lưu thành công.");
      // TODO: Do not fetch again
      dispatch(fetchAllWorkshops());
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  return (
    <>
      <IonPage className="list-page">
        <WorkshopModal
          showModal={showReportModal}
          onDismiss={() => setShowReportModal(false)}
        />
        <IonContent>
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/workshops" />
              </IonButtons>
              <IonTitle>Xưởng</IonTitle>
              <IonButtons slot="end">
                <IonButton>
                  <IonIcon
                    slot="icon-only"
                    ios={callOutline}
                    md={callSharp}
                  ></IonIcon>
                </IonButton>
                <IonButton onClick={() => setShowReportModal(true)}>
                  <IonIcon slot="icon-only" icon={analyticsOutline}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="8" offsetMd="2">
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList lines="full" style={{ border: "none" }}>
                      <IonItem>
                        <IonIcon icon={personOutline} slot="start"></IonIcon>
                        <IonLabel>{workshop?.name}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon
                          icon={phonePortraitOutline}
                          slot="start"
                        ></IonIcon>
                        <IonLabel>{workshop?.phonenumber}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                        <IonInput
                          value={workshop?.code || "Hãy tạo code mới"}
                          onIonChange={() => {}}
                        />
                        <IonButtons slot="end">
                          <IonButton onClick={handleUpdateCode}>
                            <IonIcon slot="icon-only" icon={refresh}></IonIcon>
                          </IonButton>
                          <IonButton>
                            <IonIcon
                              slot="icon-only"
                              icon={copyOutline}
                            ></IonIcon>
                          </IonButton>
                        </IonButtons>
                      </IonItem>
                      {workshop?.code && (
                        <IonItem>
                          <QRCode
                            style={{ margin: "auto" }}
                            id="qrcode"
                            value={workshop?.code}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                          />
                        </IonItem>
                      )}
                    </IonList>
                  </IonCardContent>
                </IonCard>

                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList lines="none" style={{ border: "none" }}>
                      <IonListHeader>
                        <IonLabel>Thống kê nhanh</IonLabel>
                      </IonListHeader>
                      {statistics.map((item, index) => (
                        <IonItemGroup key={index}>
                          <IonItemDivider style={{ border: "none" }}>
                            <IonLabel>{item.product}</IonLabel>
                          </IonItemDivider>
                          {item.statistics.map((childItem, childIndex) => (
                            <IonItem key={childIndex}>
                              <IonLabel>{childItem.process}</IonLabel>
                              <IonNote slot="end">
                                <p>{childItem.value}</p>
                              </IonNote>
                            </IonItem>
                          ))}
                        </IonItemGroup>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
