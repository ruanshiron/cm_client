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
import EmployeeForm from "../../../components/forms/EmployeeForm";
import { useEmployeeForm } from "../../../hooks/useEmployeeForm";
import { saveEmployee } from "../../../models/employee";
import { useSelector } from "../../../store";
import { updateEmployee } from "../../../store/data/employeeSlice";
import { toast } from "../../../utils/toast";
import QRCode from "qrcode.react";

interface EmployeeUpdateProps {}

const EmployeeUpdate: React.FC<EmployeeUpdateProps> = () => {
  const { id } = useParams<{ id: string }>();
  const uid = useSelector((state) => state.user.uid)
  const employee = useSelector((state) =>
    state.employees.find((i) => i.id === id)
  );
  const form = useEmployeeForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (employee) form.setFieldsValue(employee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  const handleUpdateCode = async () => {
    const code = v4();
    try {
      await saveEmployee(uid, {
        ...employee,
        code,
      });
      toast("Lưu thành công.");
      dispatch(updateEmployee({ ...employee!, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleCopy = () => {
    copy(employee?.code || "Hãy tạo mã trước!");
    toast(employee?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!");
  };

  return (
    <IonPage className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/employees"></IonBackButton>
          </IonButtons>
          <IonTitle>Sửa công nhân</IonTitle>
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
              <EmployeeForm form={form} />
              <IonCard className="list-card">
                <IonCardContent>
                  <IonItem>
                    <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                    <IonInput
                      value={employee?.code || "Hãy tạo code mới"}
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
                  {employee?.code && (
                    <IonItem>
                      <QRCode
                        style={{ margin: "auto" }}
                        id="qrcode"
                        value={employee?.code}
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

export default EmployeeUpdate;
