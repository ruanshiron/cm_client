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
  IonItem,
  IonLabel,
  IonLoading,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../../store";
import { saveOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyles";
import { addStatisticStages } from "../../../store/data/stageSlice";
import {
  findWorkshopById,
  statisticHarderSelector,
  updateFromDate,
  updateToDate,
} from "../../../store/data/workshopSlice";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";
import { Workshop } from "../../../models/workshop";
import { toast } from "../../../utils/toast";
import Datetime from "../../../components/statistics/Datetime";
import { setLoading } from "../../../store/loading/loadingSlice";
import { getStages, parseStage } from "../../../models/stage";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { stringFromToDate } from "../../../utils/date";
import WorkshopSummary from "../../../components/statistics/WorkshopSummary";

interface Props {}

const WorkshopStatistic: React.FC<Props> = () => {
  const [presentAlert] = useIonAlert();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const form = useWorkshopForm();
  const uid = useSelector((state) => state.user.uid);
  const loading = useSelector((state) => state.loading.isLoading);
  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === id)
  );
  const processes = useSelector((state) => state.processes);
  const { statistic, stages } = useSelector((state) =>
    statisticHarderSelector(state, id)
  );
  useEffect(() => {
    if (!workshop) dispatch(findWorkshopById(id));
    if (workshop) {
      dispatch(setLoading(true));
      getStages(uid, {
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
    if (stages.length <= 0) dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
            <IonButton title="Lưu" onClick={() => handleSaveStatistic()}>
              <IonIcon slot="icon-only" icon={saveOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonLoading isOpen={!!(loading && !workshop)} />
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
                onCancelFrom={() => {
                  dispatch(
                    updateFromDate({
                      id,
                      from: "",
                    })
                  );
                }}
                onCancelTo={() => {
                  dispatch(
                    updateFromDate({
                      id,
                      to: "",
                    })
                  );
                }}
              />
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel>
                      <u>
                        <b>Tổng hợp</b>
                      </u>
                    </IonLabel>
                    <IonNote slot="end">
                      {stringFromToDate(
                        workshop?.statistic?.from,
                        workshop?.statistic?.to
                      )}
                    </IonNote>
                  </IonItem>
                </IonCardContent>
              </IonCard>

              {statistic && workshop && (
                <WorkshopSummary
                  statistic={statistic}
                  workshop={workshop}
                  processes={processes}
                />
              )}
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel>
                      <u>
                        <b>Bảng chi tiết</b>
                      </u>
                    </IonLabel>
                  </IonItem>
                  <TableContainer component={Paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Ngày</TableCell>
                          <TableCell>Sản phẩm</TableCell>
                          <TableCell>Quy trình</TableCell>
                          <TableCell>Số lượng&nbsp;(sản phẩm)</TableCell>
                          <TableCell>Kích cỡ</TableCell>
                          <TableCell>Ghi chú</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stages.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {item.date}
                            </TableCell>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.processLabel}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.productSize}</TableCell>
                            <TableCell>{item.note}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopStatistic;
