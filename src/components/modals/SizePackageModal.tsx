import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, textOutline, trashOutline } from "ionicons/icons";
import { useSizePackageForm } from "../../hooks/useSizePackageForm";
import { toast } from "../../utils/toast";

interface Props {
  isOpen: boolean;
  onDidDismiss: () => any;
  form: ReturnType<typeof useSizePackageForm>;
}

const SizePackageModal: React.FC<Props> = ({ isOpen, onDidDismiss, form }) => {
  const handleSubmit = async () => {
    try {
      await form.submit();
      onDidDismiss();
      toast("Lưu thành công!");
    } catch (err) {
      toast("Có lỗi xảy ra không thể lưu!");
    }
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{form.id ? "Sửa" : "Thêm"} kích cỡ</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSubmit}>Lưu</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          <IonItem>
            <IonIcon slot="start" icon={textOutline} />
            <IonInput
              placeholder="Nhập tên gói kích cỡ"
              value={form.name}
              onIonChange={(e) => form.setName(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <b>Danh sách kích cỡ</b>
          </IonListHeader>
          {form.sizes.map((item, index) => (
            <IonItem key={index}>
              <IonInput
                placeholder="Nhập kích cỡ"
                value={item}
                onIonChange={(e) => form.setSizeAtIndex(index, e.detail.value!)}
              ></IonInput>
              {form.sizes.length > 1 && (
                <IonIcon
                  onClick={() => form.removeSizeAtItem(index)}
                  slot="end"
                  icon={trashOutline}
                  style={{ cursor: "pointer" }}
                />
              )}
            </IonItem>
          ))}
        </IonList>
        {form.id && (
          <IonList>
            <IonListHeader>
              <b>Hoặc xóa bỏ gói kích cỡ này?</b>
            </IonListHeader>

            <IonItem button>
              <IonLabel className="ion-text-center" color="danger">
                XÓA
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};

export default SizePackageModal;
