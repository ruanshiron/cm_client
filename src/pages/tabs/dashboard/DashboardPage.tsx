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
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  createOutline,
  statsChartOutline,
  statsChartSharp,
} from "ionicons/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import StageItem from "../../../components/items/StageItem";
import { database } from "../../../config/firebase";
import { getOrders } from "../../../models/order";
import { getStages, Stage } from "../../../models/stage";
import { useSelector } from "../../../store";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { CHART_COLOR, filter, processMetrics } from "../../../utils/data";
import { formatStringDate } from "../../../utils/date";
import { PieChart } from "react-minimal-pie-chart";
import { Bar } from "react-chartjs-2";

const Item: React.FC<{ padding?: boolean }> = ({ children, padding }) => {
  return (
    <IonCard
      className={`border-full ${padding ? "" : "list-card"}`}
      style={{ boxShadow: "none", margin: 4 }}
    >
      <IonCardContent>{children}</IonCardContent>
    </IonCard>
  );
};

const UpdateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [diabled, setDisabled] = useState(false);
  const handleClick = () => {
    onClick();
    if (!diabled) {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 5000);
    }
  };
  return (
    <IonButton
      disabled={diabled}
      onClick={handleClick}
      size="small"
      expand="block"
      fill="clear"
    >
      Cập nhật
    </IonButton>
  );
};

const ProcessMetrics: React.FC<{ isEditting: boolean; metrics: any }> = ({
  isEditting,
  metrics,
}) => {
  const {
    processes,
    user: { uid },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [chart, setChart] = useState(false);
  const handleUpdate = () => {
    database
      .collection("users")
      .doc(uid)
      .collection("stages")
      .get()
      .then((snap) => {
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const metrics = processMetrics(data as Stage[]);
        database
          .collection("users")
          .doc(uid)
          .set({ metrics: { processes: metrics } }, { merge: true });
      });
  };
  useEffect(() => {
    dispatch(fetchAllProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Item>
      <IonList lines="full" style={{ border: "none" }}>
        <IonListHeader>
          <IonLabel>Quy trình sản xuất</IonLabel>
          <IonButton onClick={() => setChart((c) => !c)} size="small">
            <IonIcon icon={chart ? statsChartSharp : statsChartOutline} />
          </IonButton>
        </IonListHeader>
        {chart ? (
          <Bar
            style={{ padding: 12 }}
            type
            data={{
              labels: Object.keys(metrics)
                .sort()
                .map((key) => processes.find((i) => i.id === key)?.name),
              datasets: [
                {
                  label: "tổng",
                  data: Object.keys(metrics)
                    .sort()
                    .map((key) => metrics[key]?.pending),
                  backgroundColor: "rgb(54, 162, 235)",
                },
                {
                  label: "xong",
                  data: Object.keys(metrics)
                    .sort()
                    .map((key) => metrics[key]?.fulfilled),
                  backgroundColor: "rgb(75, 192, 192)",
                },
                {
                  label: "lỗi",
                  data: Object.keys(metrics)
                    .sort()
                    .map((key) => metrics[key]?.rejected),
                  backgroundColor: "rgb(255, 99, 132)",
                },
              ],
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        ) : (
          Object.keys(metrics)
            .sort()
            .map((key) => (
              <IonItem>
                <IonLabel slot="start">
                  <b>{processes.find((i) => i.id === key)?.name}</b>
                  <p>
                    <span style={{ color: "rgb(54, 162, 235)" }}>
                      {metrics[key]?.pending || 0}
                    </span>
                    <span className="ion-margin">/</span>
                    <span style={{ color: "rgb(75, 192, 192)" }}>
                      {metrics[key]?.fulfilled || 0}
                    </span>
                    <span className="ion-margin">/</span>
                    <span style={{ color: "rgb(255, 99, 132)" }}>
                      {metrics[key]?.rejected || 0}
                    </span>
                    <small className="ion-margin">sp</small>
                  </p>
                </IonLabel>
                <IonProgressBar
                  style={{ height: 10 }}
                  value={(metrics[key]?.fulfilled || 0) / metrics[key]?.pending}
                />
              </IonItem>
            ))
        )}
      </IonList>
      {isEditting && <UpdateButton onClick={handleUpdate} />}
    </Item>
  );
};

const RecentPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const {
    user: { uid },
  } = useSelector((state) => state);
  useEffect(() => {
    database
      .collectionGroup("payments")
      .orderBy("date", "desc")
      .where("uid", "==", uid)
      .limit(3)
      .get()
      .then((snap) => {
        setPayments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <IonListHeader>
        <IonLabel>Thanh toán gần nhất</IonLabel>
      </IonListHeader>
      <Item>
        <IonList lines="full" style={{ border: "none" }}>
          {payments.map((item) => (
            <IonItem key={item.id}>
              <IonText>{item.note}</IonText>
              <IonText slot="end">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.amount)}
              </IonText>
            </IonItem>
          ))}
        </IonList>
      </Item>
    </>
  );
};

const SellingsMetrics: React.FC<{ metrics: any }> = ({ metrics }) => {
  const data = useMemo(
    () =>
      Object.keys(metrics)
        .sort()
        .filter((key) => metrics[key].value),
    [metrics]
  );
  if (!metrics || data.length === 0) return null;
  return (
    <IonCol sizeMd="6" size="12">
      <Item>
        <IonRow>
          <IonCol className="ion-padding" size="4">
            <PieChart
              data={data.map((key, i) => ({
                title: metrics[key].name,
                value: metrics[key].value,
                color: CHART_COLOR[i % 20],
              }))}
            />
            ;
          </IonCol>
          <IonCol>
            <IonList lines="full" style={{ border: "none" }}>
              <IonListHeader>
                <IonLabel>
                  <b>
                    {Object.values(metrics)
                      .map((m: any) => m.value)
                      .reduce((a, b) => {
                        return a + b;
                      }, 0)}
                  </b>
                  &nbsp;sp đã bán
                </IonLabel>
              </IonListHeader>
              {data.map((key, i) => (
                <IonItem>
                  <IonText style={{ color: CHART_COLOR[i % 20] }}>
                    {metrics[key].name}
                  </IonText>
                  <IonText slot="end">{metrics[key].value}</IonText>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </Item>
    </IonCol>
  );
};

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const { uid } = useSelector((state) => state.user);
  const [isEditting, setIsEditting] = useState(false);
  const [productsCount, setProductsCount] = useState("Đang tải...");
  const [workshopsCount, setWorkshopsCount] = useState("Đang tải...");
  const [employeesCount, setEmployeesCount] = useState("Đang tải...");
  const [customersCount, setCustomersCount] = useState("Đang tải...");
  const [metricsProcesses, setMetricsProcesses] = useState({});
  const [metricsSellings, setMetricsSellings] = useState({});
  const [stages, setStages] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const handleUpdate = (field: string) => {
    switch (field) {
      case "products_count":
        database
          .collection("users")
          .doc(uid)
          .collection("products")
          .get()
          .then((snap) => {
            const products_count = snap.docs.length;
            database
              .collection("users")
              .doc(uid)
              .set({ products_count }, { merge: true });
          });
        break;
      case "workshops_count":
        database
          .collection("users")
          .doc(uid)
          .collection("workshops")
          .get()
          .then((snap) => {
            const workshops_count = snap.docs.length;
            database
              .collection("users")
              .doc(uid)
              .set({ workshops_count }, { merge: true });
          });
        break;
      case "employees_count":
        database
          .collection("users")
          .doc(uid)
          .collection("employees")
          .get()
          .then((snap) => {
            const employees_count = snap.docs.length;
            database
              .collection("users")
              .doc(uid)
              .set({ employees_count }, { merge: true });
          });
        break;
      case "customers_count":
        database
          .collection("users")
          .doc(uid)
          .collection("customers")
          .get()
          .then((snap) => {
            const customers_count = snap.docs.length;
            database
              .collection("users")
              .doc(uid)
              .set({ customers_count }, { merge: true });
          });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getStages(uid, { limit: 5 }).then((snap) => {
      const groups = filter(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Stage))
      );
      setStages(groups);
    });
    getOrders(uid).then((snap) => {
      setOrders([]);
      snap.docs.forEach((doc) => {
        const data = doc.data();
        if (doc.ref.parent.parent) {
          doc.ref.parent.parent.get().then((customer) => {
            const cus_data = customer.data();
            const order = {
              id: doc.id,
              lines: data?.lines || [],
              ...data,
              customerName: cus_data?.name || "",
            };
            setOrders((o) => [order, ...o]);
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const unsubcribe = database
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        const data = doc.data();
        setProductsCount(data?.products_count || 0);
        setWorkshopsCount(data?.workshops_count || 0);
        setEmployeesCount(data?.employees_count || 0);
        setCustomersCount(data?.customers_count || 0);
        if (data?.metrics?.processes)
          setMetricsProcesses(data.metrics.processes);
        if (data?.metrics?.sellings) setMetricsSellings(data.metrics.sellings);
      });
    return () => unsubcribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tổng hợp</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsEditting((e) => !e)}>
              <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol sizeMd="3" size="6">
              <Item>
                <div style={{ padding: 12 }}>
                  <IonText>
                    <h1>{productsCount}</h1>
                    <p>Sản phẩm</p>
                  </IonText>
                </div>
                {isEditting && (
                  <UpdateButton
                    onClick={() => handleUpdate("products_count")}
                  />
                )}
              </Item>
            </IonCol>
            <IonCol sizeMd="3" size="6">
              <Item>
                <div style={{ padding: 12 }}>
                  <IonText>
                    <h1>{workshopsCount}</h1>
                    <p>Xưởng</p>
                  </IonText>
                </div>
                {isEditting && (
                  <UpdateButton
                    onClick={() => handleUpdate("workshops_count")}
                  />
                )}
              </Item>
            </IonCol>
            <IonCol sizeMd="3" size="6">
              <Item>
                <div style={{ padding: 12 }}>
                  <IonText>
                    <h1>{customersCount}</h1>
                    <p>Khách hàng</p>
                  </IonText>
                </div>
                {isEditting && (
                  <UpdateButton
                    onClick={() => handleUpdate("customers_count")}
                  />
                )}
              </Item>
            </IonCol>
            <IonCol sizeMd="3" size="6">
              <Item>
                <div style={{ padding: 12 }}>
                  <IonText>
                    <h1>{employeesCount}</h1>
                    <p>Công nhân</p>
                  </IonText>
                </div>
                {isEditting && (
                  <UpdateButton
                    onClick={() => handleUpdate("employees_count")}
                  />
                )}
              </Item>
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <ProcessMetrics
                metrics={metricsProcesses}
                isEditting={isEditting}
              />
            </IonCol>
            <SellingsMetrics metrics={metricsSellings} />

            <IonCol style={{ paddingTop: 12 }}  sizeMd="4" size="6">
              <RecentPayments />
            </IonCol>
            <IonCol style={{ paddingTop: 12 }} sizeMd="4" size="12">
              <IonListHeader>
                <IonLabel>{stages.length > 0 ? "Sản xuất" : ""}</IonLabel>
              </IonListHeader>
              {stages.map((group, i) => (
                <Item key={i}>
                  <IonList
                    style={{ border: "none" }}
                    className="fadin ion-margin-top"
                    key={i}
                  >
                    <IonItemDivider className="top-divider" color="white">
                      <IonLabel>{formatStringDate(group.name)}</IonLabel>
                    </IonItemDivider>
                    {group.events.map((item: any, j: number) => (
                      <StageItem stage={item} key={j} />
                    ))}
                  </IonList>
                </Item>
              ))}
              <IonButton expand="block" fill="clear">
                Xem toàn bộ
              </IonButton>
            </IonCol>
            <IonCol style={{ paddingTop: 12 }} sizeMd="4" size="12">
              <IonListHeader>
                <IonLabel>{orders.length > 0 ? "Đơn hàng" : ""}</IonLabel>
              </IonListHeader>
              {orders.map((order, i) => (
                <Item>
                  <IonList lines="full" style={{ border: "none" }}>
                    <IonItem>
                      <IonLabel>
                        {formatStringDate(order.date)} - {order.customerName}
                      </IonLabel>
                    </IonItem>
                    {order.lines.map((line: any) => (
                      <IonItem>
                        <IonText>
                          <b>{line.productName}</b>
                        </IonText>
                        <IonText slot="end">
                          <p>{line.quantity || 0} sp</p>
                        </IonText>
                      </IonItem>
                    ))}
                  </IonList>
                </Item>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
