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
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import copy from "copy-to-clipboard";
import { copyOutline, qrCodeOutline, refresh } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { v4 } from "uuid";
import CustomerForm from "../../../components/forms/CustomerForm";
import { useCustomerForm } from "../../../hooks/useCustomerForm";
import { saveCustomer } from "../../../models/customer";
import { useSelector } from "../../../store";
import { updateCustomer } from "../../../store/data/customerSlice";
import { toast } from "../../../utils/toast";
import QRCode from "qrcode.react";

interface CustomerUpdateProps {}

const CustomerUpdate: React.FC<CustomerUpdateProps> = () => {
  const uid = useSelector((state) => state.user.uid);
  const { id } = useParams<{ id: string }>();
  const customer = useSelector((state) =>
    state.customers.find((i) => i.id === id)
  );
  const form = useCustomerForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (customer) form.setFieldsValue(customer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const handleUpdateCode = async () => {
    const code = v4();
    try {
      await saveCustomer(uid, {
        ...customer,
        code,
      });
      toast("Lưu thành công.");
      dispatch(updateCustomer({ ...customer!, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleCopy = () => {
    copy(customer?.code || "Hãy tạo mã trước!");
    toast(customer?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!");
  };

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/customers"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa khách hàng</IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" onClick={() => form.submit()}>
              Lưu
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <CustomerForm form={form} />

              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem>
                    <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                    <IonInput
                      value={customer?.code || "Hãy tạo code mới"}
                      onIonChange={() => {}}
                    />
                    <IonButtons slot="end">
                      <IonButton onClick={handleUpdateCode}>
                        <IonIcon slot="icon-only" icon={refresh}></IonIcon>
                      </IonButton>
                      <IonButton onClick={handleCopy}>
                        <IonIcon slot="icon-only" icon={copyOutline}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonItem>
                  {customer?.code && (
                    <IonItem>
                      <QRCode
                        style={{ margin: "auto" }}
                        id="qrcode"
                        value={customer?.code}
                        size={290}
                        level={"H"}
                        includeMargin={true}
                      />
                    </IonItem>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CustomerUpdate;
