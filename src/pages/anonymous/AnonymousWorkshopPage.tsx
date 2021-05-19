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
  shirtOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatStringDate, stringFromToDate } from "../../utils/date";
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
import { getStages, parseStage } from "../../models/stage";

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
  const { statistic, stages } = useSelector((state) =>
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
                <IonCard className="list-card">
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonLabel>
                        <u>
                          <b>Tổng hợp</b>
                        </u>
                      </IonLabel>
                      <IonNote slot="end">
                        từ {workshop?.statistic?.from || "~"} đến{" "}
                        {workshop?.statistic?.to || "~"}
                      </IonNote>
                    </IonItem>
                    {statistic &&
                      Object.keys(statistic).map((key, index) => (
                        <IonList
                          style={{ margin: 10, marginTop: 0 }}
                          className="border-full"
                          key={index}
                        >
                          <IonItem lines="full">
                            <IonIcon slot="start" icon={shirtOutline} />
                            <IonLabel>
                              <b>{statistic[key].name}</b>
                              <p>{statistic[key]?.code}</p>
                            </IonLabel>
                            <IonNote slot="end">đơn vị sản phẩm</IonNote>
                          </IonItem>
                          {Object.keys(statistic[key].processes).map((i, j) => (
                            <IonItem lines="full" key={j}>
                              <IonLabel>
                                <p>
                                  <i>
                                    {processes.find((v) => v.id === i)?.pending}
                                  </i>
                                </p>
                                <b>
                                  🤝
                                  {statistic[key].processes[i].pending || 0}
                                </b>
                                <p>
                                  <i>
                                    {
                                      processes.find((v) => v.id === i)
                                        ?.fulfilled
                                    }
                                  </i>
                                </p>
                                <b>
                                  ✅{statistic[key].processes[i].fulfilled || 0}
                                </b>
                                <p>
                                  <i>
                                    {
                                      processes.find((v) => v.id === i)
                                        ?.rejected
                                    }
                                  </i>
                                </p>
                                <b>
                                  👨‍🔧{statistic[key].processes[i].rejected || 0}
                                </b>
                              </IonLabel>
                              <IonLabel>
                                <p>
                                  Chưa&nbsp;
                                  {processes.find((v) => v.id === i)?.fulfilled}
                                </p>
                                <b>
                                  🖐
                                  {(statistic[key].processes[i].pending || 0) +
                                    (statistic[key].processes[i].rejected ||
                                      0) -
                                    (statistic[key].processes[i].fulfilled ||
                                      0)}
                                </b>
                                <p>Đơn giá</p>
                                {workshop?.amounts
                                  .filter(
                                    (amount) =>
                                      amount.processId === i &&
                                      amount.productId === key
                                  )
                                  .map((amount) => (
                                    <b>
                                      🏷
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(amount.amount)}
                                      <small>
                                        &nbsp;(
                                        {stringFromToDate(
                                          amount.fromDate,
                                          amount.toDate
                                        )}
                                        )
                                      </small>
                                    </b>
                                  ))}
                                <p>Tổng tiền</p>
                                <b>
                                  💵
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(
                                    statistic[key].processes[i].subtotal
                                  )}
                                </b>
                              </IonLabel>
                            </IonItem>
                          ))}
                        </IonList>
                      ))}
                  </IonCardContent>
                </IonCard>

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
