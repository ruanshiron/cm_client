import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import { refreshOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { addStatisticStages } from "../../../store/data/stageSlice";
import {
  findWorkshopById,
  statistic2HarderSelector,
  updateFromDate,
  updateToDate,
} from "../../../store/data/workshopSlice";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";
import { Workshop } from "../../../models/workshop";
import { toast } from "../../../utils/toast";
import Datetime from "../../../components/statistics/Datetime";
import { setLoading } from "../../../store/loading/loadingSlice";
import { getAllStages, parseStage } from "../../../models/stage";
import WorkshopSummary from "../../../components/statistics/WorkshopSummary";
import StageTable from "../../../components/statistics/StageTable";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { database } from "../../../config/firebase";

interface Props {}

const WorkshopStatistic: React.FC<Props> = () => {
  const [presentAlert] = useIonAlert();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [amounts, setAmounts] = useState<any[]>([]);
  const form = useWorkshopForm();
  const uid = useSelector((state) => state.user.uid);
  const loading = useSelector((state) => state.loading.isLoading);
  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === id)
  );
  const processes = useSelector((state) => state.processes);
  const { statistic, stages, total, payment } = useSelector((state) =>
    statistic2HarderSelector(state, id, amounts)
  );
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
    database
      .collection("users")
      .doc(uid)
      .collection("amounts")
      .where("workshopId", "==", id)
      .get()
      .then((snap) => {
        setAmounts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, [dispatch, id, uid, workshop]);
  const handleSaveStatistic = () => {
    if (workshop) {
      presentAlert({
        header: "Lưu thống kê hiện tại",
        message:
          "Các lựa chọn của bạn sẽ được lưu lại, và các thống kê cũng sẽ thay đổi!",
        buttons: [
          "Hủy",
          {
            text: "OK!",
            handler: () => {
              const fields: Workshop = {
                ...workshop,
                statistic: { ...workshop?.statistic, products: statistic },
              };
              form.submit(fields, false);
            },
          },
        ],
      });
    } else {
      toast("Không tìm thấy sản phẩm này!");
    }
  };
  const handleRefresh = () => {
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
  };
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/product" />
          </IonButtons>
          <IonTitle>
            {workshop?.name}・{workshop?.phonenumber}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton title="Lưu" onClick={() => handleRefresh()}>
              <IonIcon slot="icon-only" icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonLoading isOpen={!!loading} />
            <IonCol size="12" size-lg="8">
              <Datetime
                fromValue={workshop?.statistic?.from}
                toValue={workshop?.statistic?.to}
                onChangeFrom={(e) => {
                  dispatch(
                    updateFromDate({
                      id,
                      from: e.detail.value || "",
                    })
                  );
                }}
                onChangeTo={(e) => {
                  dispatch(
                    updateToDate({
                      id,
                      to: e.detail.value || "",
                    })
                  );
                }}
                // onCancelFrom={() => {
                //   dispatch(
                //     updateFromDate({
                //       id,
                //       from: "",
                //     })
                //   );
                // }}
                // onCancelTo={() => {
                //   dispatch(
                //     updateToDate({
                //       id,
                //       to: "",
                //     })
                //   );
                // }}
                onCancelFrom={() => {}}
                onCancelTo={() => {}}
                onReset={() => {
                  dispatch(
                    updateToDate({
                      id,
                      to: "",
                    })
                  );
                  dispatch(
                    updateFromDate({
                      id,
                      from: "",
                    })
                  );
                }}
                onSave={handleSaveStatistic}
              />
              {statistic && workshop && (
                <WorkshopSummary
                  statistic={statistic}
                  workshop={workshop}
                  processes={processes}
                  total={total}
                  payment={payment}
                  amounts={amounts}
                />
              )}
              <StageTable stages={stages} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopStatistic;
