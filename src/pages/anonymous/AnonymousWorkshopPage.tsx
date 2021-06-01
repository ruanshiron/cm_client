import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { ellipsisVertical, logOutOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { findWorkshopById } from "../../store/data/workshopSlice";
import { signOut } from "../../store/user/userSlice";
import { fetchAllProcesses } from "../../store/data/processSlice";
import { addStatisticStages } from "../../store/data/stageSlice";
import { setLoading } from "../../store/loading/loadingSlice";
import { getAllStages, parseStage } from "../../models/stage";
import AnonymousWorkshopStatisticTab from "../../components/statistics/AnonymousWorkshopStatisticTab";

interface Props {}

const AnonymousWorkshopPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const { id, uid } = useSelector((state) => state.user);
  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === state.user.id)
  );
  const processes = useSelector((state) => state.processes);
  useEffect(() => {
    if (!workshop) dispatch(findWorkshopById(id));
  }, [dispatch, id, workshop]);
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!workshop) dispatch(findWorkshopById(id));
    if (workshop) {
      dispatch(setLoading(true));
      getAllStages(uid, {
        from: workshop.statistic?.from,
        to: workshop.statistic?.to,
        workshopId: workshop.id,
      }).then((snap) => {
        const stages = snap.docs.map(parseStage);
        dispatch(addStatisticStages({ id, stages }));
        dispatch(setLoading(false));
      });
    }
  }, [dispatch, id, uid, workshop]);

  useEffect(() => {
    dispatch(findWorkshopById(id));
  }, [dispatch, id]);

  const [segment, setSegment] = useState<"statistic" | "request">("statistic");
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {workshop?.name} ・ {workshop?.phonenumber}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                presentActionSheet({
                  buttons: [
                    {
                      text: "Đăng xuất",
                      icon: logOutOutline,
                      handler: () => {
                        dispatch(signOut());
                      },
                    },
                  ],
                })
              }
            >
              <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={segment}
            onIonChange={(e) => {
              if (
                e.detail.value === "statistic" ||
                e.detail.value === "request"
              ) {
                setSegment(e.detail.value);
              }
            }}
          >
            <IonSegmentButton value="statistic">Thống kê</IonSegmentButton>
            <IonSegmentButton value="request">Yêu cầu</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <AnonymousWorkshopStatisticTab
            hide={segment !== "statistic"}
            workshop={workshop}
            processes={processes}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousWorkshopPage;
