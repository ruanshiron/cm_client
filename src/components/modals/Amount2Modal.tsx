import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import {
  calendarClearOutline,
  calendarNumberOutline,
  cashOutline,
  closeOutline,
  helpOutline,
  peopleOutline,
  shirtOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { database } from "../../config/firebase";
import { useSelector } from "../../store";
import { fetchAllProducts } from "../../store/data/productSlice";
import { fetchAllWorkshops } from "../../store/data/workshopSlice";

interface Props {
  id?: string;
  defaultProductId?: string;
  defaultWorkshopId?: string;
  isOpen: boolean;
  onDidDismiss: () => void;
}

const Amount2Modal: React.FC<Props> = ({
  id,
  isOpen,
  onDidDismiss,
  defaultProductId,
  defaultWorkshopId,
}) => {
  const [presentToast] = useIonToast();
  const {
    products,
    workshops,
    processes,
    user: { uid },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(defaultProductId);
  const [workshopId, setWorkshopId] = useState(defaultWorkshopId);
  const [processId, setProcessId] = useState<string>();
  const [value, setValue] = useState<string>();
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();

  const handleDidPresent = () => {
    if (workshops.length <= 0) dispatch(fetchAllWorkshops());
    if (products.length <= 0) dispatch(fetchAllProducts());
    if (id) {
      setLoading(true);
      database
        .collection("users")
        .doc(uid)
        .collection("amounts")
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (doc.exists && data) {
            setProductId(data.productId);
            setProcessId(data.processId);
            setWorkshopId(data.workshopId);
            setValue(data.value);
            setFrom(data.from);
            setTo(data.To);
          }
          setLoading(false);
        })
        .catch(() => {
          presentToast({
            message: "Lỗi không tải được dữ liệu",
            duration: 2000,
            color: "warning",
          });
          setLoading(false);
        });
    } else {
      setProductId(defaultProductId);
      setProcessId(undefined);
      setWorkshopId(defaultWorkshopId);
      setValue(undefined);
      setFrom(undefined);
      setTo(undefined);
    }
  };

  const handleSubmit = () => {
    if (loading) return;
    if (!productId || !workshopId || !value) {
      presentToast({
        message: "Hãy điền đầy đủ thông tin!",
        duration: 2000,
        color: "danger",
      });
      return;
    }
    if (parseInt(value) < 0) {
      presentToast({
        message: "Không điền số tiền âm!",
        duration: 2000,
        color: "danger",
      });
      return;
    }
    setLoading(true);
    const amount = {
      productId,
      productName: products.find((i) => i.id === productId)?.name || "",
      productCode: products.find((i) => i.id === productId)?.code || "",
      workshopId,
      workshopName: workshops.find((i) => i.id === workshopId)?.name || "",
      processId,
      processName: processes.find((i) => i.id === processId)?.name || "",
      value: parseInt(value),
      from: from ? from.substring(0, 10) : "",
      to: to ? to.substring(0, 10) : "",
    };

    if (id) {
      database
        .collection("users")
        .doc(uid)
        .collection("amounts")
        .doc(id)
        .set(amount)
        .then(() => {
          setLoading(false);
          presentToast({
            message: "Đã lưu giá công",
            duration: 2000,
            color: "success",
          });
          onDidDismiss();
        })
        .catch(() => {
          setLoading(false);
          presentToast({
            message: "Có lỗi xảy ra không thể lưu",
            duration: 2000,
            color: "danger",
          });
        });
    } else {
      database
        .collection("users")
        .doc(uid)
        .collection("amounts")
        .add(amount)
        .then(() => {
          setLoading(false);
          presentToast({
            message: "Đã thêm giá công",
            duration: 2000,
            color: "success",
          });
          onDidDismiss();
        })
        .catch(() => {
          setLoading(false);
          presentToast({
            message: "Có lỗi xảy ra không thể thêm",
            duration: 2000,
            color: "danger",
          });
        });
    }
  };

  const handleFromToReset = () => {
    setFrom(undefined);
    setTo(undefined);
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      onDidPresent={handleDidPresent}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Thêm/ Sửa</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={loading} onClick={handleSubmit}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div style={{ height: 5 }}>
        <IonProgressBar
          className={loading ? "" : "ion-hide"}
          type="indeterminate"
        />
      </div>
      <IonContent>
        <IonList>
          <IonListHeader>
            <b>Sản phẩm và giá công theo xưởng</b>
          </IonListHeader>
          <IonItem>
            <IonIcon icon={shirtOutline} slot="start" />
            <IonLabel>Sản phẩm</IonLabel>
            <IonSelect
              disabled={loading}
              value={productId}
              onIonChange={(e) => setProductId(e.detail.value!)}
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            >
              {products.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name} ({item.code})
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>Xưởng</IonLabel>
            <IonSelect
              disabled={loading}
              value={workshopId}
              onIonChange={(e) => setWorkshopId(e.detail.value!)}
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            >
              {workshops.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={helpOutline} slot="start" />
            <IonLabel>Quy trình</IonLabel>
            <IonSelect
              value={processId}
              onIonChange={(e) => setProcessId(e.detail.value!)}
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            >
              {processes.map((item, index) => (
                <IonSelectOption key={index} value={item.id}>
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={cashOutline} />
            <IonInput
              disabled={loading}
              value={value}
              onIonChange={(e) => setValue(e.detail.value!)}
              placeholder="Giá tiền VNĐ"
              type="number"
            />
          </IonItem>
          <IonListHeader>
            <IonLabel>
              <b>Khoảng thời gian</b>
            </IonLabel>
            <IonButton size="small" onClick={handleFromToReset}>
              Đặt lại
            </IonButton>
          </IonListHeader>
          <IonItem>
            <IonIcon icon={calendarClearOutline} slot="start" />
            <IonLabel>Từ ngày</IonLabel>
            <IonDatetime
              disabled={loading}
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
              value={from}
              onIonChange={(e) => setFrom(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon icon={calendarNumberOutline} slot="start" />
            <IonLabel>Đến ngày</IonLabel>
            <IonDatetime
              disabled={loading}
              displayFormat="YYYY-MM-DD"
              doneText="OK!"
              cancelText="Hủy"
              value={to}
              onIonChange={(e) => setTo(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Amount2Modal;
