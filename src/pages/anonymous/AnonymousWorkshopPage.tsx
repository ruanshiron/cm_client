import {
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
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  ellipsisVertical,
  logOutOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatStringDate } from "../../utils/date";
import { useSelector } from "../../store";
import {
  findWorkshopById,
  statisticHarderSelector,
} from "../../store/data/workshopSlice";

import { signOut } from "../../store/user/userSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "../../hooks/useStyles";
import { fetchAllProcesses } from "../../store/data/processSlice";
import { addStatisticStages } from "../../store/data/stageSlice";
import { setLoading } from "../../store/loading/loadingSlice";
import { getAllStages, parseStage } from "../../models/stage";
import WorkshopSummary from "../../components/statistics/WorkshopSummary";

interface Props {}

const AnonymousWorkshopPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const { id, uid } = useSelector((state) => state.user);
  const workshop = useSelector((state) =>
    state.workshops.find((item) => item.id === state.user.id)
  );
  const classes = useStyles();
  const processes = useSelector((state) => state.processes);
  const { statistic, stages, total } = useSelector((state) =>
    statisticHarderSelector(state, id)
  );
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

  return (
    <IonPage className="list-page">
      <IonContent>
        <IonHeader className="ion-no-border">
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
        </IonHeader>
        <IonGrid fixed>
          {workshop && (
            <IonRow>
              <IonCol>
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList style={{ border: "none " }} lines="full">
                      <IonItem>
                        <IonIcon slot="start" icon={calendarClearOutline} />
                        <IonLabel>
                          <b>{formatStringDate(workshop.statistic.from)}</b>
                        </IonLabel>
                        <IonNote slot="end">Từ ngày</IonNote>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" icon={calendarNumberOutline} />
                        <IonLabel>
                          <b>{formatStringDate(workshop.statistic.to)}</b>
                        </IonLabel>
                        <IonNote slot="end">Đến ngày</IonNote>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
                {statistic && (
                  <WorkshopSummary
                    statistic={statistic}
                    workshop={workshop}
                    processes={processes}
                    total={total}
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
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnonymousWorkshopPage;
