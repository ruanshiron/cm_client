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
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  cashOutline,
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
import { fetchAllStages } from "../../store/data/stageSlice";

interface Props {}

const AnonymousWorkshopPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [presentActionSheet] = useIonActionSheet();
  const id = useSelector((state) => state.user.id);
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
    if (stages.length <= 0) dispatch(fetchAllStages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
                          <b>
                            Đến&nbsp;
                            {formatStringDate(workshop.statistic.to)}
                          </b>
                        </IonLabel>
                        <IonNote slot="end">Đến ngày</IonNote>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>

                <IonCard className="list-card">
                  <IonCardContent>
                    <IonList lines="none" style={{ border: "none" }}>
                      <IonListHeader>
                        <IonLabel>
                          <b>Giá công</b>
                        </IonLabel>
                      </IonListHeader>
                      {workshop?.amounts.map((item, index) => (
                        <IonItem key={index}>
                          <IonIcon slot="start" icon={cashOutline} />
                          <IonLabel>
                            <b>{item.productName}</b>
                            <p>
                              giá&nbsp;[{item.processName}]&nbsp;từ&nbsp;
                              {stringFromToDate(item.fromDate, item.toDate)}
                            </p>
                          </IonLabel>
                          <IonText color="dark">{item.amount}&nbsp;₫</IonText>
                        </IonItem>
                      ))}
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
                    <IonList
                      lines="none"
                      style={{ border: "none" }}
                      color="dark"
                    >
                      {statistic &&
                        Object.values(statistic).map((item, index) => (
                          <div className="border-full ion-margin" key={index}>
                            <IonItemGroup>
                              <IonItem lines="full">
                                <IonIcon slot="start" icon={shirtOutline} />
                                <IonLabel>
                                  <b>{item.name}</b>
                                  <p>{item?.code}</p>
                                </IonLabel>
                              </IonItem>
                              {Object.keys(item.processes).map((i, j) => (
                                <IonItem lines="full" key={j}>
                                  <IonLabel className="ion-text-center ion-text-wrap">
                                    <b>
                                      {(item.processes[i].pending || 0) +
                                        (item.processes[i].rejected || 0) -
                                        (item.processes[i].fulfilled || 0)}
                                    </b>
                                    &nbsp;
                                    <p>
                                      {
                                        processes.find((v) => v.id === i)
                                          ?.pending
                                      }
                                      &nbsp;(hiện tại)
                                    </p>
                                  </IonLabel>
                                  <IonLabel>
                                    <table className="small-table">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].pending || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.pending
                                                }
                                                &nbsp;(toàn bộ)
                                              </i>
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].fulfilled || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.fulfilled
                                                }
                                              </i>
                                            </p>
                                          </td>
                                          <td className="ion-text-right">
                                            <b>
                                              {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(
                                                item.processes[i].subtotal
                                              )}
                                            </b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <b>
                                              {item.processes[i].rejected || 0}
                                            </b>
                                          </td>
                                          <td>
                                            <p>
                                              <i>
                                                {
                                                  processes.find(
                                                    (v) => v.id === i
                                                  )?.rejected
                                                }
                                              </i>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </IonLabel>
                                </IonItem>
                              ))}
                            </IonItemGroup>
                          </div>
                        ))}
                    </IonList>
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
