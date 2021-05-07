import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import {
  accessibilityOutline,
  barcodeOutline,
  textOutline,
} from "ionicons/icons";
import React from "react";
import { useProductForm } from "../../hooks/useProductForm";

interface ProductFormProps {
  form: ReturnType<typeof useProductForm>;
}

const ProductForm: React.FC<ProductFormProps> = ({ form }) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem>
            <IonIcon icon={textOutline} slot="start" />
            <IonInput
              value={form.fields.name}
              placeholder="Tên sản phẩm"
              onIonChange={(e) =>
                form.setFieldsValue({ name: e.detail.value! })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon icon={barcodeOutline} slot="start" />
            <IonInput
              value={form.fields.code}
              placeholder="Mã sản phẩm"
              onIonChange={(e) =>
                form.setFieldsValue({ code: e.detail.value! })
              }
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonIcon icon={accessibilityOutline} slot="start" />
            <IonLabel>
              <b>Kích cỡ</b>
            </IonLabel>
            <IonSelect
              value={form.fields.sizes}
              onIonChange={(e) =>
                form.setFieldsValue({ sizes: e.detail.value! })
              }
              multiple={true}
              cancelText="Hủy"
              okText="Ok!"
            >
              <IonSelectOption value="XS">XS</IonSelectOption>
              <IonSelectOption value="S">S</IonSelectOption>
              <IonSelectOption value="M">M</IonSelectOption>
              <IonSelectOption value="L">L</IonSelectOption>
              <IonSelectOption value="XL">XL</IonSelectOption>
              <IonSelectOption value="XXL">XXL</IonSelectOption>
              <IonSelectOption value="XXXL">XXXL</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <IonCard className="list-card">
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>
              <b>Quy trình sản xuất</b>
            </IonLabel>
            <IonSelect
              value={form.fields.processes}
              onIonChange={(e) =>
                form.setFieldsValue({ processes: e.detail.value! })
              }
              multiple={true}
              cancelText="Hủy"
              okText="Ok!"
            >
              {form.processes.map((process, i) => (
                <IonSelectOption key={i} value={process.id}>
                  {process.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCardContent>
      </IonCard>
      {/* <IonItem lines="full" button>
        <IonIcon icon={cameraOutline} slot="start"></IonIcon>
        <IonThumbnail slot="end">
          <img
            alt=""
            src="/assets/icon/icon.png"
          />
        </IonThumbnail>
      </IonItem> */}
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel position="floating">Ghi chú</IonLabel>
            <IonTextarea
              value={form.fields.note}
              onIonChange={(e) =>
                form.setFieldsValue({ note: e.detail.value! })
              }
            ></IonTextarea>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ProductForm;
