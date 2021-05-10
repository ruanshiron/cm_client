import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
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
import {
  calendarClearOutline,
  calendarNumberOutline,
  saveOutline,
  shirtOutline,
} from "ionicons/icons";
import { useDispatch } from "react-redux";
import { fetchAllProcesses } from "../../../store/data/processSlice";
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
import { fetchAllStages } from "../../../store/data/stageSlice";
import {
  findWorkshopById,
  statisticHarderSelector,
  updateFromDate,
  updateToDate,
} from "../../../store/data/workshopSlice";
import { useWorkshopForm } from "../../../hooks/useWorkshopForm";
import { Workshop } from "../../../models/workshop";
import { toast } from "../../../utils/toast";

interface Props {}

const WorkshopStatistic: React.FC<Props> = () => {
  const [presentAlert] = useIonAlert();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const form = useWorkshopForm();
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
  }, [dispatch, id, workshop]);
  useEffect(() => {
    if (processes.length <= 0) dispatch(fetchAllProcesses());
    if (stages.length <= 0) dispatch(fetchAllStages());
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
              form.submit(fields);
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
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList style={{ border: "none " }} lines="full">
                    <IonItem>
                      <IonIcon slot="start" icon={calendarClearOutline} />
                      <IonLabel>
                        <b>Từ ngày</b>
                      </IonLabel>
                      <IonDatetime
                        displayFormat="YYYY-MM-DD"
                        doneText="OK!"
                        cancelText="Hủy"
                        value={workshop?.statistic?.from}
                        onIonChange={(e) => {
                          dispatch(
                            updateFromDate({
                              id,
                              from: e.detail.value?.substring(0, 10),
                            })
                          );
                        }}
                        onIonCancel={(e) => {
                          dispatch(
                            updateToDate({
                              id,
                              from: "",
                            })
                          );
                        }}
                      ></IonDatetime>
                    </IonItem>
                    <IonItem>
                      <IonIcon slot="start" icon={calendarNumberOutline} />
                      <IonLabel>
                        <b>Đến ngày</b>
                      </IonLabel>
                      <IonDatetime
                        displayFormat="YYYY-MM-DD"
                        doneText="OK!"
                        cancelText="Hủy"
                        value={workshop?.statistic?.to || ""}
                        onIonChange={(e) => {
                          dispatch(
                            updateToDate({
                              id,
                              to: e.detail.value?.substring(0, 10),
                            })
                          );
                        }}
                        onIonCancel={(e) => {
                          dispatch(
                            updateToDate({
                              id,
                              to: "",
                            })
                          );
                        }}
                      ></IonDatetime>
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
                    Object.values(statistic).map((item, index) => (
                      <IonList
                        style={{ margin: 10, marginTop: 0 }}
                        className="border-full"
                        key={index}
                      >
                        <IonItem lines="full">
                          <IonIcon slot="start" icon={shirtOutline} />
                          <IonLabel>
                            <b>{item.name}</b>
                            <p>{item?.code}</p>
                          </IonLabel>
                          <IonNote slot="end">đơn vị sản phẩm</IonNote>
                        </IonItem>
                        {Object.keys(item.processes).map((i, j) => (
                          <IonItem lines="full" key={j}>
                            <IonLabel>
                              <p>
                                {processes.find((v) => v.id === i)?.pending}
                                &nbsp;(hiện tại)
                              </p>
                              <b>
                                {(item.processes[i].pending || 0) +
                                  (item.processes[i].rejected || 0) -
                                  (item.processes[i].fulfilled || 0)}
                              </b>
                              <p>Tổng tiền</p>
                              <b>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.processes[i].subtotal)}
                              </b>
                            </IonLabel>
                            <IonLabel>
                              <p>
                                <i>
                                  {processes.find((v) => v.id === i)?.pending}
                                  &nbsp;(toàn bộ)
                                </i>
                              </p>
                              <b>{item.processes[i].pending || 0}</b>
                              <p>
                                <i>
                                  {processes.find((v) => v.id === i)?.fulfilled}
                                </i>
                              </p>
                              <b>{item.processes[i].fulfilled || 0}</b>
                              <p>
                                <i>
                                  {processes.find((v) => v.id === i)?.rejected}
                                </i>
                              </p>
                              <b>{item.processes[i].rejected || 0}</b>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkshopStatistic;
