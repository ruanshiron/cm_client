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
  barcodeOutline,
  close,
  earthOutline,
  ellipsisVertical,
  pencilOutline,
  personOutline,
  phonePortraitOutline,
  pulseOutline,
  qrCodeOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { destroyEmployee, saveEmployee } from "../../../models/employee";
import { useSelector } from "../../../store";
import {
  findEmployeeById,
  removeEmployee,
  updateEmployee,
} from "../../../store/data/employeeSlice";
import QRCode from "qrcode.react";
import { toast } from "../../../utils/toast";
import { v4 } from "uuid";

interface EmployeeDetailProps {}

export const EmployeeDetail: React.FC<EmployeeDetailProps> = () => {
  const [presentDeleteAlert] = useIonAlert();
  const [presentActionSheet] = useIonActionSheet();
  const { uid, role } = useSelector((state) => state.user);
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
    const code = v4();
    try {
      await saveEmployee(uid, {
        ...employee,
        code,
      });
      toast("Lưu thành công.");
      if (employee?.id) dispatch(updateEmployee({ ...employee, code }));
    } catch {
      toast("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleCode = () => {
    if (employee?.code) {
      presentActionSheet({
        buttons: [
          {
            icon: earthOutline,
            text: "Sao chép liên kết",
            handler: () => {
              if (employee?.code) {
                copy(window.location.hostname + "/qr/" + employee.code);
              }
              toast(
                employee?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
              );
            },
          },
          {
            icon: barcodeOutline,
            text: "Chỉ sao chép mã",
            handler: () => {
              if (employee?.code) {
                copy(employee.code);
              }
              toast(
                employee?.code ? "Sao chép thành công!" : "Hãy tạo mã trước!"
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

  useEffect(() => {
    if (!employee) dispatch(findEmployeeById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <IonButton
                onClick={() =>
                  presentActionSheet({
                    buttons: [
                      {
                        text: "Xóa",
                        icon: trashOutline,
                        handler: () => {
                          if (role !== "owner") {
                            presentDeleteAlert({
                              header: "Bạn không thể xóa",
                              message:
                                "Bạn không có quyền xóa khi không phải chủ sở hữu",
                              buttons: ["OK!"],
                            });
                            return;
                          }
                          presentDeleteAlert({
                            header: "Xóa mục này",
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
                  <IonItem button onClick={handleCode}>
                    <IonIcon icon={qrCodeOutline} slot="start"></IonIcon>
                    <IonInput
                      value={employee?.code || "Hãy tạo code mới"}
                      onIonChange={() => {}}
                    />
                  </IonItem>
                  {employee?.code && (
                    <IonItem button onClick={handleCode}>
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
