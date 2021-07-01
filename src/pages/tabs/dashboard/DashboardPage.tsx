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
import { createOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StageItem from "../../../components/items/StageItem";
import { database } from "../../../config/firebase";
import { getOrders } from "../../../models/order";
import { getStages, Stage } from "../../../models/stage";
import { useSelector } from "../../../store";
import { fetchAllProcesses } from "../../../store/data/processSlice";
import { filter, processMetrics } from "../../../utils/data";
import { formatStringDate } from "../../../utils/date";

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
          {isEditting && (
            <IonButton onClick={handleUpdate} size="small">
              Cập nhật
            </IonButton>
          )}
        </IonListHeader>
        {Object.keys(metrics)
          .sort()
          .map((key) => (
            <IonItem>
              <IonLabel slot="start">
                <b>{processes.find((i) => i.id === key)?.name}</b>
                <p>
                  <span>{metrics[key]?.fulfilled || 0}</span>
                  <span className="ion-margin">/</span>
                  <span>{metrics[key]?.pending || 0}</span>
                  <small className="ion-margin">sp</small>
                </p>
              </IonLabel>
              <IonProgressBar
                style={{ height: 10 }}
                value={(metrics[key]?.fulfilled || 0) / metrics[key]?.pending}
              />
            </IonItem>
          ))}
      </IonList>
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
    <Item>
      <IonList lines="full" style={{ border: "none" }}>
        <IonListHeader>
          <IonLabel>Thành toán gần nhất</IonLabel>
        </IonListHeader>
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
  );
};

const SellingsMetrics: React.FC<{ metrics: any }> = ({ metrics }) => {
  return (
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
      {Object.keys(metrics)
        .sort()
        .filter((key) => metrics[key].value)
        .map((key) => (
          <IonItem>
            <IonText>{metrics[key].name}</IonText>
            <IonText slot="end">{metrics[key].value}</IonText>
          </IonItem>
        ))}
    </IonList>
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
            <IonCol sizeMd="3" size="6">
              <Item>
                <SellingsMetrics metrics={metricsSellings} />
              </Item>
            </IonCol>
            <IonCol sizeMd="3" size="6">
              <RecentPayments />
            </IonCol>
            <IonCol style={{ paddingTop: 12 }} sizeMd="6" size="12">
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
            <IonCol style={{ paddingTop: 12 }} sizeMd="6" size="12">
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
