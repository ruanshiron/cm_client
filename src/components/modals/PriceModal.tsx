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
  peopleOutline,
  shirtOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { database } from "../../config/firebase";
import { useSelector } from "../../store";
import { fetchAllCustomers } from "../../store/data/customerSlice";
import { fetchAllProducts } from "../../store/data/productSlice";

interface Props {
  id?: string;
  defaultProductId?: string;
  defaultCustomerId?: string;
  isOpen: boolean;
  onDidDismiss: () => void;
}

const PriceModal: React.FC<Props> = ({
  id,
  isOpen,
  onDidDismiss,
  defaultProductId,
  defaultCustomerId,
}) => {
  const [presentToast] = useIonToast();
  const {
    products,
    customers,
    user: { uid },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(defaultProductId);
  const [customerId, setCustomerId] = useState(defaultCustomerId);
  const [value, setValue] = useState<string>();
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();

  const handleDidPresent = () => {
    dispatch(fetchAllCustomers());
    dispatch(fetchAllProducts());
    setLoading(true);
    database
      .collection("users")
      .doc(uid)
      .collection("prices")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (doc.exists && data) {
          setProductId(data.productId);
          setCustomerId(data.customerId);
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
  };

  const handleSubmit = () => {
    if (loading) return;
    if (!productId || !customerId || !value) {
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

    const price = {
      productId,
      productName: products.find((i) => i.id === productId)?.name || "",
      productCode: products.find((i) => i.id === productId)?.code || "",
      customerId,
      customerName: customers.find((i) => i.id === customerId)?.name || "",
      value: parseInt(value),
      from: from ? from.substring(0, 10) : "",
      to: to ? to.substring(0, 10) : "",
    };

    if (id) {
      database
        .collection("users")
        .doc(uid)
        .collection("prices")
        .doc(id)
        .set(price)
        .then(() => {
          presentToast({
            message: "Đã lưu giá bán",
            duration: 2000,
            color: "success",
          });
          onDidDismiss();
        })
        .catch(() => {
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
        .collection("prices")
        .add(price)
        .then(() => {
          presentToast({
            message: "Đã thêm giá bán",
            duration: 2000,
            color: "success",
          });
          onDidDismiss();
        })
        .catch(() => {
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
      <IonContent>
        <IonList>
          <IonListHeader>
            <b>Sản phẩm và giá</b>
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
            <IonLabel>Khách hàng</IonLabel>
            <IonSelect
              disabled={loading}
              value={customerId}
              onIonChange={(e) => setCustomerId(e.detail.value!)}
              okText="Chọn"
              interface="action-sheet"
              cancelText="Hủy"
            >
              {customers.map((item, index) => (
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

export default PriceModal;
