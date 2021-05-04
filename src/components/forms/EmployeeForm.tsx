import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
} from "@ionic/react";
import { callOutline, personOutline } from "ionicons/icons";
import React from "react";
import { useEmployeeForm } from "../../hooks/useEmployeeForm";

interface EmployeeFormProps {
  form: ReturnType<typeof useEmployeeForm>;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ form }) => {
  return (
    <>
      <IonCard className="list-card">
        <IonCardContent>
          <IonItem>
            <IonIcon icon={personOutline} slot="start" />
            <IonInput
              name="name"
              placeholder="Tên công nhân"
              value={form.fields.name}
              onIonChange={(e) =>
                form.setFieldsValue({ name: e.detail.value! })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon icon={callOutline} slot="start" />
            <IonInput
              name="phonenumber"
              placeholder="Số điện thoại"
              value={form.fields.phonenumber}
              onIonChange={(e) =>
                form.setFieldsValue({ phonenumber: e.detail.value! })
              }
            ></IonInput>
          </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default EmployeeForm;
