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
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import copy from "copy-to-clipboard";
import {
  callOutline,
  callSharp,
  close,
  copyOutline,
  ellipsisVertical,
  pencilOutline,
  personOutline,
  phonePortraitOutline,
  qrCodeOutline,
  refresh,
  trashOutline,
} from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { destroyEmployee, saveEmployee } from "../../../models/employee";
import { useSelector } from "../../../store";
import {
  removeEmployee,
  updateEmployee,
} from "../../../store/data/employeeSlice";
import QRCode from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "../../../utils/toast";

interface EmployeeDetailProps {}

export const EmployeeDetail: React.FC<EmployeeDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const { id } = useParams<{ id: string }>();
  const employee = useSelector((state) =>
    state.employees.find((v) => v.id === id)
  );

  const handleDeleteEmployee = async () => {
    try {
      if (id) await destroyEmployee(uid, id);

      toast("Xóa thành công!");
      dispatch(removeEmployee(id));

      router.goBack();
    } catch (error) {
      toast("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleUpdateCode = async () => {
    const code = uuidv4();
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
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/employees" />
            </IonButtons>
            <IonTitle>Công nhân</IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon
                  slot="icon-only"
                  ios={callOutline}
                  md={callSharp}
                ></IonIcon>
              </IonButton>
              <IonButton
                onClick={() =>
                  presentActionSheet({
                    buttons: [
                      {
                        text: "Xóa",
                        icon: trashOutline,
                        handler: () => {
                          presentDeleteAlert({
                            header: "Xóa sản phẩm",
                            message: "Bạn có chắc muốn xóa?",
                            buttons: [
                              "Hủy",
                              {
                                text: "OK!",
                                handler: handleDeleteEmployee,
                              },
                            ],
                            onDidDismiss: (e) => console.log("did dismiss"),
                          });
                        },
                      },
                      {
                        text: "Sửa",
                        icon: pencilOutline,
                        handler: () => {
                          router.push(router.routeInfo.pathname + "/update");
                        },
                      },
                      { text: "Thoát", icon: close },
                    ],
                  })
                }
              >
                <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="8" offsetMd="2">
              <IonCard className="list-card">
                <IonCardContent>
                  <IonList lines="full" style={{ border: "none" }}>
                    <IonItem>
                      <IonIcon icon={personOutline} slot="start"></IonIcon>
                      <IonLabel slot="start">{employee?.name}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonIcon
                        icon={phonePortraitOutline}
                        slot="start"
                      ></IonIcon>
                      <IonLabel slot="start">{employee?.phonenumber}</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
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
