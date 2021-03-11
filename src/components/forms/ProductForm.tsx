import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import { useProductForm } from "../../hooks/useProductForm";

interface ProductFormProps {
  form: ReturnType<typeof useProductForm>;
}

const ProductForm: React.FC<ProductFormProps> = ({ form }) => {
  return (
    <>
      <IonCard>
        <IonCardContent>
          <IonItem>
            <IonLabel position="floating">Tên</IonLabel>
            <IonInput
              value={form.fields.name}
              onIonChange={(e) =>
                form.setFieldsValue({ name: e.detail.value! })
              }
              readonly={form.readonly}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mã</IonLabel>
            <IonInput
              value={form.fields.code}
              onIonChange={(e) =>
                form.setFieldsValue({ code: e.detail.value! })
              }
              readonly={form.readonly}
              ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="floating">Kích cỡ</IonLabel>
            <IonSelect
              value={form.fields.sizes}
              onIonChange={(e) =>
                form.setFieldsValue({ sizes: e.detail.value! })
              }
              multiple={true}
              cancelText="Hủy"
              okText="Ok!"
              disabled={form.readonly}
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

      <IonCard>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel position="floating">Quy trình sản xuất</IonLabel>
            <IonSelect
              value={form.fields.processes}
              onIonChange={(e) =>
                form.setFieldsValue({ processes: e.detail.value! })
              }
              multiple={true}
              cancelText="Hủy"
              okText="Ok!"
              disabled={form.readonly}
            >
              <IonSelectOption value="process_1">Hoàn thiện</IonSelectOption>
              <IonSelectOption value="process_2">In</IonSelectOption>
              <IonSelectOption value="process_3">Thêu</IonSelectOption>
              <IonSelectOption value="process_4">Sửa lỗi</IonSelectOption>
              <IonSelectOption value="process_5">Nhập kho</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCardContent>
      </IonCard>
      {/* <IonItem lines="full" button>
        <IonIcon icon={cameraOutline} slot="start"></IonIcon>
        <IonThumbnail slot="end">
          <img
            alt=""
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
        </IonThumbnail>
      </IonItem> */}
      <IonCard>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel position="floating">Ghi chú</IonLabel>
            <IonTextarea
              value={form.fields.note}
              onIonChange={(e) =>
                form.setFieldsValue({ note: e.detail.value! })
              }
              readonly={form.readonly}
              ></IonTextarea>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ProductForm;
