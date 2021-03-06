import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonActionSheet,
} from "@ionic/react";
import {
  barcodeOutline,
  close,
  earthOutline,
  personOutline,
  phonePortraitOutline,
  pulseOutline,
  qrCodeOutline,
} from "ionicons/icons";
import React from "react";
import { saveCustomer } from "../../models/customer";
import QRCode from "qrcode.react";
import copy from "copy-to-clipboard";
import { toast } from "../../utils/toast";
import { updateCustomer } from "../../store/data/customerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { v4 } from "uuid";
import { useParams } from "react-router";

interface Props {
  hide?: boolean;
}

const CustomerInfoTab: React.FC<Props> = ({ hide }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { uid } = useSelector((state) => state.user);
  const [presentActionSheet] = useIonActionSheet();
  const customer = useSelector((state) =>
    state.customers.find((v) => v.id === id)
  );
  const handleUpdateCode = async () => {
    const code = v4();
    try {
      await saveCustomer(uid, {
        ...customer,
        code,
      });
      toast("Lưu thành công.");
      if (customer) dispatch(updateCustomer({ ...customer, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  const handleCode = () => {
    if (customer?.code) {
      presentActionSheet({
        buttons: [
          {
            icon: earthOutline,
            text: "Sao chép liên kết",
            handler: () => {
              if (customer?.code) {
                copy(window.location.hostname + "/qr/" + customer.code);
              }
              toast(
                customer?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
              );
            },
          },
          {
            icon: barcodeOutline,
            text: "Chỉ sao chép mã",
            handler: () => {
              if (customer?.code) {
                copy(customer.code);
              }
              toast(
                customer?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
              );
            },
          },
          {
            icon: close,
            text: "Hủy",
          },
        ],
      });
    } else {
      presentActionSheet({
        buttons: [
          {
            icon: pulseOutline,
            text: "Tạo mã",
            handler: () => {
              handleUpdateCode();
            },
          },
          {
            icon: close,
            text: "Hủy",
          },
        ],
      });
    }
  };
  if (hide) return null;
  return (
    <IonCard className="list-card">
      <IonCardContent>
        <IonList lines="full" style={{ border: "none" }}>
          <IonItem>
            <IonIcon icon={personOutline} slot="start"></IonIcon>
            <IonLabel>{customer?.name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={phonePortraitOutline} slot="start"></IonIcon>
            <IonLabel>{customer?.phonenumber}</IonLabel>
          </IonItem>
          <IonItem button onClick={handleCode}>
            <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
            <IonInput
              value={customer?.code || "Hãy tạo code mới"}
              readonly
              onIonChange={() => {}}
            />
          </IonItem>
          {customer?.code && (
            <IonItem button onClick={handleCode}>
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
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default CustomerInfoTab;
